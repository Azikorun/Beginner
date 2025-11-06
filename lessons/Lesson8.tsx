import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson8/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson8/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson8GrammarRules = [
    { title: "To'liq soat (O'clock)", structure: "It is + [son] + o'clock.", example: <>It is <span className="font-bold">seven o'clock</span>.</>, color: 'green' as const },
    { title: "Yarim (Half Past)", structure: "It is half past + [son].", example: <>It is <span className="font-bold">half past three</span>.</>, color: 'sky' as const },
    { title: "Savol Berish", structure: "What time is it?", example: <><span className="font-bold">What time is it?</span> It's ten o'clock.</>, color: 'green' as const }
];

const Lesson8: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">8-Dars: Raqamlar va Vaqt (Numbers & Time)</h1>
                    <p className="mt-4 text-lg text-gray-600">Ushbu darsda 1 dan 100 gacha sanashni va soatni aytishni o'rganasiz.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Soatni Aytish"
                    description="Ingliz tilida soatni aytishning bir necha usullari bor. Keling, eng keng tarqalganlarini ko'rib chiqamiz."
                    rules={lesson8GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l8-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l8-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l8-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson8;