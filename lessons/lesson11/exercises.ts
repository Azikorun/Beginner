import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_ITEMS_FOR_MATCHING } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'One car, any car': 'a car',
        'One apple, any apple': 'an apple',
        'The only sky we have': 'the sky',
        'One house, any house': 'a house',
        'One orange, any orange': 'an orange',
        'The only sun in our solar system': 'the sun',
        '60 minutes of time': 'an hour',
        'One student, any student': 'a student',
        'The only moon of Earth': 'the moon',
        'An animal from Africa (starts with E)': 'an elephant',
        'Something to read': 'a book',
        'The leader of a country': 'the president',
    };
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_ITEMS_FOR_MATCHING.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l11-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["I", "see", "a", "big dog"], answer: "i see a big dog" },
        { chunks: ["She", "is eating", "an", "apple"], answer: "she is eating an apple" },
        { chunks: ["The sun", "is", "very hot", "today"], answer: "the sun is very hot today" },
        { chunks: ["He has", "a", "blue car"], answer: "he has a blue car" },
        { chunks: ["I need", "an", "umbrella"], answer: "i need an umbrella" },
        { chunks: ["Look at", "the", "beautiful moon"], answer: "look at the beautiful moon" },
        { chunks: ["That is", "an", "old house"], answer: "that is an old house" },
        { chunks: ["I want", "a", "new book"], answer: "i want a new book" },
        { chunks: ["The sky", "is", "blue"], answer: "the sky is blue" },
        { chunks: ["This is", "an", "easy", "question"], answer: "this is an easy question" },
        { chunks: ["He is", "a", "good student"], answer: "he is a good student" },
        { chunks: ["The world", "is", "a big place"], answer: "the world is a big place" },
        { chunks: ["An elephant", "is a", "large animal"], answer: "an elephant is a large animal" },
        { chunks: ["The test starts", "in an", "hour"], answer: "the test starts in an hour" },
        { chunks: ["I see", "the", "president", "on TV"], answer: "i see the president on tv" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l11-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men mashina ko'ryapman", answer: "i see a car" },
        { prompt: "U (qiz bola) olma xohlaydi", answer: "she wants an apple" },
        { prompt: "U (o'g'il bola) kitobga ega", answer: "he has a book" },
        { prompt: "Men quyoshni ko'ryapman", answer: "i see the sun" },
        { prompt: "U (qiz bola) mashina xohlaydi", answer: "she wants a car" },
        { prompt: "U (o'g'il bola) olmaga ega", answer: "he has an apple" },
        { prompt: "Men kitob ko'ryapman", answer: "i see a book" },
        { prompt: "U (qiz bola) quyoshni xohlaydi", answer: "she wants the sun" },
        { prompt: "U (o'g'il bola) mashinaga ega", answer: "he has a car" },
        { prompt: "Men olma ko'ryapman", answer: "i see an apple" },
        { prompt: "U (qiz bola) kitob xohlaydi", answer: "she wants a book" },
        { prompt: "U (o'g'il bola) quyoshga ega", answer: "he has the sun" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l11-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};