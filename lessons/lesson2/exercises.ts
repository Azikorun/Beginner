
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_TIMES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'gets up': 'at 7 AM',
        'has breakfast': 'at 7:30 AM',
        'goes to work': 'at 8 AM',
        'starts work': 'at 9 AM',
        'has a meeting': 'at 10 AM', // Note: might need to add vocab for this
        'has lunch': 'at 1 PM',
        'drinks coffee': 'at 3 PM',
        'finishes work': 'at 6 PM',
        'goes home': 'at 6 PM',
        'has dinner': 'at 8 PM',
        'watches TV': 'at 9 PM',
        'goes to bed': 'at 11 PM',
        'studies English': 'in the evening',
        'exercises': 'in the morning',
        'reads a book': 'before bed', // Note: might need to add vocab
        'checks email': 'at 9 AM',
        'talks to friends': 'in the evening',
        'cleans the house': 'on weekends', // Note: might need to add vocab
        'goes shopping': 'on weekends', // Note: might need to add vocab
        'relaxes': 'in the afternoon',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([action, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_TIMES.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l2-m-q-${i}`,
            question: `He ${action}...`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["He gets up", "at 7 AM", "every day"], answer: "he gets up at 7 am every day" },
        { chunks: ["She has breakfast", "in the kitchen"], answer: "she has breakfast in the kitchen" },
        { chunks: ["She doesn't go to work", "on Sundays"], answer: "she doesn't go to work on sundays" },
        { chunks: ["He finishes work", "at 6 PM"], answer: "he finishes work at 6 pm" },
        { chunks: ["Does he go home", "in the afternoon?"], answer: "does he go home in the afternoon?" },
        { chunks: ["She goes to bed", "at 10 PM"], answer: "she goes to bed at 10 pm" },
        { chunks: ["He works", "in an office"], answer: "he works in an office" },
        { chunks: ["She has lunch", "with her friends"], answer: "she has lunch with her friends" },
        { chunks: ["He doesn't have dinner", "at home"], answer: "he doesn't have dinner at home" },
        { chunks: ["Does she get up", "early?"], answer: "does she get up early?" },
        { chunks: ["He goes to work", "by bus"], answer: "he goes to work by bus" },
        { chunks: ["She likes", "her job"], answer: "she likes her job" },
        { chunks: ["He has", "two children"], answer: "he has two children" },
        { chunks: ["She watches TV", "in the evening"], answer: "she watches tv in the evening" },
        { chunks: ["He doesn't like", "coffee"], answer: "he doesn't like coffee" },
        { chunks: ["Does he work", "on weekends?"], answer: "does he work on weekends?" },
        { chunks: ["She finishes work", "late"], answer: "she finishes work late" },
        { chunks: ["He goes to bed", "at midnight"], answer: "he goes to bed at midnight" },
        { chunks: ["She doesn't have breakfast", "every day"], answer: "she doesn't have breakfast every day" },
        { chunks: ["Does she go home", "at 5 PM?"], answer: "does she go home at 5 pm?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l2-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "U (o'g'il bola) ertalab nonushta qiladi", answer: "he has breakfast in the morning" },
        { prompt: "U (qiz bola) soat 6 da ishni tugatadi", answer: "she finishes work at 6 pm" },
        { prompt: "U (o'g'il bola) soat 7 da uyg'onadi", answer: "he gets up at 7 am" },
        { prompt: "U (qiz bola) ishga boradi", answer: "she goes to work" },
        { prompt: "U (qiz bola) soat 7 da nonushta qiladi", answer: "she has breakfast at 7 am" },
        { prompt: "U (o'g'il bola) kechqurun ishni tugatadi", answer: "he finishes work in the evening" },
        { prompt: "U (qiz bola) ertalab uyg'onadi", answer: "she gets up in the morning" },
        { prompt: "U (o'g'il bola) ishga boradi", answer: "he goes to work" },
        { prompt: "U (qiz bola) kechqurun nonushta qiladi", answer: "she has breakfast in the evening" }, // A bit strange, but grammatically correct
        { prompt: "U (o'g'il bola) soat 6 da uyg'onadi", answer: "he gets up at 6 pm" }, // Also strange, but possible
        { prompt: "U (qiz bola) ertalab ishni tugatadi", answer: "she finishes work in the morning" },
        { prompt: "U (o'g'il bola) soat 7 da ishga boradi", answer: "he goes to work at 7 am" },
        { prompt: "U (qiz bola) soat 6 da nonushta qiladi", answer: "she has breakfast at 6 pm" },
        { prompt: "U (o'g'il bola) kechqurun uyg'onadi", answer: "he gets up in the evening" },
        { prompt: "U (qiz bola) ishni ertalab tugatadi", answer: "she finishes work in the morning" },
        { prompt: "U (o'g'il bola) ertalab ishga boradi", answer: "he goes to work in the morning" },
        { prompt: "U (qiz bola) kechqurun nonushta qilmaydi", answer: "she does not have breakfast in the evening" }, // Requires more columns
        { prompt: "U (o'g'il bola) soat 7 da nonushta qiladi", answer: "he has breakfast at 7 am" },
        { prompt: "U (qiz bola) kechqurun ishga boradi", answer: "she goes to work in the evening" },
        { prompt: "U (o'g'il bola) soat 6 da ishga boradi", answer: "he goes to work at 6 pm" },
    ];
    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l2-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer
    }));
};
