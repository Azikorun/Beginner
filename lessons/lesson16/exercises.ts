import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_NOUNS_FOR_MATCHING } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const allNouns = shuffleArray(ALL_NOUNS_FOR_MATCHING);
    const options = ["Countable", "Uncountable"];

    return allNouns.slice(0, count).map((noun, i) => {
        return {
            id: `l16-m-q-${i}`,
            question: `What type of noun is '${noun.english}'?`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer: noun.uzbek
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        // Countable
        { chunks: ["I", "have", "a", "new book"], answer: "i have a new book" },
        { chunks: ["She", "has", "many", "friends"], answer: "she has many friends" },
        { chunks: ["Do you want", "an", "apple?"], answer: "do you want an apple?" },
        { chunks: ["There are", "three cars", "outside"], answer: "there are three cars outside" },

        // Uncountable
        { chunks: ["I need", "some", "water", "please"], answer: "i need some water please" },
        { chunks: ["There is", "some milk", "in the fridge"], answer: "there is some milk in the fridge" },
        { chunks: ["He doesn't have", "much", "money"], answer: "he doesn't have much money" },
        { chunks: ["Do you have", "any", "information?"], answer: "do you have any information?" },

        // Mixed with 'any'
        { chunks: ["I don't have", "any", "pencils"], answer: "i don't have any pencils" },
        { chunks: ["There isn't", "any", "sugar", "in my coffee"], answer: "there isn't any sugar in my coffee" },
        { chunks: ["Are there", "any", "students", "here?"], answer: "are there any students here?" },
        { chunks: ["Is there", "any", "rice", "left?"], answer: "is there any rice left?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l16-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        // Positive
        { prompt: "Menda kitob bor", answer: "i have a book" },
        { prompt: "Menda biroz suv bor", answer: "i have some water" },
        { prompt: "Stolda biroz sut bor", answer: "there is some milk" },
        { prompt: "Mening bir nechta do'stlarim bor", answer: "i have some friends" },

        // Negative
        { prompt: "Menda pul yo'q", answer: "i don't have any money" },
        { prompt: "Sut yo'q", answer: "there isn't any milk" },
        { prompt: "Menda kitoblar yo'q", answer: "i don't have any books" },
        { prompt: "Sizda do'stlar yo'q", answer: "you don't have any friends" },

        // Interrogative
        { prompt: "Sizda birorta kitob bormi?", answer: "do you have a book?" },
        { prompt: "Birorta suv bormi?", answer: "is there any water?" },
        { prompt: "Sizda birorta do'st bormi?", answer: "do you have any friends?" },
        { prompt: "Birorta sut bormi?", answer: "is there any milk?" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l16-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};