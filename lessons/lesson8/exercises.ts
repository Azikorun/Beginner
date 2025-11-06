import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_TIMES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        "1:00": "It's one o'clock",
        "2:00": "It's two o'clock",
        "3:00": "It's three o'clock",
        "4:00": "It's four o'clock",
        "5:00": "It's five o'clock",
        "6:00": "It's six o'clock",
        "7:00": "It's seven o'clock",
        "8:00": "It's eight o'clock",
        "9:00": "It's nine o'clock",
        "10:00": "It's ten o'clock",
        "11:00": "It's eleven o'clock",
        "12:00": "It's twelve o'clock",
        "1:30": "It's half past one",
        "2:30": "It's half past two",
        "4:30": "It's half past four",
        "8:30": "It's half past eight",
        "10:30": "It's half past ten",
        "3:15": "It's a quarter past three",
        "5:15": "It's a quarter past five",
        "7:15": "It's a quarter past seven",
        "9:15": "It's a quarter past nine",
        "11:15": "It's a quarter past eleven",
        "1:45": "It's a quarter to two",
        "3:45": "It's a quarter to four",
        "6:45": "It's a quarter to seven",
        "10:45": "It's a quarter to eleven",
    };
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_TIMES.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l8-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["What", "time", "is", "it?"], answer: "what time is it?" },
        { chunks: ["It", "is", "five", "o'clock"], answer: "it is five o'clock" },
        { chunks: ["It", "is", "half", "past", "two"], answer: "it is half past two" },
        { chunks: ["The time", "is", "ten", "thirty"], answer: "the time is ten thirty" },
        { chunks: ["Excuse me,", "what time", "is it?"], answer: "excuse me, what time is it?" },
        { chunks: ["It is", "a quarter", "to three"], answer: "it is a quarter to three" },
        { chunks: ["The meeting is", "at", "one", "o'clock"], answer: "the meeting is at one o'clock" },
        { chunks: ["I have", "twenty", "books"], answer: "i have twenty books" },
        { chunks: ["There are", "seven", "days", "in a week"], answer: "there are seven days in a week" },
        { chunks: ["It is", "a quarter", "past", "six"], answer: "it is a quarter past six" },
        { chunks: ["She is", "twelve", "years old"], answer: "she is twelve years old" },
        { chunks: ["He has", "eighty", "pencils"], answer: "he has eighty pencils" },
        { chunks: ["The class starts", "at", "nine", "o'clock"], answer: "the class starts at nine o'clock" },
        { chunks: ["It is", "almost", "midnight"], answer: "it is almost midnight" },
        { chunks: ["Lunch is at", "midday"], answer: "lunch is at midday" },
        { chunks: ["I get up at", "six thirty"], answer: "i get up at six thirty" },
        { chunks: ["There are fifty", "states in", "the USA"], answer: "there are fifty states in the usa" },
        { chunks: ["The number is", "one hundred"], answer: "the number is one hundred" },
        { chunks: ["It is ten", "to seven"], answer: "it is ten to seven" },
        { chunks: ["The movie ends", "at nine", "forty-five"], answer: "the movie ends at nine forty-five" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l8-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Soat yetti", answer: "it is seven o'clock" },
        { prompt: "Soat ikkidan yarim soat o'tdi", answer: "it is half past two" },
        { prompt: "Soat o'n", answer: "it is ten o'clock" },
        { prompt: "Soat beshdan chorak o'tdi", answer: "it is quarter past five" },
        { prompt: "Soat to'qqizdan yarim soat o'tdi", answer: "it is half past nine" },
        { prompt: "Soat ikki", answer: "it is two o'clock" },
        { prompt: "Soat yettidan chorak o'tdi", answer: "it is quarter past seven" },
        { prompt: "Soat besh", answer: "it is five o'clock" },
        { prompt: "Soat o'ndan yarim soat o'tdi", answer: "it is half past ten" },
        { prompt: "Soat to'qqiz", answer: "it is nine o'clock" },
        { prompt: "Soat yettidan yarim soat o'tdi", answer: "it is half past seven" },
        { prompt: "Soat ikkidan chorak o'tdi", answer: "it is quarter past two" },
        { prompt: "Soat beshdan yarim soat o'tdi", answer: "it is half past five" },
        { prompt: "Soat o'n bir", answer: "it is eleven o'clock" },
        { prompt: "Soat to'rtdan chorak o'tdi", answer: "it is quarter past four" },
        { prompt: "Soat uch", answer: "it is three o'clock" },
        { prompt: "Soat oltidan yarim soat o'tdi", answer: "it is half past six" },
        { prompt: "Soat bir", answer: "it is one o'clock" },
        { prompt: "Soat sakkizdan chorak o'tdi", answer: "it is quarter past eight" },
        { prompt: "Soat o'n ikkidan yarim soat o'tdi", answer: "it is half past twelve" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l8-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};