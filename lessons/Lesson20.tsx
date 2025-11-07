import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, LiveSession } from '@google/genai';
import { TranscriptEntry } from '../types';
import { createBlob, decode, decodeAudioData } from '../utils/audio';
import MicrophoneIcon from '../components/icons/MicrophoneIcon';
import StopIcon from '../components/icons/StopIcon';
import SpinnerIcon from '../components/icons/SpinnerIcon';

const Lesson20: React.FC = () => {
    const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
    const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
    const [error, setError] = useState<string | null>(null);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const audioContextRefs = useRef<{ input: AudioContext | null, output: AudioContext | null }>({ input: null, output: null });
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const outputSources = useRef<Set<AudioBufferSourceNode>>(new Set()).current;
    const nextStartTime = useRef(0);
    
    const currentInputTranscription = useRef("");
    const currentOutputTranscription = useRef("");
    const transcriptEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcript]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopSession();
        };
    }, []);

    const stopSession = useCallback(() => {
        console.log('Stopping session...');
        sessionPromiseRef.current?.then(session => session.close());
        sessionPromiseRef.current = null;
        
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        
        processorRef.current?.disconnect();
        processorRef.current = null;
        
        sourceNodeRef.current?.disconnect();
        sourceNodeRef.current = null;

        outputSources.forEach(source => source.stop());
        outputSources.clear();

        audioContextRefs.current.input?.close();
        audioContextRefs.current.output?.close();
        audioContextRefs.current = { input: null, output: null };
        
        setStatus('idle');
    }, [outputSources]);

    const startSession = async () => {
        setError(null);
        setTranscript([]);
        setStatus('connecting');

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Your browser does not support microphone access.");
            }
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

            audioContextRefs.current.input = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioContextRefs.current.output = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        console.log('Session opened.');
                        setStatus('listening');
                        setTranscript([{ speaker: 'system', text: "Suhbat boshlandi. Gapirishni boshlang..." }]);
                        
                        const inputCtx = audioContextRefs.current.input;
                        if (!inputCtx || !streamRef.current) return;

                        sourceNodeRef.current = inputCtx.createMediaStreamSource(streamRef.current);
                        processorRef.current = inputCtx.createScriptProcessor(4096, 1, 1);
                        
                        processorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };

                        sourceNodeRef.current.connect(processorRef.current);
                        processorRef.current.connect(inputCtx.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        // Handle transcription
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscription.current += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            if (status !== 'speaking') setStatus('speaking');
                            currentOutputTranscription.current += message.serverContent.outputTranscription.text;
                        }

                        if (message.serverContent?.turnComplete) {
                            const fullInput = currentInputTranscription.current.trim();
                            const fullOutput = currentOutputTranscription.current.trim();
                            if (fullInput) {
                                setTranscript(prev => [...prev, { speaker: 'user', text: fullInput }]);
                            }
                            if (fullOutput) {
                                setTranscript(prev => [...prev, { speaker: 'model', text: fullOutput }]);
                            }
                            currentInputTranscription.current = "";
                            currentOutputTranscription.current = "";
                            if(status === 'speaking') setStatus('listening');
                        }

                        // Handle audio output
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        const outputCtx = audioContextRefs.current.output;
                        if (base64Audio && outputCtx) {
                            nextStartTime.current = Math.max(nextStartTime.current, outputCtx.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
                            const source = outputCtx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputCtx.destination);
                            source.addEventListener('ended', () => {
                                outputSources.delete(source);
                                if (outputSources.size === 0) {
                                    setStatus('listening');
                                }
                            });
                            source.start(nextStartTime.current);
                            nextStartTime.current += audioBuffer.duration;
                            outputSources.add(source);
                        }
                    },
                    onclose: (e: CloseEvent) => {
                        console.log('Session closed.');
                        stopSession();
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setError("Suhbatda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
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
            setError(err.message || "Mikrofonni ishga tushirib bo'lmadi.");
            setStatus('idle');
        }
    };
    
    const handleToggleSession = () => {
        if (status === 'idle') {
            startSession();
        } else {
            stopSession();
        }
    }

    const getStatusIndicator = () => {
        switch (status) {
            case 'connecting':
                return <><SpinnerIcon /> Bog'lanmoqda...</>;
            case 'listening':
                return <span className="flex items-center text-green-600"><div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>Eshitilmoqda...</span>;
            case 'speaking':
                return <span className="flex items-center text-blue-600"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2 animate-pulse"></div>AI Gapirmoqda...</span>;
            case 'idle':
            default:
                return 'Amaliyotni boshlashga tayyor';
        }
    }

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">20-Dars: Nutq Amaliyoti (AI Bilan)</h1>
                    <p className="mt-4 text-lg text-gray-600">AI o'qituvchi bilan jonli suhbat qurish orqali ingliz tilida gapirishni mashq qiling.</p>
                </header>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Suhbat</h3>
                        <div className="font-semibold text-gray-600 flex items-center gap-2">{getStatusIndicator()}</div>
                    </div>

                    <div className="w-full h-96 bg-gray-100 rounded-lg p-4 overflow-y-auto border" aria-live="polite">
                        {transcript.map((entry, index) => (
                            <div key={index} className={`flex mb-3 ${entry.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${
                                    entry.speaker === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 
                                    entry.speaker === 'model' ? 'bg-gray-200 text-gray-800 rounded-bl-none' :
                                    'bg-yellow-200 text-yellow-800 text-center w-full'
                                }`}>
                                    <p className="font-medium">{entry.text}</p>
                                </div>
                            </div>
                        ))}
                         <div ref={transcriptEndRef} />
                    </div>

                    {error && <div className="bg-red-100 text-red-800 p-3 rounded-md my-4 text-center" role="alert">{error}</div>}

                    <div className="mt-6 text-center">
                        <button
                            onClick={handleToggleSession}
                            aria-label={status === 'idle' ? 'Start practice' : 'Stop practice'}
                            className={`px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center mx-auto
                            ${status !== 'idle' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {status === 'idle' ? <MicrophoneIcon className="h-7 w-7 mr-2" /> : <StopIcon className="h-7 w-7 mr-2" />}
                            {status === 'idle' ? 'Boshlash' : 'To\'xtatish'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Lesson20;
