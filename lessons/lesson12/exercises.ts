import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_POSSESSIONS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'I...': 'have got a car',
        'She...': 'has got a pet',
        'You...': 'have got a sister',
        'The cat...': 'has got blue eyes',
        'He...': 'has got a new phone',
        'The student...': 'has got a question',
        'My friend (male)...': 'has got a brother',
        'They...': 'have got a big house',
        'He has no car.': "hasn't got a car",
        'I am an only child.': "haven't got a brother",
        'We...': 'have got a good teacher',
        'My father...': 'has got a new job',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    
    // Add more variety to options
    const allOptions = [
        ...ALL_POSSESSIONS.map(item => item.english),
        "have got a big house",
        "have got a good teacher",
        "has got a new job",
        "has got a brother",
    ];


    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allOptions.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l12-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        // Positive
        { chunks: ["I", "have got", "a", "question"], answer: "i have got a question" },
        { chunks: ["She", "has got", "a new", "red car"], answer: "she has got a new red car" },
        { chunks: ["They", "have got", "two", "children"], answer: "they have got two children" },
        { chunks: ["My brother", "has got", "blue eyes"], answer: "my brother has got blue eyes" },
        { chunks: ["You", "have got", "a nice", "smile"], answer: "you have got a nice smile" },
        { chunks: ["The house", "has got", "a big", "garden"], answer: "the house has got a big garden" },
        { chunks: ["He", "has got", "a lot of", "friends"], answer: "he has got a lot of friends" },
        
        // Negative
        { chunks: ["He", "hasn't got", "a pet"], answer: "he hasn't got a pet" },
        { chunks: ["I", "haven't got", "a sister"], answer: "i haven't got a sister" },
        { chunks: ["We", "haven't got", "any milk"], answer: "we haven't got any milk" },
        { chunks: ["She", "hasn't got", "any", "money"], answer: "she hasn't got any money" },
        { chunks: ["You", "haven't got", "time"], answer: "you haven't got time"},
        { chunks: ["The car", "hasn't got", "windows"], answer: "the car hasn't got windows"},

        // Interrogative
        { chunks: ["Have you", "got", "a pencil?"], answer: "have you got a pencil?" },
        { chunks: ["Has she", "got", "a bike?"], answer: "has she got a bike?" },
        { chunks: ["What have", "you", "got", "in your bag?"], answer: "what have you got in your bag?" },
        { chunks: ["Have they", "got", "a new teacher?"], answer: "have they got a new teacher?" },
        { chunks: ["Has he", "got", "the time?"], answer: "has he got the time?"},
        { chunks: ["Have I", "got", "a message?"], answer: "have i got a message?"},
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l12-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    // These prompts are designed to be built with the 3-part structure from data.ts
    const prompts = [
        // Positive
        { prompt: "Menda uy hayvoni bor", answer: "i have got a pet" },
        { prompt: "Uning (qiz bola) ukasi bor", answer: "she has got a brother" },
        { prompt: "Sizda mashina bor", answer: "you have got a car" },
        { prompt: "Uning (o'g'il bola) yangi telefoni bor", answer: "he has got a new phone" },
        
        // Negative
        { prompt: "Menda mashina yo'q", answer: "i haven't got a car" },
        { prompt: "Uning (qiz bola) uy hayvoni yo'q", answer: "she hasn't got a pet" },
        { prompt: "Sizda uka yo'q", answer: "you haven't got a brother" },
        { prompt: "Uning (o'g'il bola) mashinasi yo'q", answer: "he hasn't got a car" },

        // Interrogative
        { prompt: "Sizda savol bormi?", answer: "have you got a question?" },
        { prompt: "Uning (o'g'il bola) ko'k ko'zlari bormi?", answer: "has he got blue eyes?" },
        { prompt: "Sizda uy hayvoni bormi?", answer: "have you got a pet?" },
        { prompt: "Uning (o'g'il bola) mashinasi bormi?", answer: "has he got a car?" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l12-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};