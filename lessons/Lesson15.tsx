import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson15/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson15/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson15GrammarRules = [
    { title: "Qiyosiy (Comparative)", structure: "sifat + -er than", example: <>A car is <span className="font-bold">faster than</span> a bike.</>, color: 'green' as const },
    { title: "Orttirma (Superlative)", structure: "the + sifat + -est", example: <>A plane is <span className="font-bold">the fastest</span>.</>, color: 'sky' as const },
    { title: "Uzun Sifatlar", structure: "more / the most + sifat", example: <>This book is <span className="font-bold">more interesting</span>.</>, color: 'red' as const },
    { title: "Istisnolar", structure: "good -> better -> best", example: <>My English is <span className="font-bold">better</span> now.</>, color: 'red' as const }
];

const Lesson15: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">15-Dars: Sifat Darajalari (Bigger, The Biggest)</h1>
                    <p className="mt-4 text-lg text-gray-600">Narsalarni solishtirish uchun sifatlarning qiyosiy va orttirma darajalarini o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Sifat Darajalari"
                    description="Sifatlar narsalarni solishtirish uchun o'zgarishi mumkin. Odatda, qisqa so'zlarga '-er' va '-est' qo'shimchalari, uzun so'zlarga esa 'more' va 'the most' so'zlari qo'shiladi."
                    rules={lesson15GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l15-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l15-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l15-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson15;