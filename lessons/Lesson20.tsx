
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
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
    let sessionPromise: Promise<any> | null = null;
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

    const errorDiv = document.createElement('div');
    errorDiv.className = "mb-4 p-4 bg-red-100 text-red-700 rounded-lg hidden";

    const transcriptContainer = document.createElement('div');
    transcriptContainer.className = "h-96 overflow-y-auto mb-6 p-4 border rounded-lg bg-gray-50 space-y-4";
    transcriptContainer.innerHTML = `<p class="text-center text-gray-500 italic">Suhbatni boshlash uchun quyidagi tugmani bosing...</p>`;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = "flex justify-center items-center gap-4";

    const actionButton = document.createElement('button');
    actionButton.className = "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 shadow-md focus:outline-none focus:ring-4";
    
    // --- Render Functions ---
    const render = () => {
        // Update Error
        if (error) {
            errorDiv.textContent = error;
            errorDiv.classList.remove('hidden');
        } else {
            errorDiv.classList.add('hidden');
        }

        // Update Button State
        actionButton.className = `flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 shadow-md focus:outline-none focus:ring-4 ${
            status === 'idle' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300' :
            status === 'connecting' ? 'bg-yellow-500 cursor-wait' :
            'bg-red-600 hover:bg-red-700 focus:ring-red-300 animate-pulse'
        }`;
        
        actionButton.innerHTML = '';
        if (status === 'idle') {
            actionButton.appendChild(MicrophoneIcon({ className: "w-6 h-6" }));
            const span = document.createElement('span');
            span.textContent = "Boshlash";
            actionButton.appendChild(span);
            actionButton.disabled = false;
        } else if (status === 'connecting') {
            actionButton.appendChild(SpinnerIcon());
            const span = document.createElement('span');
            span.textContent = "Ulanmoqda...";
            actionButton.appendChild(span);
            actionButton.disabled = true;
        } else {
            actionButton.appendChild(StopIcon({ className: "w-6 h-6" }));
            const span = document.createElement('span');
            span.textContent = "Tugatish";
            actionButton.appendChild(span);
            actionButton.disabled = false;
        }

        // Update Transcript
        if (transcript.length === 0 && !currentInputTranscription && !currentOutputTranscription) {
            transcriptContainer.innerHTML = `<p class="text-center text-gray-500 italic">Suhbatni boshlash uchun quyidagi tugmani bosing...</p>`;
        } else {
            transcriptContainer.innerHTML = '';
            transcript.forEach(entry => {
                const bubble = document.createElement('div');
                const isUser = entry.speaker === 'user';
                bubble.className = `max-w-[80%] p-3 rounded-xl ${
                    isUser 
                    ? 'ml-auto bg-blue-600 text-white rounded-tr-none' 
                    : 'mr-auto bg-gray-200 text-gray-800 rounded-tl-none'
                }`;
                bubble.textContent = entry.text;
                transcriptContainer.appendChild(bubble);
            });

            // Live User Transcription
            if (currentInputTranscription) {
                const bubble = document.createElement('div');
                bubble.className = "max-w-[80%] p-3 rounded-xl ml-auto bg-blue-400 text-white rounded-tr-none opacity-70 italic";
                bubble.textContent = currentInputTranscription + "...";
                transcriptContainer.appendChild(bubble);
            }

            // Live Model Transcription
            if (currentOutputTranscription) {
                const bubble = document.createElement('div');
                bubble.className = "max-w-[80%] p-3 rounded-xl mr-auto bg-gray-300 text-gray-800 rounded-tl-none opacity-70 italic";
                bubble.textContent = currentOutputTranscription + "...";
                transcriptContainer.appendChild(bubble);
            }
            
            transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
        }
    };

    // --- Logic ---
    const stopAudio = () => {
        if (inputAudioContext) {
            inputAudioContext.close();
            inputAudioContext = null;
        }
        if (outputAudioContext) {
            outputAudioContext.close();
            outputAudioContext = null;
        }
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        if (processorNode) {
            processorNode.disconnect();
            processorNode = null;
        }
        if (sourceNode) {
            sourceNode.disconnect();
            sourceNode = null;
        }
        outputSources.forEach(source => {
            try { source.stop(); } catch(e) {}
        });
        outputSources.clear();
        nextStartTime = 0;
    };

    const handleStart = async () => {
        try {
            status = 'connecting';
            error = null;
            render();

            inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            const outputNode = outputAudioContext.createGain();
            outputNode.connect(outputAudioContext.destination);

            mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        status = 'listening';
                        render();
                        
                        // Setup Input Stream
                        if (!inputAudioContext || !mediaStream) return;
                        sourceNode = inputAudioContext.createMediaStreamSource(mediaStream);
                        processorNode = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        
                        processorNode.onaudioprocess = (e) => {
                            const inputData = e.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            if (sessionPromise) {
                                sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
                            }
                        };
                        
                        sourceNode.connect(processorNode);
                        processorNode.connect(inputAudioContext.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                         if (message.serverContent?.outputTranscription) {
                            currentOutputTranscription += message.serverContent.outputTranscription.text;
                            render();
                        } else if (message.serverContent?.inputTranscription) {
                            currentInputTranscription += message.serverContent.inputTranscription.text;
                            render();
                        }

                        if (message.serverContent?.turnComplete) {
                            if (currentInputTranscription) {
                                transcript.push({ speaker: 'user', text: currentInputTranscription });
                                currentInputTranscription = "";
                            }
                            if (currentOutputTranscription) {
                                transcript.push({ speaker: 'model', text: currentOutputTranscription });
                                currentOutputTranscription = "";
                            }
                            render();
                        }

                        const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                        if (audioData && outputAudioContext) {
                             if (nextStartTime < outputAudioContext.currentTime) {
                                nextStartTime = outputAudioContext.currentTime;
                            }
                            
                            const audioBuffer = await decodeAudioData(
                                decode(audioData),
                                outputAudioContext,
                                24000,
                                1
                            );
                            
                            const source = outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputNode);
                            source.onended = () => outputSources.delete(source);
                            source.start(nextStartTime);
                            nextStartTime += audioBuffer.duration;
                            outputSources.add(source);
                        }
                    },
                    onclose: () => {
                        status = 'idle';
                        stopAudio();
                        render();
                    },
                    onerror: (err) => {
                        console.error(err);
                        error = "Aloqa uzildi. Iltimos qayta urinib ko'ring.";
                        status = 'idle';
                        stopAudio();
                        render();
                    }
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    systemInstruction: "You are a helpful English teacher for a beginner student. Speak clearly, slowly, and simply. Correct their mistakes gently.",
                }
            });

        } catch (err) {
            console.error(err);
            error = "Mikrofon yoki tarmoq xatoligi.";
            status = 'idle';
            stopAudio();
            render();
        }
    };

    const handleStop = () => {
        if (sessionPromise) {
            sessionPromise.then(session => session.close());
        }
        stopAudio();
        status = 'idle';
        render();
    };

    actionButton.onclick = () => {
        if (status === 'idle') handleStart();
        else handleStop();
    };

    // --- Assembly ---
    contentWrapper.append(errorDiv, transcriptContainer, controlsContainer);
    controlsContainer.appendChild(actionButton);
    main.append(header, contentWrapper);
    container.appendChild(main);

    // Initial Render
    render();
};
