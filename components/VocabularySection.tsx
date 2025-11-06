import React, { useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { VocabularyCategory } from '../types';
import SpinnerIcon from './icons/SpinnerIcon';
import VolumeIcon from './icons/VolumeIcon';

interface VocabularySectionProps {
    data: VocabularyCategory[];
}

// ===================================================================================
// AUDIO HELPERS
// ===================================================================================

// Create AudioContext once. The API returns audio at a 24000 sample rate.
const outputAudioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }) : null;

/**
 * Decodes a base64 string into a Uint8Array.
 */
function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

/**
 * Decodes raw PCM audio data into an AudioBuffer for playback.
 */
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}


const VocabularySection: React.FC<VocabularySectionProps> = ({ data }) => {
    const [nowPlaying, setNowPlaying] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePlaySound = async (text: string) => {
        if (nowPlaying) {
            return;
        }
        if (!outputAudioContext) {
            setError("Audio context is not supported in this browser.");
            return;
        }

        setNowPlaying(text);
        setError(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                          prebuiltVoiceConfig: { voiceName: 'Kore' },
                        },
                    },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

            if (!base64Audio) {
                throw new Error("No audio data received from API.");
            }

            const decodedBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(decodedBytes, outputAudioContext, 24000, 1);

            const source = outputAudioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioContext.destination);
            source.onended = () => {
                setNowPlaying(null);
            };
            source.start();

        } catch (err) {
            console.error("Error generating or playing audio:", err);
            setError("Audio ijro etishda xatolik yuz berdi.");
            setNowPlaying(null);
        }
    };

    return (
        <section>
            <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-6">1-Qism: Asosiy Iboralar</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4" role="alert">{error}</div>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map(cat => (
                    <div key={cat.title} className="bg-white p-6 rounded-lg shadow-md border">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">{cat.title}</h3>
                        <ul className="space-y-2">
                            {cat.items.map(item => (
                                <li key={item.english} className="bg-gray-100 p-3 rounded-md font-medium group flex justify-between items-center">
                                    <div>
                                        {item.english}
                                        <span className="block text-sm text-gray-500 italic ml-2">({item.uzbek})</span>
                                    </div>
                                    <button 
                                        onClick={() => handlePlaySound(item.english)} 
                                        disabled={!!nowPlaying} 
                                        className="p-2 rounded-full hover:bg-blue-100 disabled:opacity-50 transition-colors"
                                        aria-label={`Play audio for ${item.english}`}
                                    >
                                        {nowPlaying === item.english ? <SpinnerIcon /> : <VolumeIcon />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VocabularySection;