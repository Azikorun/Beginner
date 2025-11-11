import { GoogleGenAI, Modality } from '@google/genai';
import { VocabularyCategory } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { VolumeIcon } from './icons/VolumeIcon';
import { decode, decodeAudioData } from '../utils/audio';

const outputAudioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }) : null;

export const VocabularySection = (data: VocabularyCategory[]): HTMLElement => {
    let nowPlaying: string | null = null;
    const buttonMap = new Map<string, HTMLButtonElement>();
    const section = document.createElement('section');
    
    const h2 = document.createElement('h2');
    h2.className = "text-3xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-6";
    h2.textContent = "1-Qism: Asosiy Iboralar";
    section.appendChild(h2);

    const errorDiv = document.createElement('div');
    errorDiv.className = "bg-red-100 text-red-700 p-3 rounded-md mb-4";
    errorDiv.setAttribute('role', 'alert');
    errorDiv.style.display = 'none';
    section.appendChild(errorDiv);

    const grid = document.createElement('div');
    grid.className = "grid md:grid-cols-2 lg:grid-cols-3 gap-6";

    const updatePlaybackState = (text: string | null) => {
        nowPlaying = text;
        buttonMap.forEach((button, itemText) => {
            button.disabled = !!nowPlaying;
            if (nowPlaying === itemText) {
                button.innerHTML = '';
                button.appendChild(SpinnerIcon());
            } else {
                button.innerHTML = '';
                button.appendChild(VolumeIcon());
            }
        });
    };

    const setError = (message: string | null) => {
        if (message) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        } else {
            errorDiv.style.display = 'none';
        }
    }

    const handlePlaySound = async (text: string) => {
        if (nowPlaying) return;
        if (!outputAudioContext) {
            setError("Audio context is not supported in this browser.");
            return;
        }

        updatePlaybackState(text);
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
            if (!base64Audio) throw new Error("No audio data received from API.");

            const decodedBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(decodedBytes, outputAudioContext, 24000, 1);

            const source = outputAudioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioContext.destination);
            source.onended = () => updatePlaybackState(null);
            source.start();

        } catch (err) {
            console.error("Error generating or playing audio:", err);
            setError("Audio ijro etishda xatolik yuz berdi.");
            updatePlaybackState(null);
        }
    };

    data.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = "bg-white p-6 rounded-lg shadow-md border";
        catDiv.innerHTML = `<h3 class="text-xl font-semibold text-gray-700 mb-4">${cat.title}</h3>`;
        const ul = document.createElement('ul');
        ul.className = "space-y-2";

        cat.items.forEach(item => {
            const li = document.createElement('li');
            li.className = "bg-gray-100 p-3 rounded-md font-medium group flex justify-between items-center";
            li.innerHTML = `
                <div>
                    ${item.english}
                    <span class="block text-sm text-gray-500 italic ml-2">(${item.uzbek})</span>
                </div>
            `;
            const button = document.createElement('button');
            button.className = "p-2 rounded-full hover:bg-blue-100 disabled:opacity-50 transition-colors";
            button.setAttribute('aria-label', `Play audio for ${item.english}`);
            button.onclick = () => handlePlaySound(item.english);
            button.appendChild(VolumeIcon());

            li.appendChild(button);
            ul.appendChild(li);
            buttonMap.set(item.english, button);
        });
        catDiv.appendChild(ul);
        grid.appendChild(catDiv);
    });

    section.appendChild(grid);
    return section;
};
