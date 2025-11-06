import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson7/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson7/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson7GrammarRules = [
    { title: "My (Mening)", structure: "my + narsa", example: <>This is <span className="font-bold">my book</span>.</>, color: 'green' as const },
    { title: "Your (Sizning)", structure: "your + narsa", example: <>Is this <span className="font-bold">your pen</span>?</>, color: 'sky' as const },
    { title: "His (Uning - o'g'il bola)", structure: "his + narsa", example: <><span className="font-bold">His car</span> is fast.</>, color: 'green' as const },
    { title: "Her (Uning - qiz bola)", structure: "her + narsa", example: <>I see <span className="font-bold">her bag</span>.</>, color: 'sky' as const }
];

const Lesson7: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">7-Dars: Mening Buyumlarim (My Things)</h1>
                    <p className="mt-4 text-lg text-gray-600">'my', 'your', 'his', 'her' egalik sifatlarini ishlatib, buyumlarga egalikni ifodalashni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Egalik Sifatlari (Possessive Adjectives)"
                    description="Bu so'zlar biror narsaning kimga tegishli ekanligini bildirish uchun otdan oldin ishlatiladi."
                    rules={lesson7GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l7-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l7-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l7-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson7;