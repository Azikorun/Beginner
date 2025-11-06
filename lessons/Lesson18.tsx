import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson18/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson18/exercises';
import VocabularySection from '../components/VocabularySection';
import GrammarSection from '../components/GrammarSection';
import MatchingExercise from '../components/MatchingExercise';
import ClickToPlaceExercise from '../components/ClickToPlaceExercise';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';

const lesson18GrammarRules = [
    { title: "To (..ga)", structure: "go/walk/run + to + joy", example: <>Maqsad, yo'nalishni bildiradi. I walk <span className="font-bold">to school</span>.</>, color: 'green' as const },
    { title: "From (..dan)", structure: "come/walk/run + from + joy", example: <>Boshlanish nuqtasini bildiradi. He comes <span className="font-bold">from work</span>.</>, color: 'sky' as const },
    { title: "Into (ichiga)", structure: "go/walk/run + into + yopiq joy", example: <>Ichkariga kirish harakatini bildiradi. The cat runs <span className="font-bold">into the house</span>.</>, color: 'red' as const },
    { title: "Out of (ichidan)", structure: "go/walk/run + out of + yopiq joy", example: <>Ichkaridan chiqish harakatini bildiradi. She goes <span className="font-bold">out of the room</span>.</>, color: 'red' as const }
];

const Lesson18: React.FC = () => {
    const [key, setKey] = useState(0);

    const regenerate = useCallback(() => setKey(k => k + 1), []);

    const matchingQuestions = useMemo(() => generateMatchingQuestions(6), [key]);
    const clickerPuzzles = useMemo(() => generateClickerPuzzles(6), [key]);
    const builderPrompts = useMemo(() => generateSentenceBuilderPrompts(6), [key]);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">18-Dars: Harakat Predloglari (To, From, Into)</h1>
                    <p className="mt-4 text-lg text-gray-600">Qayerga borishni, qayerdan kelishni va harakat yo'nalishini ifodalashni o'rganing.</p>
                </header>

                <VocabularySection data={VOCABULARY_DATA} />
                <GrammarSection 
                    title="Grammatika: Harakat Predloglari"
                    description="Bu predloglar harakatning yo'nalishini ko'rsatish uchun fe'llar bilan birga ishlatiladi."
                    rules={lesson18GrammarRules}
                />

                <hr className="my-12 border-gray-300" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
                    <p className="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
                    <button onClick={regenerate} className="mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Yangi Mashqlar
                    </button>
                </div>

                <MatchingExercise key={`l18-match-${key}`} questions={matchingQuestions} />
                <ClickToPlaceExercise key={`l18-click-${key}`} puzzles={clickerPuzzles} />
                <SentenceBuilderExercise key={`l18-build-${key}`} columns={SENTENCE_BUILDER_COLUMNS} prompts={builderPrompts} />
            </main>
        </div>
    );
};

export default Lesson18;
