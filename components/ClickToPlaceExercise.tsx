
import React, { useState, useCallback, useEffect } from 'react';
import { ClickerPuzzle } from '../types';
import Button from './Button';
import Section from './Section';

interface ClickToPlaceExerciseProps {
    puzzles: ClickerPuzzle[];
}

type FeedbackStatus = 'unanswered' | 'correct' | 'incorrect';

interface PuzzleState {
    available: string[];
    placed: string[];
    feedback: FeedbackStatus;
}

const ClickToPlaceExercise: React.FC<ClickToPlaceExerciseProps> = ({ puzzles }) => {
    const getInitialState = useCallback((): Record<string, PuzzleState> =>
        puzzles.reduce((acc, p) => ({
            ...acc,
            [p.id]: { available: [...p.chunks], placed: [], feedback: 'unanswered' }
        }), {}), [puzzles]);

    const [state, setState] = useState<Record<string, PuzzleState>>(getInitialState);
    const [totalFeedback, setTotalFeedback] = useState('');

    useEffect(() => {
        setState(getInitialState());
        setTotalFeedback('');
    }, [puzzles, getInitialState]);

    const handlePlace = (puzzleId: string, chunk: string) => {
        setState(p => ({
            ...p,
            [puzzleId]: {
                ...p[puzzleId],
                available: p[puzzleId].available.filter(c => c !== chunk),
                placed: [...p[puzzleId].placed, chunk],
            }
        }));
    };

    const handleReturn = (puzzleId: string, chunk: string, index: number) => {
        setState(p => {
            const newPlaced = [...p[puzzleId].placed];
            newPlaced.splice(index, 1);
            return {
                ...p,
                [puzzleId]: {
                    ...p[puzzleId],
                    available: [...p[puzzleId].available, chunk],
                    placed: newPlaced,
                }
            };
        });
    };

    const checkAnswers = useCallback(() => {
        let correctCount = 0;
        const newState = { ...state };
        puzzles.forEach(p => {
            const userAnswer = state[p.id].placed.join(' ').toLowerCase();
            if (userAnswer === p.correctAnswer) {
                newState[p.id].feedback = 'correct';
                correctCount++;
            } else {
                newState[p.id].feedback = 'incorrect';
            }
        });
        setState(newState);
        setTotalFeedback(`Natija: ${correctCount} / ${puzzles.length} to'g'ri.`);
    }, [state, puzzles]);
    
    const reset = () => {
      setState(getInitialState());
      setTotalFeedback('');
    }

    return (
        <Section title="Mashq 2: Qismlardan Gap Yig'ing" description="To'g'ri gap hosil qilish uchun kerakli so'z bo'laklarini bosing. Xatoni tuzatish uchun javob qatoridagi so'zga bosing.">
            <div className="space-y-8">
                {puzzles.map(p => (
                    <div key={p.id}>
                        <div className="bg-gray-100 p-3 rounded-lg mb-3 text-center min-h-[60px]">
                            {state[p.id]?.available.map(chunk => (
                                <div key={chunk} onClick={() => handlePlace(p.id, chunk)} className="bg-yellow-400 text-gray-800 p-2 px-4 m-1 rounded-md cursor-pointer inline-block font-semibold hover:bg-yellow-500 hover:scale-105 transition-transform">
                                    {chunk}
                                </div>
                            ))}
                        </div>
                        <div className={`p-4 border-2 border-dashed rounded-lg min-h-[60px] flex flex-wrap items-center transition-colors ${
                            state[p.id]?.feedback === 'correct' ? 'border-green-500 bg-green-50' :
                            state[p.id]?.feedback === 'incorrect' ? 'border-red-500 bg-red-50' :
                            'border-blue-500 bg-gray-50'
                        }`}>
                            {state[p.id]?.placed.length === 0 ? (
                                <span className="text-gray-400">Javobingiz shu yerda paydo bo'ladi</span>
                            ) : (
                                state[p.id]?.placed.map((chunk, i) => (
                                    <div key={`${chunk}-${i}`} onClick={() => handleReturn(p.id, chunk, i)} className="bg-blue-200 text-blue-800 p-2 px-4 m-1 rounded-md cursor-pointer inline-block font-semibold hover:bg-red-200 hover:text-red-800 hover:line-through">
                                        {chunk}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center space-x-4">
                <Button onClick={checkAnswers}>Tekshirish</Button>
                <button onClick={reset} className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all">
                    Qayta Boshlash
                </button>
            </div>
            {totalFeedback && (
                 <div className={`mt-4 p-3 text-center rounded-md font-bold ${totalFeedback.includes('0 /') || totalFeedback.includes('1 /') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {totalFeedback}
                </div>
            )}
        </Section>
    );
};

export default ClickToPlaceExercise;
