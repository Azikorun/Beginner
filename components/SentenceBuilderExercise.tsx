import React, { useState, useMemo, useEffect } from 'react';
import { SentenceBuilderPrompt, SentenceBuilderColumns } from '../types';
import Button from './Button';
import Section from './Section';

interface SentenceBuilderExerciseProps {
    columns: SentenceBuilderColumns;
    prompts: SentenceBuilderPrompt[];
}

type FeedbackStatus = 'unanswered' | 'correct' | 'incorrect';

const SentenceBuilderExercise: React.FC<SentenceBuilderExerciseProps> = ({ columns, prompts }) => {
    const [index, setIndex] = useState(0);
    const [placed, setPlaced] = useState<{ item: string; category: string }[]>([]);
    const [feedback, setFeedback] = useState<FeedbackStatus>('unanswered');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setIndex(0);
        setPlaced([]);
        setFeedback('unanswered');
        setCompleted(false);
    }, [prompts]);

    if (!prompts || prompts.length === 0) {
        return <Section title="Mashq 3: Gap Quruvchi" description="Tarjimaga mos gapni qismlarni bosish orqali yig'ing."><div>Yuklanmoqda...</div></Section>;
    }

    const currentPrompt = prompts[index];
    const usedCategories = useMemo(() => new Set(placed.map(item => item.category)), [placed]);

    const handlePlace = (item: string, category: string) => {
        if (!usedCategories.has(category)) {
            setPlaced(p => [...p, { item, category }]);
        }
    };

    const handleReturn = (itemIndex: number) => {
        setPlaced(current => current.filter((_, idx) => idx !== itemIndex));
        setFeedback('unanswered');
    }

    const checkAnswer = () => {
        const userAnswer = placed.map(p => p.item).join(' ').toLowerCase();
        if (userAnswer === currentPrompt.correctAnswer) {
            setFeedback('correct');
            if (index === prompts.length - 1) {
                setCompleted(true);
            }
        } else {
            setFeedback('incorrect');
        }
    };

    const nextPrompt = () => {
        if (index < prompts.length - 1) {
            setIndex(i => i + 1);
            setPlaced([]);
            setFeedback('unanswered');
        }
    };

    const boxClasses = feedback === 'correct' ? 'border-green-500 bg-green-50' :
                       feedback === 'incorrect' ? 'border-red-500 bg-red-50' :
                       'border-blue-500 bg-gray-50';

    return (
        <Section title="Mashq 3: Gap Quruvchi" description="Tarjimaga mos gapni qismlarni bosish orqali yig'ing.">
            {!completed ? (
                <>
                    <div className="text-center p-4 bg-gray-100 rounded-lg mb-4">
                        <p className="text-lg font-semibold">Topshiriq {index + 1}/{prompts.length}:</p>
                        <p className="text-xl font-bold text-blue-800 mt-1">"{currentPrompt.prompt}"</p>
                    </div>
                    <div className={`p-4 border-2 border-dashed rounded-lg my-4 min-h-[70px] text-center flex justify-center items-center flex-wrap ${boxClasses}`}>
                        {placed.length === 0 ? (
                            <span className="text-gray-400">Bo'laklar shu yerga tushadi</span>
                        ) : (
                            <p>
                                {placed.map((p, i) => (
                                    <span
                                        key={`${p.item}-${i}`}
                                        onClick={() => handleReturn(i)}
                                        className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-red-600 hover:line-through mx-1"
                                    >
                                        {p.item}
                                    </span>
                                ))}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                        {/* FIX: Switched from Object.entries to Object.keys to fix TypeScript type inference issue. */}
                        {Object.keys(columns).map(cat => {
                            const col = columns[cat];
                            return (
                                <div key={cat} className="bg-white p-3 rounded-lg border">
                                    <h4 className="text-center font-bold text-gray-600 mb-2">{col.title}</h4>
                                    <div className="text-center">
                                        {col.items.map(item => (
                                            <div
                                                key={item}
                                                onClick={() => handlePlace(item, cat)}
                                                className={`p-2 px-3 m-1 rounded-md cursor-pointer inline-block font-semibold border transition-colors ${
                                                    usedCategories.has(cat) ?
                                                    'bg-gray-200 text-gray-400 opacity-70 cursor-not-allowed' :
                                                    'bg-sky-200 text-sky-800 hover:bg-sky-300'
                                                }`}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex justify-center items-center space-x-4">
                        <Button onClick={checkAnswer} disabled={feedback === 'correct'}>Tekshirish</Button>
                        {feedback === 'correct' && index < prompts.length - 1 && (
                            <Button onClick={nextPrompt} className="bg-green-600 hover:bg-green-700">
                                Keyingisi &rarr;
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center p-8 bg-green-100 rounded-lg">
                    <h3 className="text-3xl font-bold text-green-800">Tabriklaymiz!</h3>
                    <p className="mt-2 text-lg text-green-700">Siz barcha topshiriqlarni bajardingiz!</p>
                </div>
            )}
        </Section>
    );
};

export default SentenceBuilderExercise;