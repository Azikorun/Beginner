import { GoogleGenAI, LiveServerMessage, Modality, LiveSession } from '@google/genai';
import { TranscriptEntry } from '../types';
import { createBlob, decode, decodeAudioData } from '../utils/audio';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon';
import { StopIcon } from '../components/icons/StopIcon';
import { SpinnerIcon } from '../components/icons/SpinnerIcon';

export const Lesson20 = (container: HTMLElement) => {
    container.innerHTML = ''; // Clear container for re-renders

    // --- State and Refs ---
    let transcript: TranscriptEntry[] = [];
    let status: 'idle' | 'connecting' | 'listening' | 'speaking' = 'idle';
    let error: string | null = null;
    let sessionPromise: Promise<LiveSession> | null = null;
    let inputAudioContext: AudioContext | null = null;
    let outputAudioContext: AudioContext | null = null;
    let processorNode: ScriptProcessorNode | null = null;
    let mediaStream: MediaStream | null = null;
    let sourceNode: MediaStreamAudioSourceNode | null = null;
    const outputSources = new Set<AudioBufferSourceNode>();
    let nextStartTime = 0;
    let currentInputTranscription = "";
    let currentOutputTranscription = "";

    // --- DOM Elements ---
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">20-Dars: Nutq Amaliyoti (AI Bilan)</h1>
        <p class="mt-4 text-lg text-gray-600">AI o'qituvchi bilan jonli suhbat qurish orqali ingliz tilida gapirishni mashq qiling.</p>
    `;

    const contentWrapper = document.createElement('div');
    contentWrapper.className = "bg-white p-6 rounded-xl shadow-lg border border-gray-200";

    const topBar = document.createElement('div');
    topBar.className = "flex flex-col md:flex-row items-center justify-between mb-4";
    topBar.innerHTML = `<h3 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Suhbat</h3>`;

    const statusIndicator = document.createElement('div');
    statusIndicator.className = "font-semibold text-gray-600 flex items-center gap-2";

    const transcriptContainer = document.createElement('div');
    transcriptContainer.className = "w-full h-96 bg-gray-100 rounded-lg p-4 overflow-y-auto border";
    transcriptContainer.setAttribute("aria-live", "polite");

    const errorContainer = document.createElement('div');
    errorContainer.className = "bg-red-100 text-red-800 p-3 rounded-md my-4 text-center";
    errorContainer.setAttribute('role', 'alert');
    errorContainer.style.display = 'none';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'mt-6 text-center';
    
    const toggleButton = document.createElement('button');
    toggleButton.setAttribute('aria-label', 'Start practice');
    
    // --- Render Functions ---
    const renderStatus = () => {
        switch (status) {
            case 'connecting':
                statusIndicator.innerHTML = '';
                statusIndicator.append(SpinnerIcon(), ' Bog\'lanmoqda...');
                break;
            case 'listening':
                statusIndicator.innerHTML = `<span class="flex items-center text-green-600"><div class="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>Eshitilmoqda...</span>`;
                break;
            case 'speaking':
                statusIndicator.innerHTML = `<span class="flex items-center text-blue-600"><div class="w-3 h-3 rounded-full bg-blue-500 mr-2 animate-pulse"></div>AI Gapirmoqda...</span>`;
                break;
            case 'idle':
            default:
                statusIndicator.textContent = 'Amaliyotni boshlashga tayyor';
        }
    };
    
    const renderTranscript = () => {
        transcriptContainer.innerHTML = '';
        transcript.forEach(entry => {
            const entryWrapper = document.createElement('div');
            entryWrapper.className = `flex mb-3 ${entry.speaker === 'user' ? 'justify-end' : 'justify-start'}`;
            const entryDiv = document.createElement('div');
            entryDiv.className = `max-w-[80%] p-3 rounded-xl ${
                entry.speaker === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 
                entry.speaker === 'model' ? 'bg-gray-200 text-gray-800 rounded-bl-none' :
                'bg-yellow-200 text-yellow-800 text-center w-full'
            }`;
            entryDiv.innerHTML = `<p class="font-medium">${entry.text}</p>`;
            entryWrapper.appendChild(entryDiv);
            transcriptContainer.appendChild(entryWrapper);
        });
        transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
    };
    
    const renderError = () => {
        if (error) {
            errorContainer.textContent = error;
            errorContainer.style.display = 'block';
        } else {
            errorContainer.style.display = 'none';
        }
    };

    const renderButton = () => {
        const isIdle = status === 'idle';
        toggleButton.innerHTML = '';
        toggleButton.className = `px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center mx-auto ${!isIdle ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`;
        toggleButton.setAttribute('aria-label', isIdle ? 'Start practice' : 'Stop practice');
        
        const icon = isIdle ? MicrophoneIcon({className: "h-7 w-7 mr-2"}) : StopIcon({className: "h-7 w-7 mr-2"});
        toggleButton.append(icon, isIdle ? 'Boshlash' : 'To\'xtatish');
    };

    const updateUI = () => {
        renderStatus();
        renderTranscript();
        renderError();
        renderButton();
    };

    // --- Logic ---
    const stopSession = () => {
        console.log('Stopping session...');
        sessionPromise?.then(session => session.close()).catch(console.error);
        sessionPromise = null;
        
        mediaStream?.getTracks().forEach(track => track.stop());
        mediaStream = null;
        
        processorNode?.disconnect();
        processorNode = null;
        
        sourceNode?.disconnect();
        sourceNode = null;

        outputSources.forEach(source => source.stop());
        outputSources.clear();

        inputAudioContext?.close().catch(console.error);
        outputAudioContext?.close().catch(console.error);
        inputAudioContext = null;
        outputAudioContext = null;
        
        status = 'idle';
        updateUI();
    };

    const startSession = async () => {
        error = null;
        transcript = [];
        status = 'connecting';
        updateUI();

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Your browser does not support microphone access.");
            }
            mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        console.log('Session opened.');
                        status = 'listening';
                        transcript.push({ speaker: 'system', text: "Suhbat boshlandi. Gapirishni boshlang..." });
                        updateUI();
                        
                        if (!inputAudioContext || !mediaStream) return;

                        sourceNode = inputAudioContext.createMediaStreamSource(mediaStream);
                        processorNode = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        
                        processorNode.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromise?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };

                        sourceNode.connect(processorNode);
                        processorNode.connect(inputAudioContext.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscription += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            if (status !== 'speaking') { status = 'speaking'; renderStatus(); }
                            currentOutputTranscription += message.serverContent.outputTranscription.text;
                        }

                        if (message.serverContent?.turnComplete) {
                            const fullInput = currentInputTranscription.trim();
                            const fullOutput = currentOutputTranscription.trim();
                            if (fullInput) transcript.push({ speaker: 'user', text: fullInput });
                            if (fullOutput) transcript.push({ speaker: 'model', text: fullOutput });
                            currentInputTranscription = "";
                            currentOutputTranscription = "";
                            status = 'listening';
                            updateUI();
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio && outputAudioContext) {
                            nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
                            const source = outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContext.destination);
                            source.addEventListener('ended', () => {
                                outputSources.delete(source);
                                if (outputSources.size === 0 && status === 'speaking') {
                                    status = 'listening';
                                    renderStatus();
                                }
                            });
                            source.start(nextStartTime);
                            nextStartTime += audioBuffer.duration;
                            outputSources.add(source);
                        }
                    },
                    onclose: () => {
                        console.log('Session closed.');
                        stopSession();
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        error = "Suhbatda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
                        stopSession();
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                    },
                    systemInstruction: `You are a friendly and patient English teacher named 'Gem'. 
                    Your student is a beginner whose native language is Uzbek. 
                    Keep your sentences short and simple. Use beginner-level vocabulary. 
                    Speak clearly and a little slowly.
                    Start by saying "Hello! I'm Gem, your English practice partner. Let's talk. How are you today?". 
                    Ask simple questions about topics like daily routines, home, food, or abilities to keep the conversation going.
                    If the user speaks Uzbek, gently encourage them to try in English.`,
                },
            });

        } catch (err: any) {
            console.error("Failed to start session:", err);
            error = err.message || "Mikrofonni ishga tushirib bo'lmadi.";
            status = 'idle';
            updateUI();
        }
    };
    
    toggleButton.onclick = () => {
        if (status === 'idle') {
            startSession();
        } else {
            stopSession();
        }
    };

    // --- Initial Assembly ---
    topBar.appendChild(statusIndicator);
    buttonContainer.appendChild(toggleButton);
    contentWrapper.append(topBar, transcriptContainer, errorContainer, buttonContainer);
    main.append(header, contentWrapper);
    container.appendChild(main);
    updateUI();
};
