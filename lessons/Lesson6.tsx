import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson6/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson6/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson6GrammarRules = [
    { title: "Darak (+)", structure: "Subject + am/is/are", example: <>He <span className="font-bold">is</span> from Spain.</>, color: 'green' as const },
    { title: "Inkor (-)", structure: "Subject + am/is/are + not", example: <>They <span className="font-bold">are not</span> from Italy.</>, color: 'red' as const },
    { title: "So'roq (?)", structure: "Am/Is/Are + subject...?", example: <><span className="font-bold">Are you</span> from China?</>, color: 'sky' as const }
];

const Lesson6: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">6-Dars: Siz Qayerdansiz? (Where Are You From?)</h1>
                    <p className="mt-4 text-lg text-gray-600">Mamlakatlar, millatlar va 'be' fe'lini ishlatishni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: 'Be' Fe'li (am, is, are)"
                    description="'Be' fe'li holatni, kim/nima ekanligini yoki qayerdaligini bildirish uchun ishlatiladi. U shaxsga qarab o'zgaradi (I am, You are, He/She is)."
                    rules={lesson6GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l6-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l6-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l6-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson6;