
import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson1/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson1/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson1GrammarRules = [
    { title: "Gap Tuzilishi (SVO)", structure: "Subject + Verb + Object", example: <>I (Ega) + watch (Fe'l) + TV (To'ldiruvchi).</>, color: 'green' as const },
    { title: "Darak (+)", structure: "I / You + Fe'l", example: <>I <span className="font-bold">watch</span> TV.</>, color: 'green' as const },
    { title: "Inkor (-)", structure: "I / You + don't + Fe'l", example: <>I <span className="font-bold">don't watch</span> TV.</>, color: 'red' as const },
    { title: "So'roq (?)", structure: "Do you + Fe'l...?", example: <><span className="font-bold">Do you watch</span> TV?</>, color: 'sky' as const }
];

const Lesson1: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">1-Dars: Uy va Kundalik Ishlar</h1>
                    <p className="mt-4 text-lg text-gray-600">"Uy" mavzusidagi iboralarni o'rganing va interaktiv mashqlar bajaring.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Gap Tuzilishi va Present Simple"
                    description="Ingliz tilidagi oddiy gaplar odatda Subject-Verb-Object (SVO) tartibida tuziladi. Bu zamonni odatiy, takrorlanadigan ish-harakatlar uchun ishlatamiz."
                    rules={lesson1GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson1;