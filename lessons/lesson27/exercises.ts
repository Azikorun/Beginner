
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_EMPHASIS_PHRASES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'He is very kind.': 'He is so kind.',
        'It is a beautiful city.': 'It is such a beautiful city.',
        'The test was very hard.': 'The test was so hard.',
        'They are great friends.': 'They are such great friends.',
        'The water is very cold.': 'The water is so cold.',
        'It is a boring movie.': 'It is such a boring movie.',
        'You have a big house.': 'It is such a big house.',
        'She is a smart girl.': 'She is such a smart girl.',
        'The music is very loud.': 'The music is so loud.',
        'He is a fast runner.': 'He is such a fast runner.',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l27-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["She", "is", "so", "beautiful"], answer: "she is so beautiful" },
        { chunks: ["It", "is", "such a", "nice", "car"], answer: "it is such a nice car" },
        { chunks: ["They", "are", "so", "friendly"], answer: "they are so friendly" },
        { chunks: ["He", "is", "such a", "good", "doctor"], answer: "he is such a good doctor" },
        { chunks: ["The movie", "was", "so", "boring"], answer: "the movie was so boring" },
        { chunks: ["It", "is", "such", "warm", "weather"], answer: "it is such warm weather" },
        { chunks: ["You", "are", "so", "kind", "to me"], answer: "you are so kind to me" },
        { chunks: ["This", "is", "such a", "small", "room"], answer: "this is such a small room" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l27-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "U (qiz) shunchalik mehribon", answer: "she is so kind" },
        { prompt: "Bu shunday ajoyib kun", answer: "it is such a nice day" },
        { prompt: "Ular shunchalik go'zal", answer: "they are so beautiful" },
        { prompt: "U shunday yaxshi insonlar", answer: "they are such good people" },
        { prompt: "Kino shunchalik zerikarli", answer: "the movie is so boring" },
        { prompt: "Bu shunday katta uy", answer: "it is such a big house" }, // simplified to match columns
        { prompt: "U shunchalik aqlli", answer: "he is so smart" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l27-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
