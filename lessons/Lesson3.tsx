
import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson3/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson3/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson3GrammarRules = [
    { title: "Sanaladigan (a/an)", structure: "a/an + birlikdagi ot", example: <>I would like <span className="font-bold">an apple</span>.</>, color: 'green' as const },
    { title: "Sanalmaydigan (some)", structure: "some + ot", example: <>Can I have <span className="font-bold">some water</span>?</>, color: 'red' as const },
    { title: "Buyurtma berish", structure: "I would like...", example: <><span className="font-bold">I would like</span> a coffee, please.</>, color: 'sky' as const }
];

const Lesson3: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">3-Dars: Oziq-ovqat va Restoran</h1>
                    <p className="mt-4 text-lg text-gray-600">Restoranda buyurtma berish uchun kerakli so'zlar va iboralarni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Sanaladigan va Sanalmaydigan Otlar"
                    description="Ingliz tilida ba'zi otlarni sanash mumkin (countable), ba'zilarini esa yo'q (uncountable). Shunga qarab 'a/an' yoki 'some' ishlatiladi."
                    rules={lesson3GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l3-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l3-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l3-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson3;