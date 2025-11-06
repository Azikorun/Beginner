
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_PLACES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'cook dinner': 'in the kitchen',
        'take a shower': 'in the bathroom',
        'make the bed': 'in the bedroom',
        'check emails': 'at my desk',
        'read a book': 'in the living room',
        'watch TV': 'in the living room',
        'drink tea': 'in the kitchen',
        'get dressed': 'in the bedroom',
        'wash hands': 'in the bathroom',
        'eat breakfast': 'in the kitchen',
        'do homework': 'at my desk',
        'relax on the sofa': 'in the living room',
        'prepare a snack': 'in the kitchen',
        'brush teeth': 'in the bathroom',
        'sleep': 'in the bedroom',
        'work on the computer': 'at my desk',
        'talk with family': 'in the living room',
        'get a glass of water': 'in the kitchen',
        'dry off with a towel': 'in the bathroom',
        'choose clothes': 'in the bedroom',
        'send a message': 'at my desk',
        'watch a movie': 'in the living room',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    
    return allPairings.slice(0, count).map(([action, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_PLACES.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
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
        { chunks: ["You take a shower", "every day"], answer: "you take a shower every day" },
        { chunks: ["I make the bed", "in the morning"], answer: "i make the bed in the morning" },
        { chunks: ["You drink tea", "after work"], answer: "you drink tea after work" },
        { chunks: ["I relax", "in the living room", "in the evening"], answer: "i relax in the living room in the evening" },
        { chunks: ["You work", "at your desk", "every day"], answer: "you work at your desk every day" },
        { chunks: ["I don't cook dinner", "on Mondays"], answer: "i don't cook dinner on mondays" },
        { chunks: ["Do you check emails", "on weekends?"], answer: "do you check emails on weekends?" },
        { chunks: ["I listen to music", "after work"], answer: "i listen to music after work" },
        { chunks: ["You make the bed", "every morning"], answer: "you make the bed every morning" },
        { chunks: ["I watch TV", "before bed"], answer: "i watch tv before bed" },
        { chunks: ["I don't read books", "in the kitchen"], answer: "i don't read books in the kitchen" },
        { chunks: ["Do you drink tea", "in the garden?"], answer: "do you drink tea in the garden?" },
        { chunks: ["I take a shower", "after I exercise"], answer: "i take a shower after i exercise" },
        { chunks: ["You listen to music", "on the bus"], answer: "you listen to music on the bus" },
        { chunks: ["I check emails", "before I start work"], answer: "i check emails before i start work" },
        { chunks: ["You read a book", "in the garden", "on weekends"], answer: "you read a book in the garden on weekends" },
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
        { prompt: "Siz kechqurun musiqa tinglaysiz", answer: "you listen to music in the evening" },
        { prompt: "Siz har kuni televizor ko'rasiz", answer: "you watch tv every day" },
        { prompt: "Men dam olish kunlari kitob o'qiyman", answer: "i read a book on weekends" },
        { prompt: "Men ertalab musiqa tinglayman", answer: "i listen to music in the morning" },
        { prompt: "Siz ish stolingizda kitob o'qiysiz", answer: "you read a book at my desk" },
        { prompt: "Men har kuni ovqat pishiraman", answer: "i cook dinner every day" },
        { prompt: "Siz yotoqxonada televizor ko'rasiz", answer: "you watch tv in the bedroom" },
        { prompt: "Men kechqurun kitob o'qiyman", answer: "i read a book in the evening" },
        { prompt: "Siz oshxonada musiqa tinglaysiz", answer: "you listen to music in the kitchen" },
        { prompt: "Men dam olish kunlari televizor ko'raman", answer: "i watch tv on weekends" },
        { prompt: "Siz ertalab ovqat pishirasiz", answer: "you cook dinner in the morning" },
        { prompt: "Men ish stolimda musiqa tinglayman", answer: "i listen to music at my desk" },
        { prompt: "Siz mehmonxonada kitob o'qiysiz", answer: "you read a book in the living room" },
        { prompt: "Men har kuni musiqa tinglayman", answer: "i listen to music every day" },
        { prompt: "Siz kechqurun ovqat pishirasiz", answer: "you cook dinner in the evening" },
        { prompt: "Men yotoqxonada televizor ko'raman", answer: "i watch tv in the bedroom" },
        { prompt: "Siz dam olish kunlari musiqa tinglaysiz", answer: "you listen to music on weekends" },
    ];
    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer
    }));
};
