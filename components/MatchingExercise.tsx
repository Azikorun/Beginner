
import React, { useState, useCallback } from 'react';
import { MatchingQuestion } from '../types';
import Button from './Button';
import Section from './Section';

interface MatchingExerciseProps {
    questions: MatchingQuestion[];
}

const MatchingExercise: React.FC<MatchingExerciseProps> = ({ questions }) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect'>>({});
    const [totalFeedback, setTotalFeedback] = useState('');

    const checkAnswers = useCallback(() => {
        let correctCount = 0;
        const newFeedback: Record<string, 'correct' | 'incorrect'> = {};
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                newFeedback[q.id] = 'correct';
                correctCount++;
            } else {
                newFeedback[q.id] = 'incorrect';
            }
        });
        setFeedback(newFeedback);
        setTotalFeedback(`Natija: ${correctCount} / ${questions.length} to'g'ri.`);
    }, [answers, questions]);

    const getFeedbackClasses = (status?: 'correct' | 'incorrect') => {
        if (status === 'correct') return 'border-green-500 ring-2 ring-green-200';
        if (status === 'incorrect') return 'border-red-500 ring-2 ring-red-200';
        return 'border-gray-300';
    };

    return (
        <Section title="Mashq 1: Harakatni Joy bilan Moslang" description="Har bir ish-harakat uchun eng mos joyni tanlang.">
            <div className="space-y-4">
                {questions.map(q => (
                    <div key={q.id} className="flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700 mb-2 sm:mb-0">{q.question}</span>
                        <select
                            value={answers[q.id] || ''}
                            onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                            className={`p-2 border rounded-md w-full sm:w-52 transition-all duration-200 ${getFeedbackClasses(feedback[q.id])}`}
                        >
                            <option value="" disabled>Tanlang...</option>
                            {q.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <Button onClick={checkAnswers}>Tekshirish</Button>
            </div>
            {totalFeedback && (
                <div className={`mt-4 p-3 text-center rounded-md font-bold ${totalFeedback.includes('0 /') || totalFeedback.includes('1 /') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {totalFeedback}
                </div>
            )}
        </Section>
    );
};

export default MatchingExercise;
