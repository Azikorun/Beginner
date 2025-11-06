import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson13/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson13/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson13GrammarRules = [
    { title: "Darak (Birlik)", structure: "There is a/an + narsa", example: <>There <span className="font-bold">is a book</span> on the table.</>, color: 'green' as const },
    { title: "Darak (Ko'plik)", structure: "There are + narsalar", example: <>There <span className="font-bold">are two</span> chairs.</>, color: 'sky' as const },
    { title: "Inkor (-)", structure: "There isn't / aren't...", example: <>There <span className="font-bold">isn't a pen</span>. There <span className="font-bold">aren't any</span> pens.</>, color: 'red' as const },
    { title: "So'roq (?)", structure: "Is there...? / Are there...?", example: <><span className="font-bold">Is there a</span> window? <span className="font-bold">Are there any</span> students?</>, color: 'sky' as const }
];

const Lesson13: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">13-Dars: U Yerda Bor (There is / There are)</h1>
                    <p className="mt-4 text-lg text-gray-600">Biror joyda narsalarning mavjudligini yoki yo'qligini ifodalashni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: 'There is' va 'There are' Ishlatilishi"
                    description="'There is' birlikdagi otlar uchun, 'There are' esa ko'plikdagi otlar uchun ishlatiladi. Bu ibora biror narsaning mavjudligini bildiradi."
                    rules={lesson13GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l13-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l13-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l13-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson13;