import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_COMPARISONS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'Elephant vs. Mouse': 'An elephant is bigger than a mouse.',
        'Car vs. Bicycle': 'A car is faster than a bicycle.',
        'A person who is 90 years old in a family': 'My grandfather is the oldest.',
        'A very delicious pizza': 'This is the best pizza.',
        'A girl (170cm) and her brother (165cm)': 'She is taller than her brother.',
        'Turtle vs. Rabbit race': 'A turtle is slower than a rabbit.',
        'A very boring movie': 'This is the worst movie.',
        'A 20-year-old and a 25-year-old': 'I am younger than you.',
        'A very small car': 'This is the smallest car.',
        'A very fast animal (cheetah)': 'The cheetah is the fastest animal.',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    
    const allOptions = [
        ...ALL_COMPARISONS.map(item => item.english),
        'This is the smallest car.',
        'The cheetah is the fastest animal.',
    ];

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allOptions.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l15-m-q-${i}`,
            question: `Situation: ${subject}`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["My house", "is", "bigger", "than", "your house"], answer: "my house is bigger than your house" },
        { chunks: ["He is", "the tallest", "boy", "in the class"], answer: "he is the tallest boy in the class" },
        { chunks: ["This book is", "better", "than the", "last one"], answer: "this book is better than the last one" },
        { chunks: "A plane is faster than a train".split(" "), answer: "a plane is faster than a train" },
        { chunks: ["This is", "the most", "expensive car"], answer: "this is the most expensive car" },
        { chunks: "She is younger than her sister".split(" "), answer: "she is younger than her sister" },
        { chunks: "Today is colder than yesterday".split(" "), answer: "today is colder than yesterday" },
        { chunks: ["This is the", "worst", "day of my life"], answer: "this is the worst day of my life" },
        { chunks: "English is easier than Chinese".split(" "), answer: "english is easier than chinese" },
        { chunks: ["This is the", "biggest", "animal", "in the world"], answer: "this is the biggest animal in the world" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l15-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Mashina velosipeddan tezroq", answer: "the car is faster than the bike" },
        { prompt: "Mening akam singlimdan balandroq", answer: "my brother is taller than my sister" },
        { prompt: "Fil eng katta hayvon", answer: "an elephant is the biggest animal" },
        { prompt: "Bu kitob anavidan yaxshiroq", answer: "this book is better than that book" },
        { prompt: "Velosiped mashinadan sekinroq", answer: "the bike is slower than the car" },
        { prompt: "Mening singlim akamdan yoshroq", answer: "my sister is younger than my brother" },
        { prompt: "Bu eng yomon kitob", answer: "this is the worst book" },
        { prompt: "Samolyot eng tez transport", answer: "a plane is the fastest transport" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l15-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};