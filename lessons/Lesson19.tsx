import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson19/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson19/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson19GrammarRules = [
    { title: "Will (Kelajak)", structure: "Subject + will + fe'l", example: <>Kelajakdagi harakat yoki va'da. I <span className="font-bold">will call</span> you tomorrow.</>, color: 'green' as const },
    { title: "May / Might (Ehtimol)", structure: "Subject + may/might + fe'l", example: <>Ishonch past bo'lgan ehtimollik. It <span className="font-bold">might rain</span> later.</>, color: 'sky' as const },
    { title: "Can / Could (So'rov/Qobiliyat)", structure: "Can/Could + you + fe'l?", example: <>Qobiliyat yoki norasmiy/rasmiy so'rov. <span className="font-bold">Can you</span> swim? <span className="font-bold">Could you</span> help me?</>, color: 'red' as const },
    { title: "Would (Iltimos)", structure: "Would you + fe'l?", example: <>Juda muloyim iltimos. <span className="font-bold">Would you</span> open the door, please?</>, color: 'sky' as const }
];

const Lesson19: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">19-Dars: Ehtimollik va So'rov</h1>
                    <p className="mt-4 text-lg text-gray-600">Turli vaziyatlar uchun to'g'ri modal fe'lni tanlashni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Ko'p Qo'llaniladigan Modal Fe'llar"
                    description="Modal fe'llar gapning asosiy fe'liga qo'shimcha ma'no beradi, masalan, ehtimollik, majburiyat yoki qobiliyat."
                    rules={lesson19GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l19-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l19-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l19-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson19;