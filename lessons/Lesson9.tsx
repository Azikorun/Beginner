
import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson9/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson9/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson9GrammarRules = [
    { title: "Qoida", structure: "Subject + adverb + verb", example: <>I <span className="font-bold">always get up</span> at 7.</>, color: 'green' as const },
    { title: "Misol", structure: "Subject + adverb + verb", example: <>She <span className="font-bold">usually drinks</span> coffee.</>, color: 'sky' as const },
    // FIX: Changed 'description' to 'structure' to match the GrammarRule type.
    { title: "Diqqat!", structure: "Frequency adverb odatda asosiy fe'ldan oldin keladi.", example: <>He <span className="font-bold">sometimes works</span> late.</>, color: 'red' as const }
];


const Lesson9: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">9-Dars: Kun Tartibi (Frequency)</h1>
                    <p className="mt-4 text-lg text-gray-600">Qanchalik tez-tez biror ishni bajarishingizni aytishni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Frequency Adverbs (Takrorlanish Ravishlari)"
                    description="'always' (har doim), 'usually' (odatda), 'sometimes' (ba'zan) kabi so'zlar ish-harakatning qanchalik tez-tez sodir bo'lishini ko'rsatadi."
                    // FIX: Removed unnecessary .map() call and passed the corrected rules array directly.
                    rules={lesson9GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l9-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l9-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l9-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson9;