
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_DEGREE_PHRASES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'I cannot drink it (40°C).': 'It is too hot.',
        'I can reach the shelf.': 'I am tall enough.',
        'I cannot carry it (50kg).': 'It is too heavy.',
        'He is 5 years old (needs 18).': 'He is not old enough.',
        'I have $10, it costs $100.': 'It is too expensive.',
        'The water is 25°C (perfect).': 'It is warm enough.',
        'The room is 5m x 5m (okay).': 'It is big enough.',
        'My feet hurt in these.': 'They are too small.',
        'I cannot sleep (noise).': 'It is too loud.',
        'I can buy this phone ($200).': 'I am rich enough.',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([situation, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l28-m-q-${i}`,
            question: situation,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["The soup", "is", "too hot", "to eat"], answer: "the soup is too hot to eat" },
        { chunks: ["I am", "not", "tall", "enough"], answer: "i am not tall enough" },
        { chunks: ["This car", "is", "too expensive"], answer: "this car is too expensive" },
        { chunks: ["The room", "is", "big", "enough"], answer: "the room is big enough" },
        { chunks: ["It is", "too cold", "outside"], answer: "it is too cold outside" },
        { chunks: ["He is", "old", "enough", "to drive"], answer: "he is old enough to drive" },
        { chunks: ["The box", "is", "too heavy", "for me"], answer: "the box is too heavy for me" },
        { chunks: ["Is", "the water", "warm", "enough?"], answer: "is the water warm enough?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l28-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Choy juda issiq", answer: "the tea is too hot" },
        { prompt: "Mening bo'yim yetarli", answer: "i am tall enough" },
        { prompt: "U (o'g'il) yetarli darajada katta emas", answer: "he is not old enough" },
        { prompt: "Bu sumka juda og'ir", answer: "this bag is too heavy" },
        { prompt: "Oyoq kiyimlar juda kichik", answer: "the shoes are too small" }, // 'small' in data
        { prompt: "Men yetarli darajada boyman", answer: "i am rich enough" },
        { prompt: "Bu yetarli darajada katta", answer: "it is big enough" },
    ];

    // Note: Adjective + Enough order is handled by the builder columns logic
    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l28-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
