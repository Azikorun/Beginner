
import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson5/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson5/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson5GrammarRules = [
    { title: "This (Yaqin, Birlik)", structure: "This is a/an...", example: <>This is <span className="font-bold">a book</span>.</>, color: 'green' as const },
    { title: "That (Uzoq, Birlik)", structure: "That is a/an...", example: <>That is <span className="font-bold">a desk</span>.</>, color: 'sky' as const },
    { title: "These (Yaqin, Ko'plik)", structure: "These are...", example: <>These are <span className="font-bold">pens</span>.</>, color: 'green' as const },
    { title: "Those (Uzoq, Ko'plik)", structure: "Those are...", example: <>Those are <span className="font-bold">chairs</span>.</>, color: 'sky' as const }
];

const Lesson5: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">5-Dars: Bu Nima? (What's This?)</h1>
                    <p className="mt-4 text-lg text-gray-600">Sinf xonasidagi narsalarni va ko'rsatish olmoshlarini o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Ko'rsatish Olmoshlari (This/That/These/Those)"
                    description="Bu olmoshlar narsalarning yaqin yoki uzoqligini va birlik yoki ko'plikda ekanligini bildirish uchun ishlatiladi."
                    rules={lesson5GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l5-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l5-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l5-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson5;