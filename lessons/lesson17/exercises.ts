import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_LOCATIONS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'A cat sitting on top of a table.': 'The cat is on the table.',
        'An apple inside a closed box.': 'The apple is in the box.',
        'Shoes placed beneath a bed.': 'The shoes are under the bed.',
        'A book resting on a chair.': 'The book is on the chair.',
        'Keys inside a bag.': 'The keys are in the bag.',
        'A dog resting in the shade of a tree.': 'The dog is under the tree.',
        'A pen on top of a desk.': 'The pen is on the desk.',
        'A ball inside a toy chest.': 'The ball is in the box.',
        'A cat hiding below a car.': 'The cat is under the car.',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    
    const allOptions = [
        ...ALL_LOCATIONS.map(item => item.english),
        'The pen is on the desk.',
        'The ball is in the box.',
        'The cat is under the car.',
    ];

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allOptions.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l17-m-q-${i}`,
            question: `Situation: ${subject}`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["The book", "is", "on", "the table"], answer: "the book is on the table" },
        { chunks: ["The cat", "is", "under", "the chair"], answer: "the cat is under the chair" },
        { chunks: ["My keys", "are", "in", "my bag"], answer: "my keys are in my bag" },
        { chunks: ["Where", "is", "the", "ball?"], answer: "where is the ball?" },
        { chunks: ["The apple", "is not", "on", "the box"], answer: "the apple is not on the box" },
        { chunks: ["The shoes", "are", "under", "the bed"], answer: "the shoes are under the bed" },
        { chunks: ["The pencil", "is", "in", "the pencil case"], answer: "the pencil is in the pencil case" },
        { chunks: ["The bird", "is", "on", "the tree"], answer: "the bird is on the tree" },
        { chunks: ["The dog", "is sleeping", "under", "the table"], answer: "the dog is sleeping under the table" },
        { chunks: ["The food", "is", "in", "the fridge"], answer: "the food is in the fridge" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l17-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Koptok qutining ichida", answer: "the ball is in the box" },
        { prompt: "Kalitlar stolning ustida", answer: "the keys are on the table" },
        { prompt: "Mushuk stulning ostida", answer: "the cat is under the chair" },
        { prompt: "Kitob krovatning ustida", answer: "the book is on the bed" },
        { prompt: "Koptok krovatning ostida", answer: "the ball is under the bed" },
        { prompt: "Kalitlar qutining ichida", answer: "the keys are in the box" },
        { prompt: "Mushuk stolning ustida", answer: "the cat is on the table" },
        { prompt: "Kitob stulning ostida", answer: "the book is under the chair" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l17-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};