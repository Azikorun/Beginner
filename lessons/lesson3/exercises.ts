
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_FOOD_ITEMS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'I am hungry.': 'a pizza',
        'I am thirsty.': 'water',
        'I want to order.': 'the menu, please',
        'I want to pay.': 'the bill, please',
        'Good morning!': 'a coffee',
        'A healthy option.': 'a salad',
        'I want something sweet.': 'a cake',
        'For breakfast...': 'milk',
        'A quick lunch.': 'a sandwich',
        'With a burger...': 'fries',
        'A cold drink.': 'a soda',
        'A hot drink.': 'tea',
        'A fruit.': 'an apple',
        'When you arrive...': 'a table for two',
        'When the waiter comes...': 'Ready to order?',
        'When the food arrives...': 'Enjoy your meal!',
        'I want to start with...': 'soup',
        'A healthy drink.': 'juice',
        'Another fruit.': 'an orange',
        'A classic fast food meal.': 'a burger',
    };
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([action, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_FOOD_ITEMS.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l3-m-q-${i}`,
            question: `${action}`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["I would like", "a pizza", "please"], answer: "i would like a pizza please" },
        { chunks: ["Can I have", "the bill,", "please?"], answer: "can i have the bill, please?" },
        { chunks: ["I want", "some water"], answer: "i want some water" },
        { chunks: ["A table", "for two,", "please"], answer: "a table for two, please" },
        { chunks: ["Can I see", "the menu?"], answer: "can i see the menu?" },
        { chunks: ["I would like", "an apple", "and some tea"], answer: "i would like an apple and some tea" },
        { chunks: ["He would like", "a burger", "and fries"], answer: "he would like a burger and fries" },
        { chunks: ["She wants", "a salad"], answer: "she wants a salad" },
        { chunks: ["Can we have", "two coffees,", "please?"], answer: "can we have two coffees, please?" },
        { chunks: ["This soup", "is", "delicious"], answer: "this soup is delicious" },
        { chunks: ["I don't want", "any juice"], answer: "i don't want any juice" },
        { chunks: ["Are you ready", "to order?"], answer: "are you ready to order?" },
        { chunks: ["The cake", "looks", "good"], answer: "the cake looks good" },
        { chunks: ["Can I have", "some milk", "in my tea?"], answer: "can i have some milk in my tea?" },
        { chunks: ["A sandwich", "to go,", "please"], answer: "a sandwich to go, please" },
        { chunks: ["I would like", "a glass of", "water"], answer: "i would like a glass of water" },
        { chunks: ["The bill,", "please"], answer: "the bill, please" },
        { chunks: ["She will have", "the soup"], answer: "she will have the soup" },
        { chunks: ["He wants", "an orange"], answer: "he wants an orange" },
        { chunks: ["Enjoy", "your", "meal!"], answer: "enjoy your meal!" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l3-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men pitsa xohlayman, iltimos", answer: "i would like a pizza please" },
        { prompt: "Men hisobni xohlayman, iltimos", answer: "i want the bill please" },
        { prompt: "Men kofe xohlayman", answer: "i would like a coffee" },
        { prompt: "Men biroz suv xohlayman", answer: "i want some water" },
        { prompt: "Men hisobni xohlayman", answer: "i want the bill" },
        { prompt: "Iltimos, kofe xohlayman", answer: "i would like a coffee please" },
        { prompt: "Men pitsa xohlayman", answer: "i want a pizza" },
        { prompt: "Iltimos, biroz suv xohlayman", answer: "i would like some water please" },
        { prompt: "Men hisobni xohlayman, iltimos", answer: "i would like the bill please" },
        { prompt: "Iltimos, pitsa xohlayman", answer: "i want a pizza please" },
        { prompt: "Men kofe istayman, iltimos", answer: "i want a coffee please" },
        { prompt: "Biroz suv, iltimos", answer: "i want some water please" },
        { prompt: "Men pitsa istayman", answer: "i would like a pizza" },
        { prompt: "Iltimos, hisobni", answer: "i want the bill please" },
        { prompt: "Men kofe xohlayman", answer: "i want a coffee" },
        { prompt: "Biroz suv xohlayman", answer: "i would like some water" },
        { prompt: "Men hisobni istayman", answer: "i would like the bill" },
        { prompt: "Pitsa, iltimos", answer: "i want a pizza please" },
        { prompt: "Kofe, iltimos", answer: "i would like a coffee please" },
        { prompt: "Iltimos, suv", answer: "i want some water please" },
    ];
    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l3-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
