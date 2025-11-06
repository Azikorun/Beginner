import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import Section from '../components/Section';
import Button from '../components/Button';
import SpinnerIcon from '../components/icons/SpinnerIcon';

const ReviewSection: React.FC = () => (
    <div className="my-8 p-6 bg-blue-50 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-800">Takrorlash: Foydali Iboralar</h3>
        <p className="mt-2 text-gray-600 mb-6">O'zingiz haqingizda gapirish uchun ushbu iboralardan foydalanishingiz mumkin:</p>
        <div className="grid md:grid-cols-3 gap-4">
            <div>
                <h4 className="font-bold text-lg text-blue-700">Tanishuv</h4>
                <ul className="list-disc list-inside text-gray-700">
                    <li>My name is...</li>
                    <li>I am from...</li>
                    <li>I am [your nationality].</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-lg text-blue-700">Qobiliyatlar va Narsalar</h4>
                <ul className="list-disc list-inside text-gray-700">
                    <li>I can... / I can't...</li>
                    <li>This is my...</li>
                    <li>I like...</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-lg text-blue-700">Kun Tartibi</h4>
                <ul className="list-disc list-inside text-gray-700">
                    <li>I usually get up at...</li>
                    <li>I always eat...</li>
                    <li>I sometimes...</li>
                </ul>
            </div>
        </div>
    </div>
);


const Lesson10: React.FC = () => {
    const [text, setText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckText = async () => {
        if (!text.trim()) {
            setError("Iltimos, tekshirishdan oldin biror narsa yozing.");
            return;
        }

        setLoading(true);
        setFeedback('');
        setError(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            const systemInstruction = `You are a friendly and encouraging English teacher for a beginner student whose native language is Uzbek.
            The student has written a short text about themselves. Your task is to review the text.
            1. Start with a positive and encouraging comment in Uzbek (e.g., "Ajoyib!", "Yaxshi urinish!", "Barakalla!").
            2. If there are mistakes, point them out very simply. Provide the corrected sentence. Explain the mistake in simple Uzbek in one short sentence.
            3. If there are no mistakes, just give praise in Uzbek and maybe ask a simple follow-up question in English.
            4. Keep your entire feedback short, simple, easy to understand, and very encouraging. Format your response clearly.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Here is the student's text:\n\n"${text}"`,
                config: {
                    systemInstruction,
                },
            });

            setFeedback(response.text);

        } catch (err) {
            console.error("Error getting feedback:", err);
            setError("Sun'iy intellektdan javob olishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">10-Dars: Yakuniy Dars va Kichik Loyiha</h1>
                    <p className="mt-4 text-lg text-gray-600">O'rgangan barcha narsalaringizni qo'llash vaqti keldi!</p>
                </header>

                <ReviewSection />

                <Section title="Sizning Kichik Loyihangiz" description="Quyidagi maydonga o'zingiz haqingizda 3-4 ta gap yozing. Masalan: Ismingiz, qayerdansiz, nima qila olasiz va odatda nima qilasiz. Keyin 'Tekshirish' tugmasini bosing va sun'iy intellekt o'qituvchidan yordam oling.">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                        placeholder="My name is... I am from... I can... I usually..."
                        aria-label="Your text about yourself"
                    />
                    <div className="mt-6 text-center">
                        <Button onClick={handleCheckText} disabled={loading}>
                            {loading ? 'Tekshirilmoqda...' : "Matnni Tekshirish"}
                        </Button>
                    </div>

                    {loading && (
                        <div className="mt-6 flex justify-center">
                            <SpinnerIcon />
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg text-center" role="alert">
                            {error}
                        </div>
                    )}

                    {feedback && (
                        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="font-bold text-lg text-green-800 mb-2">O'qituvchining Fikri:</h4>
                            <div className="text-gray-700 whitespace-pre-wrap font-medium">{feedback}</div>
                        </div>
                    )}
                </Section>
            </main>
        </div>
    );
};

export default Lesson10;