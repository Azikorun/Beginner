
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_TRANSPORT_PHRASES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'It flies in the sky': 'a plane',
        'It goes on rails': 'a train',
        'You walk': 'on foot',
        'It has two wheels': 'a bicycle',
        'A yellow car you pay for': 'a taxi',
        'It stops at a bus stop': 'a bus',
        'You drive it on the road': 'a car',
        'It goes on water': 'a boat',
        'Place for planes': 'airport',
        'Underground train': 'metro',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l23-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["I", "go to", "school", "by bus"], answer: "i go to school by bus" },
        { chunks: ["She", "goes", "to work", "on foot"], answer: "she goes to work on foot" },
        { chunks: ["We", "travel", "to London", "by plane"], answer: "we travel to london by plane" },
        { chunks: ["He", "drives", "a red car"], answer: "he drives a red car" },
        { chunks: ["Do you", "go", "by train?"], answer: "do you go by train?" },
        { chunks: ["They", "don't", "like", "flying"], answer: "they don't like flying" },
        { chunks: ["I", "ride", "my bike", "every day"], answer: "i ride my bike every day" },
        { chunks: ["The bus", "stops", "here"], answer: "the bus stops here" },
        { chunks: ["How", "do you", "get to", "work?"], answer: "how do you get to work?" },
        { chunks: ["We", "go", "by taxi"], answer: "we go by taxi" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l23-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men ishga mashinada boraman", answer: "i go to work by car" },
        { prompt: "U (qiz bola) maktabga piyoda boradi", answer: "she goes to school on foot" },
        { prompt: "Biz Londonga samolyotda sayohat qilamiz", answer: "we travel to london by plane" },
        { prompt: "Ular maktabga avtobusda boradilar", answer: "they go to school by bus" },
        { prompt: "Siz Toshkentga poezdda borasiz", answer: "you go to tashkent by train" },
        { prompt: "U (o'g'il bola) ishga piyoda boradi", answer: "he goes to work on foot" },
        { prompt: "Men Londonga samolyotda boraman", answer: "i go to london by plane" },
        { prompt: "Biz ishga avtobusda boramiz", answer: "we go to work by bus" },
        { prompt: "U (qiz bola) Toshkentga mashinada boradi", answer: "she goes to tashkent by car" },
        { prompt: "Ular Londonga sayohat qilishadi", answer: "they travel to london" },
        { prompt: "Men maktabga velosipedda (by bike) boraman", answer: "i go to school by bike" }, // Note: 'by bike' not in columns, replacing with 'on foot' or similar if strictly following columns, but usually users want exact match. Let's adjust to columns.
        // Adjusting prompt to fit columns:
        { prompt: "Men maktabga piyoda boraman", answer: "i go to school on foot" },
    ];
    
    // Ensure all answers can be built from SENTENCE_BUILDER_COLUMNS in data.ts
    // Columns: 
    // Subject: I, You, He, She, We, They
    // Verb: go, goes, travel, travels
    // Dest: to work, to school, to London, to Tashkent
    // Transport: by car, by bus, by train, by plane, on foot

    const validPrompts = [
        { prompt: "Men ishga mashinada boraman", answer: "i go to work by car" },
        { prompt: "U (qiz bola) maktabga piyoda boradi", answer: "she goes to school on foot" },
        { prompt: "Biz Londonga samolyotda sayohat qilamiz", answer: "we travel to london by plane" },
        { prompt: "Ular maktabga avtobusda boradilar", answer: "they go to school by bus" },
        { prompt: "Siz Toshkentga poezdda borasiz", answer: "you go to tashkent by train" },
        { prompt: "U (o'g'il bola) ishga piyoda boradi", answer: "he goes to work on foot" },
        { prompt: "Men Londonga samolyotda boraman", answer: "i go to london by plane" },
        { prompt: "Biz ishga avtobusda boramiz", answer: "we go to work by bus" },
        { prompt: "U (qiz bola) Toshkentga mashinada boradi", answer: "she goes to tashkent by car" },
        { prompt: "Ular Londonga samolyotda boradilar", answer: "they go to london by plane" },
    ];

    return shuffleArray(validPrompts).slice(0, count).map((p, i) => ({
        id: `l23-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
