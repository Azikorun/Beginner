import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson12/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson12/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson12GrammarRules = [
    { title: "Darak (I/You/We/They)", structure: "Subject + have got + narsa", example: <>I <span className="font-bold">have got</span> a cat.</>, color: 'green' as const },
    { title: "Darak (He/She/It)", structure: "Subject + has got + narsa", example: <>She <span className="font-bold">has got</span> blue eyes.</>, color: 'sky' as const },
    { title: "Inkor (-)", structure: "...haven't / hasn't got...", example: <>He <span className="font-bold">hasn't got</span> a car.</>, color: 'red' as const },
    { title: "So'roq (?)", structure: "Have/Has + subject + got...?", example: <><span className="font-bold">Have you got</span> a question?</>, color: 'sky' as const }
];

const Lesson12: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">12-Dars: Menda Bor (Have Got)</h1>
                    <p className="mt-4 text-lg text-gray-600">Egalikni ifodalash uchun 'have got' va 'has got' fe'llarini qanday ishlatishni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: 'Have Got' Bilan Egalikni Ifodalash"
                    description="'Have got' (qisqartmasi: 've got) va 'has got' (qisqartmasi: 's got) biror narsaga ega ekanligingizni bildirish uchun ishlatiladi."
                    rules={lesson12GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l12-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l12-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l12-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson12;