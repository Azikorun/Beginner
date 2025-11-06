import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_ADVICE_AND_RULES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'You are in a library.': 'You must be quiet.',
        'You have a headache.': 'You should take an aspirin.',
        'The traffic light is red.': 'You must stop.',
        'It is very cold outside.': 'You should wear a coat.',
        'You are in a museum.': "You mustn't touch the paintings.",
        'You want to be healthy.': "You shouldn't eat fast food.",
        'You have a big exam tomorrow.': 'You must study.',
        'Your friend is sad.': 'You should talk to him.',
        'This is a secret.': "You mustn't tell anyone.",
        'It is late and you are tired.': 'You should go to bed.',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    
    const allOptions = [
        "You must be quiet.",
        "You should take an aspirin.",
        "You must stop.",
        "You should wear a coat.",
        "You mustn't touch the paintings.",
        "You shouldn't eat fast food.",
        "You must study.",
        "You should talk to him.",
        "You mustn't tell anyone.",
        "You should go to bed.",
    ];

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allOptions.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l14-m-q-${i}`,
            question: `Situation: ${subject}`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["You", "must", "do your", "homework"], answer: "you must do your homework" },
        { chunks: ["He", "should", "see", "a doctor"], answer: "he should see a doctor" },
        { chunks: ["Students", "mustn't", "run", "in the school"], answer: "students mustn't run in the school" },
        { chunks: ["You", "shouldn't", "watch so", "much TV"], answer: "you shouldn't watch so much tv" },
        { chunks: ["I", "must", "wake up", "early tomorrow"], answer: "i must wake up early tomorrow" },
        { chunks: ["She", "should", "drink", "more water"], answer: "she should drink more water" },
        { chunks: ["You", "mustn't", "be late", "for the meeting"], answer: "you mustn't be late for the meeting" },
        { chunks: ["People", "shouldn't", "throw trash", "on the street"], answer: "people shouldn't throw trash on the street" },
        { chunks: ["We", "must", "listen to", "the teacher"], answer: "we must listen to the teacher" },
        { chunks: ["You", "should", "get some", "rest"], answer: "you should get some rest" },
        { chunks: ["A driver", "must", "have a", "license"], answer: "a driver must have a license" },
        { chunks: ["It's a good book.", "You", "should", "read it"], answer: "it's a good book. you should read it" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l14-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Siz kutubxonada jim bo'lishingiz shart.", answer: "you must be quiet in the library" },
        { prompt: "U (o'g'il bola) shifokorga ko'rinishi kerak.", answer: "he should see a doctor" },
        { prompt: "Talabalar imtihonga o'qishlari shart.", answer: "students must study for the test" },
        { prompt: "Siz har kuni zararli ovqat yemasligingiz kerak.", answer: "you shouldn't eat junk food every day" },
        { prompt: "U (o'g'il bola) imtihonga o'qishi kerak.", answer: "he should study for the test" },
        { prompt: "Talabalar kutubxonada jim bo'lishlari shart.", answer: "students must be quiet in the library" },
        { prompt: "Siz zararli ovqat yemasligingiz kerak.", answer: "you shouldn't eat junk food" },
        { prompt: "Talabalar shifokorga ko'rinishi kerak.", answer: "students should see a doctor" },
        { prompt: "U (o'g'il bola) kutubxonada jim bo'lishi shart.", answer: "he must be quiet in the library" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l14-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};