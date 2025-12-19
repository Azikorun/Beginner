
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_ECOLOGY_PHRASES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'Too much plastic': 'Recycle it.',
        'The air is dirty': 'Plant more trees.',
        'Wasting water': 'Turn off the tap.',
        'Cutting trees': 'Stop doing it.',
        'Climate change': 'Protect the earth.',
        'Dirty oceans': 'Clean up the beach.',
        'Global warming': 'The planet is hot.',
        'The planet is our home': 'Protect it.',
        'Paper and glass': 'Recycle them.',
        'Future generations': 'Save the nature.',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l26-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["We", "should", "protect", "the planet"], answer: "we should protect the planet" },
        { chunks: ["Don't", "waste", "clean water"], answer: "don't waste clean water" },
        { chunks: ["Plastic", "is bad", "for the ocean"], answer: "plastic is bad for the ocean" },
        { chunks: ["We must", "recycle", "paper"], answer: "we must recycle paper" },
        { chunks: ["The earth", "is getting", "warmer"], answer: "the earth is getting warmer" },
        { chunks: ["Planting trees", "helps", "nature"], answer: "planting trees helps nature" },
        { chunks: ["Stop", "pollution", "now"], answer: "stop pollution now" },
        { chunks: ["I like", "clean air"], answer: "i like clean air" },
        { chunks: ["Nature", "is", "beautiful"], answer: "nature is beautiful" },
        { chunks: ["You should", "save", "energy"], answer: "you should save energy" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l26-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Biz sayyorani himoya qilishimiz kerak", answer: "we should protect the planet" },
        { prompt: "Plastikni qayta ishlang", answer: "you should recycle plastic" },
        { prompt: "Suvni tejamang (not)", answer: "you shouldn't waste water" },
        { prompt: "Odamlar tabiatni himoya qilishlari shart", answer: "people must protect nature" },
        { prompt: "Biz suvni tejashimiz kerak", answer: "we should save water" },
        { prompt: "Plastikni tashlamasligingiz kerak", answer: "you shouldn't waste plastic" },
        { prompt: "Biz tabiatni himoya qilishimiz shart", answer: "we must protect nature" },
        { prompt: "Siz suvni tejashingiz kerak", answer: "you should save water" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l26-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
