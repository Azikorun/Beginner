import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_MODAL_SENTENCES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'The sky is very dark and cloudy.': 'It might rain.',
        'The room is hot. You want someone to open the window.': 'Could you open the window?',
        'You promise to call your friend tomorrow.': 'I will call you tomorrow.',
        'You want to ask your boss for permission to leave.': 'May I leave now?',
        'Your friend is not answering his phone.': 'He may be busy.',
        'You are offering a guest a drink.': 'Would you like some tea?',
        'You are sure she is not coming to the party.': "She won't be at the party.",
        'You are not sure, but maybe you will go to the cinema.': 'I might go to the cinema.',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    
    const allOptions = [
        ...ALL_MODAL_SENTENCES.map(item => item.english),
        "I might go to the cinema."
    ];

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allOptions.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l19-m-q-${i}`,
            question: `Situation: ${subject}`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["I", "will", "be there", "at 8 PM"], answer: "i will be there at 8 pm" },
        { chunks: ["She", "might", "not", "know", "the answer"], answer: "she might not know the answer" },
        { chunks: ["Could you", "please", "speak", "slower?"], answer: "could you please speak slower?" },
        { chunks: ["May I", "ask", "a", "question?"], answer: "may i ask a question?" },
        { chunks: ["He", "won't", "eat", "that"], answer: "he won't eat that" },
        { chunks: ["It", "may be", "a good", "idea"], answer: "it may be a good idea" },
        { chunks: ["Would you", "like", "to come", "with us?"], answer: "would you like to come with us?" },
        { chunks: ["I think", "it will", "be", "sunny tomorrow"], answer: "i think it will be sunny tomorrow" },
        { chunks: ["They", "might", "arrive", "late"], answer: "they might arrive late" },
        { chunks: ["Can you", "help me", "with this", "bag?"], answer: "can you help me with this bag?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l19-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men ertaga kech qolaman", answer: "i will be late tomorrow" },
        { prompt: "Keyinroq yomg'ir yog'ishi mumkin", answer: "it might rain later" },
        { prompt: "U sizga hozir yordam berishi mumkin", answer: "he may help you now" },
        { prompt: "Derazani ocha olasizmi?", answer: "could you open the window?" },
        { prompt: "Ichkariga kirsam maylimi?", answer: "may i come in?" },
        { prompt: "Men sizga yordam beraman", answer: "i will help you" },
        { prompt: "U kech qolishi mumkin", answer: "he might be late" },
        { prompt: "Iltimos, menga yordam bering", answer: "could you please help me?" }, // requires different columns
    ];
    
    // Simplified prompts for the current builder
    const simplePrompts = [
        { prompt: "Ertaga kech qolaman", answer: "i will be late tomorrow" },
        { prompt: "Keyinroq yomg'ir yog'ishi mumkin", answer: "it might rain later" },
        { prompt: "U (o'g'il bola) kech qolishi mumkin", answer: "he may be late" },
        { prompt: "Derazani ochib yuboring?", answer: "could you open the window?" },
        { prompt: "Kirsam maylimi?", answer: "may i come in?" },
        { prompt: "Men endi yordam beraman", answer: "i will help you now" },
    ];

    return shuffleArray(simplePrompts).slice(0, count).map((p, i) => ({
        id: `l19-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};