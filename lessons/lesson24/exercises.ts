
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_QUESTIONS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'Asks about a place (Joy)': 'Where',
        'Asks about a time (Vaqt)': 'When',
        'Asks about a person (Shaxs)': 'Who',
        'Asks about a thing (Narsa)': 'What',
        'Asks about a reason (Sabab)': 'Why',
        'Asks about a method/feeling (Holat)': 'How',
        'Where do you live?': 'I live in Tashkent.',
        'What is your name?': 'My name is Ali.',
        'When is your birthday?': 'In May.',
        'Who is that?': 'That is my brother.',
        'How are you?': 'I am fine, thanks.',
        'Why are you happy?': 'Because it is Friday.',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l24-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["Where", "do", "you", "live?"], answer: "where do you live?" },
        { chunks: ["What", "is", "your", "name?"], answer: "what is your name?" },
        { chunks: ["When", "does", "the bus", "come?"], answer: "when does the bus come?" },
        { chunks: ["Who", "is", "that", "man?"], answer: "who is that man?" },
        { chunks: ["How", "old", "are", "you?"], answer: "how old are you?" },
        { chunks: ["Why", "are", "you", "late?"], answer: "why are you late?" },
        { chunks: ["What", "do", "you", "do?"], answer: "what do you do?" },
        { chunks: ["Where", "is", "the", "bathroom?"], answer: "where is the bathroom?" },
        { chunks: ["How", "much", "is", "this?"], answer: "how much is this?" },
        { chunks: ["When", "do", "you", "wake up?"], answer: "when do you wake up?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l24-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Siz qayerda yashaysiz?", answer: "where do you live" },
        { prompt: "Bu nima?", answer: "what is this" },
        { prompt: "U (o'g'il bola) qayerdan?", answer: "where is he from" },
        { prompt: "Siz nima qilyapsiz?", answer: "what are you doing" }, // Requires 'doing' in verb col
        { prompt: "Qachon borasiz?", answer: "when do you go" },
        { prompt: "U (qiz bola) kim?", answer: "who is she" },
        { prompt: "Nega siz bu yerdasiz?", answer: "why are you here" }, // 'here' is tricky, maybe 'from' fits better? or add 'here' to col
        { prompt: "Siz qanday ishlaysiz?", answer: "how do you work" },
        { prompt: "Ular qayerda?", answer: "where are they" },
        { prompt: "Bu nima qiladi?", answer: "what does this do" },
    ];

    // Ensure columns support these. 
    // Cols: [What, Where, When, Who, How, Why]
    // Aux: [do, does, is, are, can]
    // Sub: [you, he, she, it, they, this]
    // Verb: [live, work, go, from, do, doing]

    // Adjusted prompts to strictly match columns for simplicity if needed
    const strictPrompts = [
        { prompt: "Siz qayerda yashaysiz?", answer: "where do you live" },
        { prompt: "Bu nima?", answer: "what is this" },
        { prompt: "U (o'g'il bola) qayerdan?", answer: "where is he from" },
        { prompt: "Siz qachon ishlaysiz?", answer: "when do you work" },
        { prompt: "U (qiz bola) kim?", answer: "who is she" },
        { prompt: "Ular qayerda ishlaydi?", answer: "where do they work" },
        { prompt: "Siz nima qilasiz?", answer: "what do you do" },
        { prompt: "U (o'g'il bola) qachon boradi?", answer: "when does he go" }, 
        { prompt: "Bu qanday ishlaydi?", answer: "how does this work" },
        { prompt: "Ular kim?", answer: "who are they" },
    ];

    return shuffleArray(strictPrompts).slice(0, count).map((p, i) => ({
        id: `l24-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
