import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_BE_FORMS } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key:string]: string } = {
        'I...': 'am a student.',
        'He...': 'is a doctor.',
        'She...': 'is happy.',
        'They...': 'are friends.',
        'You...': 'are tall.',
        'We...': 'are from Uzbekistan.',
        'The cat...': 'is hungry.',
        'The books...': 'are on the table.',
        'My friend and I...': 'are tired.',
        'This car...': 'is new.',
    };
    
    const allPairings = shuffleArray(Object.entries(pairings));
    const allAnswers = Object.values(pairings);

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allAnswers.filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l21-m-q-${i}`,
            question: subject,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["She", "is", "a teacher"], answer: "she is a teacher" },
        { chunks: ["I", "am", "not", "tired"], answer: "i am not tired" },
        { chunks: ["Are", "you", "hungry?"], answer: "are you hungry?" },
        { chunks: ["He", "is", "from", "Tashkent"], answer: "he is from tashkent" },
        { chunks: ["They", "are", "very happy"], answer: "they are very happy" },
        { chunks: ["We", "are not", "doctors"], answer: "we are not doctors" },
        { chunks: ["Is", "she", "a student?"], answer: "is she a student?" },
        { chunks: ["My name", "is", "Alex"], answer: "my name is alex" },
        { chunks: ["I", "am", "thirsty"], answer: "i am thirsty" },
        { chunks: ["It", "is", "cold", "today"], answer: "it is cold today" },
        { chunks: ["They", "are not", "sad"], answer: "they are not sad" },
        { chunks: ["Are", "we", "late?"], answer: "are we late?" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l21-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men baxtliman", answer: "i am happy" },
        { prompt: "U (qiz bola) shifokor", answer: "she is a doctor" },
        { prompt: "Ular o'quvchilar", answer: "they are students" },
        { prompt: "Siz charchagansiz", answer: "you are tired" },
        { prompt: "U (o'g'il bola) bu yerda emas", answer: "he isn't from here" },
        { prompt: "Men charchamaganman", answer: "i am not tired" },
        { prompt: "Ular baxtli emas", answer: "they aren't happy" },
        { prompt: "Siz shifokormisiz?", answer: "are you a doctor" }, // builder doesn't support question marks well, so this is fine.
        { prompt: "Men talabaman", answer: "i am a student" },
        { prompt: "U (qiz bola) xafa", answer: "she is sad" },
        { prompt: "Ular do'stlar", answer: "they are friends" },
        { prompt: "Siz ochmisiz?", answer: "are you hungry" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l21-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};