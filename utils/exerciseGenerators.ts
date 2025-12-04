
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../types';
import { ALL_PLACES } from '../data/lessonData';

export const shuffleArray = <T,>(array: T[]): T[] => {
    let a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'cook dinner': 'in the kitchen',
        'take a shower': 'in the bathroom',
        'make the bed': 'in the bedroom',
        'check emails': 'at my desk',
        'read a book': 'in the living room',
        'watch TV': 'in the living room',
        'drink tea': 'in the kitchen'
    };
    const actions = shuffleArray(Object.keys(pairings));
    return actions.slice(0, count).map((action, i) => {
        const correctAnswer = pairings[action];
        const wrongAnswers = shuffleArray(ALL_PLACES.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]] as string[]);
        return {
            id: `m-q-${i}`,
            question: `I ${action}...`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["I cook dinner", "in the kitchen", "on weekends"], answer: "i cook dinner in the kitchen on weekends" },
        { chunks: ["I read a book", "but", "I don't watch TV"], answer: "i read a book but i don't watch tv" },
        { chunks: ["I check emails", "at my desk", "in the morning"], answer: "i check emails at my desk in the morning" },
        { chunks: ["I listen to music", "in my bedroom", "before bed"], answer: "i listen to music in my bedroom before bed" },
        { chunks: ["You take a shower", "every day"], answer: "you take a shower every day" }
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men har kuni mehmonxonada televizor ko'raman", answer: "i watch tv in the living room every day" },
        { prompt: "Siz dam olish kunlari oshxonada ovqat pishirasiz", answer: "you cook dinner in the kitchen on weekends" },
        { prompt: "Men yotoqxonada kitob o'qiyman", answer: "i read a book in the bedroom" },
        { prompt: "Siz kechqurun musiqa tinglaysiz", answer: "you listen to music in the evening" }
    ];
    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer
    }));
};
