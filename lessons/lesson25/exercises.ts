
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_WEATHER_PHRASES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'Sun in the sky': 'It is sunny.',
        'Water falling from sky': 'It is rainy.',
        'White flakes falling': 'It is snowy.',
        'Trees are moving fast': 'It is windy.',
        'Can not see well': 'It is foggy.',
        'Temperature is 40°C': 'It is hot.',
        'Temperature is -5°C': 'It is cold.',
        'Temperature is 25°C (nice)': 'It is warm.',
        'Grey sky': 'It is cloudy.',
        'Thunder and lightning': 'It is stormy.',
        'You need an umbrella': 'It is rainy.',
        'You need sunglasses': 'It is sunny.',
        'You need a coat': 'It is cold.',
        'Perfect for swimming': 'It is hot.',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l25-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["It", "is", "sunny", "today"], answer: "it is sunny today" },
        { chunks: ["The weather", "is", "very", "cold"], answer: "the weather is very cold" },
        { chunks: ["Is", "it", "raining", "outside?"], answer: "is it raining outside?" },
        { chunks: ["It", "is not", "cloudy", "now"], answer: "it is not cloudy now" },
        { chunks: ["What", "is", "the weather", "like?"], answer: "what is the weather like?" },
        { chunks: ["It", "is", "hot", "in summer"], answer: "it is hot in summer" },
        { chunks: ["I", "like", "sunny", "weather"], answer: "i like sunny weather" },
        { chunks: ["It", "is", "freezing", "today"], answer: "it is freezing today" },
        { chunks: ["It", "is", "windy", "and", "cold"], answer: "it is windy and cold" },
        { chunks: ["Do you", "have", "an", "umbrella?"], answer: "do you have an umbrella?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l25-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Bugun havo quyoshli", answer: "it is sunny today" },
        { prompt: "Tashqarida havo sovuq", answer: "it is cold outside" },
        { prompt: "Hozir yomg'irli", answer: "it is rainy now" },
        { prompt: "Bugun shamol emas", answer: "it is not windy today" },
        { prompt: "Ob-havo issiq", answer: "the weather is hot" },
        { prompt: "Bugun havo bulutli", answer: "it is cloudy today" },
        { prompt: "Yozda havo issiq", answer: "it is hot in summer" }, // 'in summer' is in columns
        { prompt: "Tashqarida havo issiq", answer: "it is hot outside" },
        { prompt: "Hozir havo sovuq emas", answer: "it is not cold now" },
        { prompt: "Bugun havo yomg'irli", answer: "it is rainy today" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l25-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
