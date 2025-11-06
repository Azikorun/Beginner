import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson17/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson17/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson17GrammarRules = [
    { title: "In (Ichida)", structure: "in + yopiq joy", example: <>Biror narsaning ichidagi joylashuv. The keys are <span className="font-bold">in the box</span>.</>, color: 'green' as const },
    { title: "On (Ustida)", structure: "on + sirt", example: <>Biror narsaning sirti ustidagi joylashuv. The book is <span className="font-bold">on the table</span>.</>, color: 'sky' as const },
    { title: "Under (Ostida)", structure: "under + narsa", example: <>Biror narsaning pastidagi joylashuv. The cat is <span className="font-bold">under the chair</span>.</>, color: 'red' as const },
];

const Lesson17: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">17-Dars: Joy Predloglari (In, On, Under)</h1>
                    <p className="mt-4 text-lg text-gray-600">Narsalarning qayerda ekanligini aytish uchun eng kerakli predloglarni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Joy Predloglari"
                    description="Bu kichik so'zlar narsalarning bir-biriga nisbatan joylashuvini ko'rsatish uchun juda muhimdir."
                    rules={lesson17GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l17-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l17-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l17-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson17;