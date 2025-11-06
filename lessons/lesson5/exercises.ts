
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_OBJECTS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'One pen, near me': 'This is a pen.',
        'One chair, far away': 'That is a chair.',
        'Many books, near me': 'These are books.',
        'Many students, far away': 'Those are students.',
        'One teacher, far away': 'That is a teacher.',
        'One notebook, near me': 'This is a notebook.',
        'One window, far away': 'That is a window.',
        'One eraser, near me': 'This is an eraser.',
        'Many pencils, near me': 'These are pencils.',
        'Many desks, far away': 'Those are desks.',
        'One door, far away': 'That is a door.',
        'One book, near me': 'This is a book.',
        'Many chairs, far away': 'Those are chairs.',
        'One desk, far away': 'That is a desk.',
        'Many pens, near me': 'These are pens.',
        'One student, far away': 'That is a student.',
        'Many windows, far away': 'Those are windows.',
        'One pencil, near me': 'This is a pencil.',
        'Many erasers, near me': 'These are erasers.',
        'Many teachers, far away': 'Those are teachers.',
    };
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_OBJECTS.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l5-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["This", "is", "a", "notebook"], answer: "this is a notebook" },
        { chunks: ["What", "is", "that?"], answer: "what is that?" },
        { chunks: ["These", "are", "my", "pencils"], answer: "these are my pencils" },
        { chunks: ["Those", "are", "students"], answer: "those are students" },
        { chunks: ["That", "is", "an", "apple"], answer: "that is an apple" },
        { chunks: ["What", "are", "these?"], answer: "what are these?" },
        { chunks: ["This", "is not", "my book"], answer: "this is not my book" },
        { chunks: ["That", "is", "a", "big window"], answer: "that is a big window" },
        { chunks: ["These pens", "are", "blue"], answer: "these pens are blue" },
        { chunks: ["Those chairs", "are not", "new"], answer: "those chairs are not new" },
        { chunks: ["Is this", "an eraser?"], answer: "is this an eraser?" },
        { chunks: ["Are those", "your books?"], answer: "are those your books?" },
        { chunks: ["This", "is", "a teacher"], answer: "this is a teacher" },
        { chunks: ["That door", "is", "open"], answer: "that door is open" },
        { chunks: ["These", "are", "not", "pencils"], answer: "these are not pencils" },
        { chunks: ["Those", "are", "your", "desks"], answer: "those are your desks" },
        { chunks: ["What is", "on that desk?"], answer: "what is on that desk?" },
        { chunks: ["This chair", "is", "small"], answer: "this chair is small" },
        { chunks: ["Are these", "the new", "students?"], answer: "are these the new students?" },
        { chunks: ["Those", "are not", "my keys"], answer: "those are not my keys" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l5-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Bu kitob", answer: "this is a book" },
        { prompt: "Anavi olma", answer: "that is an apple" },
        { prompt: "Bular ruchkalar", answer: "these are pens" },
        { prompt: "Anavilar stullar", answer: "those are chairs" },
        { prompt: "Bu olma", answer: "this is an apple" },
        { prompt: "Anavi kitob", answer: "that is a book" },
        { prompt: "Bular stullar", answer: "these are chairs" },
        { prompt: "Anavilar ruchkalar", answer: "those are pens" },
        { prompt: "Bu stul", answer: "this is a chair" },
        { prompt: "Anavi ruchka", answer: "that is a pen" },
        { prompt: "Bular olmalar", answer: "these are apples" },
        { prompt: "Anavilar kitoblar", answer: "those are books" },
        { prompt: "Bu ruchka", answer: "this is a pen" },
        { prompt: "Anavi stul", answer: "that is a chair" },
        { prompt: "Bular kitoblar", answer: "these are books" },
        { prompt: "Anavilar olmalar", answer: "those are apples" },
        { prompt: "Bu kitob emas", answer: "this is not a book" },
        { prompt: "Anavi olma emas", answer: "that is not an apple" },
        { prompt: "Bular ruchka emas", answer: "these are not pens" },
        { prompt: "Anavilar stul emas", answer: "those are not chairs" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l5-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
