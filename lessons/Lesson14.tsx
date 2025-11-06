import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson14/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson14/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson14GrammarRules = [
    { title: "Must (Shart)", structure: "Subject + must + fe'l", example: <>Qat'iy majburiyat yoki qoida. You <span className="font-bold">must wear</span> a seatbelt.</>, color: 'red' as const },
    { title: "Should (Kerak)", structure: "Subject + should + fe'l", example: <>Yaxshi maslahat yoki tavsiya. You <span className="font-bold">should drink</span> more water.</>, color: 'green' as const },
    { title: "Mustn't (Mumkin emas)", structure: "Subject + mustn't + fe'l", example: <>Qat'iy taqiq. You <span className="font-bold">mustn't touch</span> that.</>, color: 'red' as const },
    { title: "Shouldn't (Kerak emas)", structure: "Subject + shouldn't + fe'l", example: <>Yomon fikrga qarshi maslahat. You <span className="font-bold">shouldn't eat</span> too much candy.</>, color: 'green' as const }
];

const Lesson14: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">14-Dars: Shart va Maslahat (Must / Should)</h1>
                    <p className="mt-4 text-lg text-gray-600">Majburiyat ('must') va maslahat ('should') berish uchun modal fe'llarni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: 'Must' va 'Should' Modal Fe'llari"
                    description="'must' va 'should' fe'llari asosiy fe'ldan oldin keladi va ish-harakatga qo'shimcha ma'no beradi. Ular barcha shaxslar uchun bir xil qo'llaniladi."
                    rules={lesson14GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l14-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l14-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l14-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson14;