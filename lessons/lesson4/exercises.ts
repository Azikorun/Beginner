
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_ABILITIES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'A fish...': 'can swim',
        'A person...': "can't fly",
        'A singer...': 'can sing',
        'A bird...': 'can fly',
        'A cheetah...': 'can run',
        'A chef...': 'can cook',
        'A dancer...': 'can dance',
        'An artist...': 'can draw',
        'A monkey...': 'can climb',
        'A kangaroo...': 'can jump',
        'A musician...': 'can play the guitar',
        'A baby...': "can't ride a bike",
        'A student...': 'can speak English',
        'A cat...': "can't fly",
        'A pilot...': 'can fly',
        'A dog...': "can't sing",
        'An athlete...': 'can run',
        'A teacher...': 'can speak English',
        'A child...': 'can draw',
        'A snake...': "can't run",
    };
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_ABILITIES.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l4-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["I", "can", "speak English"], answer: "i can speak english" },
        { chunks: ["Birds", "can fly", "high"], answer: "birds can fly high" },
        { chunks: ["You", "can't", "swim here"], answer: "you can't swim here" },
        { chunks: ["She", "can", "draw", "very well"], answer: "she can draw very well" },
        { chunks: ["A cat", "can't", "fly"], answer: "a cat can't fly" },
        { chunks: ["Can you", "dance?"], answer: "can you dance?" },
        { chunks: ["He", "can ride", "a bike"], answer: "he can ride a bike" },
        { chunks: ["They", "can't cook"], answer: "they can't cook" },
        { chunks: ["Can she", "sing", "a song?"], answer: "can she sing a song?" },
        { chunks: ["A fish", "can swim", "fast"], answer: "a fish can swim fast" },
        { chunks: ["I", "can't", "play the guitar"], answer: "i can't play the guitar" },
        { chunks: ["Can a monkey", "climb", "a tree?"], answer: "can a monkey climb a tree?" },
        { chunks: ["She", "can", "run", "very fast"], answer: "she can run very fast" },
        { chunks: ["He", "can't", "draw"], answer: "he can't draw" },
        { chunks: ["Can we", "go now?"], answer: "can we go now?" },
        { chunks: ["A dog", "can't", "speak English"], answer: "a dog can't speak english" },
        { chunks: ["I", "can", "help you"], answer: "i can help you" },
        { chunks: ["You", "can't", "park here"], answer: "you can't park here" },
        { chunks: ["Can they", "come", "with us?"], answer: "can they come with us?" },
        { chunks: ["He", "can", "cook", "pizza"], answer: "he can cook pizza" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l4-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men suza olaman", answer: "i can swim" },
        { prompt: "Baliq ucha olmaydi", answer: "a fish can't fly" },
        { prompt: "Siz tez yugura olasiz", answer: "you can run fast" },
        { prompt: "Qush qo'shiq ayta oladi", answer: "a bird can sing" },
        { prompt: "Men qo'shiq ayta olmayman", answer: "i can't sing" },
        { prompt: "Siz suza olasiz", answer: "you can swim" },
        { prompt: "Qush ucha oladi", answer: "a bird can fly" },
        { prompt: "Men tez yugura olmayman", answer: "i can't run fast" },
        { prompt: "Siz qo'shiq ayta olasiz", answer: "you can sing" },
        { prompt: "Baliq suza oladi", answer: "a fish can swim" },
        { prompt: "Men ucha olmayman", answer: "i can't fly" },
        { prompt: "Sizning qushingiz qo'shiq ayta oladimi?", answer: "can your bird sing" }, // Harder
        { prompt: "Men qo'shiq ayta olaman", answer: "i can sing" },
        { prompt: "Baliq yugura olmaydi", answer: "a fish can't run fast" },
        { prompt: "Siz ucha olmaysiz", answer: "you can't fly" },
        { prompt: "Qush suza olmaydi", answer: "a bird can't swim" },
        { prompt: "Men tez yugura olaman", answer: "i can run fast" },
        { prompt: "Sizning balig'ingiz suza oladimi?", answer: "can your fish swim" }, // Harder
        { prompt: "Men qush emasman", answer: "i am not a bird" }, // Different grammar
        { prompt: "Siz qo'shiq ayta olmaysiz", answer: "you can't sing" },
    ];
    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l4-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
