
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_ITEMS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'I have a book. It is...': 'my book',
        'You have a pen. It is...': 'your pen',
        'He has a car. It is...': 'his car',
        'She has a bag. It is...': 'her bag',
        'He has keys. They are...': 'his keys',
        'You have a phone. It is...': 'your phone',
        'I have a bag. It is...': 'my bag',
        'She has a book. It is...': 'her book',
        'He has a phone. It is...': 'his phone',
        'You have keys. They are...': 'your keys',
        'I have a car. It is...': 'my car',
        'She has a pen. It is...': 'her pen',
        'He has a book. It is...': 'his book',
        'You have a bag. It is...': 'your bag',
        'I have a phone. It is...': 'my phone',
        'She has keys. They are...': 'her keys',
        'He has a pen. It is...': 'his pen',
        'You have a car. It is...': 'your car',
        'I have keys. They are...': 'my keys',
        'She has a car. It is...': 'her car',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l7-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["This", "is", "my", "phone"], answer: "this is my phone" },
        { chunks: ["That", "is", "his", "red", "car"], answer: "that is his red car" },
        { chunks: ["Where", "is", "your", "bag?"], answer: "where is your bag?" },
        { chunks: ["Her", "keys", "are", "on the table"], answer: "her keys are on the table" },
        { chunks: ["Is", "this", "your", "pen?"], answer: "is this your pen?" },
        { chunks: ["I like", "her", "new", "bag"], answer: "i like her new bag" },
        { chunks: ["My book", "is", "in my bag"], answer: "my book is in my bag" },
        { chunks: ["His name", "is", "John"], answer: "his name is john" },
        { chunks: ["What is", "your", "name?"], answer: "what is your name?" },
        { chunks: ["Her phone", "is", "not here"], answer: "her phone is not here" },
        { chunks: ["My car", "is very", "old"], answer: "my car is very old" },
        { chunks: ["Is that", "his", "pen?"], answer: "is that his pen?" },
        { chunks: ["Your keys", "are", "not here"], answer: "your keys are not here" },
        { chunks: ["This is", "her", "blue", "book"], answer: "this is her blue book" },
        { chunks: ["My bag", "is", "heavy"], answer: "my bag is heavy" },
        { chunks: ["His phone", "is", "new"], answer: "his phone is new" },
        { chunks: ["What color is", "your", "car?"], answer: "what color is your car?" },
        { chunks: ["I think", "this is", "her pen"], answer: "i think this is her pen" },
        { chunks: ["My pen", "is", "black"], answer: "my pen is black" },
        { chunks: ["His bag", "is", "on the chair"], answer: "his bag is on the chair" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l7-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Mening kitobim yangi", answer: "my book is new" },
        { prompt: "Sizning sumkangiz ko'k", answer: "your bag is blue" },
        { prompt: "Uning (o'g'il bola) ruchkasi shu yerda", answer: "his pen is here" },
        { prompt: "Uning (qiz bola) telefoni eski", answer: "her phone is old" },
        { prompt: "Mening sumkam shu yerda", answer: "my bag is here" },
        { prompt: "Sizning telefoningiz yangi", answer: "your phone is new" },
        { prompt: "Uning (o'g'il bola) kitobi eski", answer: "his book is old" },
        { prompt: "Uning (qiz bola) ruchkasi ko'k", answer: "her pen is blue" },
        { prompt: "Mening telefonim eski", answer: "my phone is old" },
        { prompt: "Sizning kitobingiz shu yerda", answer: "your book is here" },
        { prompt: "Uning (o'g'il bola) sumkasi yangi", answer: "his bag is new" },
        { prompt: "Uning (qiz bola) kitobi shu yerda", answer: "her book is here" },
        { prompt: "Mening ruchkam ko'k", answer: "my pen is blue" },
        { prompt: "Sizning ruchkangiz eski", answer: "your pen is old" },
        { prompt: "Uning (o'g'il bola) telefoni ko'k", answer: "his phone is blue" },
        { prompt: "Uning (qiz bola) sumkasi yangi", answer: "her bag is new" },
        { prompt: "Mening kitobim shu yerda", answer: "my book is here" },
        { prompt: "Sizning sumkangiz eski", answer: "your bag is old" },
        { prompt: "Uning (o'g'il bola) sumkasi shu yerda", answer: "his bag is here" },
        { prompt: "Uning (qiz bola) ruchkasi yangi", answer: "her pen is new" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l7-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
