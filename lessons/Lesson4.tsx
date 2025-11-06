
import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson4/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson4/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson4GrammarRules = [
    { title: "Darak (+)", structure: "Subject + can + fe'l", example: <>I <span className="font-bold">can swim</span>.</>, color: 'green' as const },
    { title: "Inkor (-)", structure: "Subject + can't + fe'l", example: <>A person <span className="font-bold">can't fly</span>.</>, color: 'red' as const },
    { title: "So'roq (?)", structure: "Can + subject + fe'l...?", example: <><span className="font-bold">Can you sing</span>?</>, color: 'sky' as const }
];

const Lesson4: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">4-Dars: Qobiliyatlar (I Can Swim)</h1>
                    <p className="mt-4 text-lg text-gray-600">'Can' va 'Can't' yordamida qobiliyat va imkoniyatlarni ifodalashni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: 'Can' va 'Can't' Modal Fe'llari"
                    description="'Can' fe'li biror ishni bajara olish qobiliyatini, 'can't' (can not) esa bajara olmaslikni bildiradi. Ular barcha shaxslar uchun bir xil ishlatiladi."
                    rules={lesson4GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l4-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l4-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l4-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson4;