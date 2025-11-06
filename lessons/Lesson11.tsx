import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson11/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson11/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson11GrammarRules = [
    { title: "Noaniq Artikllar (a/an)", structure: "a/an + birlikdagi ot", example: <>'a' undosh tovush oldidan, 'an' unli tovush oldidan keladi.</>, color: 'green' as const },
    { title: "Aniq Artikllar (the)", structure: "the + ot", example: <>Suhbatdoshga ma'lum, yagona yoki avval aytilgan narsalar uchun.</>, color: 'sky' as const },
    { title: "Misollar", structure: "a book, an apple, the sun", example: <>I see <span className="font-bold">a car</span>. I eat <span className="font-bold">an apple</span>. Look at <span className="font-bold">the sky</span>.</>, color: 'red' as const }
];

const Lesson11: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">11-Dars: Artikllar (A, An, The)</h1>
                    <p className="mt-4 text-lg text-gray-600">Noaniq ('a', 'an') va aniq ('the') artikllarini to'g'ri ishlatishni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Ingliz Tili Artikllari"
                    description="Artikllar otning noaniq (birorta) yoki aniq (aynan o'sha) ekanligini bildirish uchun ishlatiladi."
                    rules={lesson11GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l11-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l11-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l11-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson11;