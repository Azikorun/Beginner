import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_SENTENCES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'One cat.': 'There is a cat.',
        'Many trees.': 'There are some trees.',
        'No books.': "There isn't a book.",
        'No cars.': "There aren't any cars.",
        'A question about a park.': 'Is there a park?',
        'A question about students.': 'Are there any students?',
        'One table in the room.': 'There is a table in the room.',
        'Two apples in the bag.': 'There are two apples in the bag.',
        'No school near here.': "There isn't a school near here.",
        'A question about a pen.': 'Is there a pen?',
    };
    const allPairings = shuffleArray(Object.entries(pairings));
    
    // Add more sentence variations for options
    const allOptions = [
        ...ALL_SENTENCES.map(item => item.english),
        "There is a table in the room.",
        "There are two apples in the bag.",
        "There isn't a school near here.",
        "Is there a pen?",
    ];

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allOptions.filter(p => p !== correctAnswer && p.split(' ').length > 2));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l13-m-q-${i}`,
            question: `Situation: ${subject}`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        // Positive
        { chunks: ["There is", "a book", "on the", "table"], answer: "there is a book on the table" },
        { chunks: ["There are", "some", "students", "in the class"], answer: "there are some students in the class" },
        { chunks: ["There is", "a big", "tree", "in the garden"], answer: "there is a big tree in the garden" },
        { chunks: ["There are", "three", "cats", "under the chair"], answer: "there are three cats under the chair" },
        
        // Negative
        { chunks: ["There isn't", "a car", "on the street"], answer: "there isn't a car on the street" },
        { chunks: ["There aren't", "any", "apples", "in the bag"], answer: "there aren't any apples in the bag" },
        { chunks: ["There is not", "a shop", "near here"], answer: "there is not a shop near here" },
        { chunks: ["There are not", "any", "people", "in the park"], answer: "there are not any people in the park" },

        // Interrogative
        { chunks: ["Is there", "a", "question?"], answer: "is there a question?" },
        { chunks: ["Are there", "any", "pencils", "on the desk?"], answer: "are there any pencils on the desk?" },
        { chunks: ["Is there", "a", "supermarket", "nearby?"], answer: "is there a supermarket nearby?" },
        { chunks: ["Are there", "many", "books", "in the library?"], answer: "are there many books in the library?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l13-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        // Positive
        { prompt: "Stolda kitob bor", answer: "there is a book on the table" },
        { prompt: "Bog'da bir nechta mushuk bor", answer: "there are some cats in the park" },
        { prompt: "Bu yerda maktab bor", answer: "there is a school here" },
        { prompt: "Sumkada ikkita olma bor", answer: "there are two apples in the bag" },

        // Negative
        { prompt: "Stolda kitob yo'q", answer: "there isn't a book on the table" },
        { prompt: "Bog'da mushuklar yo'q", answer: "there aren't any cats in the park" },
        { prompt: "Bu yerda maktab yo'q", answer: "there isn't a school here" },
        { prompt: "Sumkada olma yo'q", answer: "there aren't any apples in the bag" },

        // Interrogative
        { prompt: "Stolda kitob bormi?", answer: "is there a book on the table?" },
        { prompt: "Bog'da birorta mushuk bormi?", answer: "are there any cats in the park?" },
        { prompt: "Bu yerda maktab bormi?", answer: "is there a school here?" },
        { prompt: "Sumkada birorta olma bormi?", answer: "are there any apples in the bag?" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l13-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};