import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson16/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson16/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson16GrammarRules = [
    { title: "Sanaladigan (Countable)", structure: "a/an + birlik, some/many + ko'plik", example: <>Otni sanash mumkin: <span className="font-bold">an apple, two apples</span>.</>, color: 'green' as const },
    { title: "Sanalmaydigan (Uncountable)", structure: "some / much + ot", example: <>Otni sanab bo'lmaydi: <span className="font-bold">some water</span> (not two waters).</>, color: 'sky' as const },
    { title: "Some (+)", structure: "darak gaplarda", example: <>There is <span className="font-bold">some milk</span>. I have <span className="font-bold">some friends</span>.</>, color: 'green' as const },
    { title: "Any (?/-)", structure: "so'roq va inkor gaplarda", example: <>Is there <span className="font-bold">any sugar</span>? I don't have <span className="font-bold">any money</span>.</>, color: 'red' as const }
];

const Lesson16: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">16-Dars: Sanaladigan va Sanalmaydigan Otlar</h1>
                    <p className="mt-4 text-lg text-gray-600">Bu ot turlari orasidagi farqni va ular bilan 'some' va 'any' ni qanday ishlatishni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Countable & Uncountable Nouns"
                    description="Ingliz tilida otlar sanaladigan (donalab sanash mumkin) va sanalmaydigan (suyuqlik, donador narsalar, mavhum tushunchalar) turlariga bo'linadi. Bu qaysi miqdor so'zini ishlatishni belgilaydi."
                    rules={lesson16GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l16-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l16-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l16-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson16;