
import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_NATIONALITIES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'from Uzbekistan': 'Uzbek',
        'from the USA': 'American',
        'from Spain': 'Spanish',
        'from China': 'Chinese',
        'from Italy': 'Italian',
        'from Japan': 'Japanese',
        'from Germany': 'German',
        'from Brazil': 'Brazilian',
        'from France': 'French',
        'from India': 'Indian',
        'from Turkey': 'Turkish',
        'from England': 'English',
        'from Russia': 'Russian',
        'from Canada': 'Canadian',
        'from Mexico': 'Mexican',
        'from Australia': 'Australian',
        'from Egypt': 'Egyptian',
        'from Argentina': 'Argentinian',
        'from South Korea': 'Korean',
        'from Vietnam': 'Vietnamese',
    };

    const allNationalitiesWithCountries = [
        ...ALL_NATIONALITIES,
        { english: 'English', uzbek: 'ingliz' },
        { english: 'Russian', uzbek: 'rus' },
        { english: 'Canadian', uzbek: 'kanadalik' },
        { english: 'Mexican', uzbek: 'meksikalik' },
        { english: 'Australian', uzbek: 'avstraliyalik' },
        { english: 'Egyptian', uzbek: 'misrlik' },
        { english: 'Argentinian', uzbek: 'argentinalik' },
        { english: 'Korean', uzbek: 'koreys' },
        { english: 'Vietnamese', uzbek: 'vyetnamlik' },
    ];
    
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(allNationalitiesWithCountries.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l6-m-q-${i}`,
            question: `I am ${subject}. I am...`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["Where", "are", "you", "from?"], answer: "where are you from?" },
        { chunks: ["He", "is", "not", "from", "Japan"], answer: "he is not from japan" },
        { chunks: ["She", "is", "Italian"], answer: "she is italian" },
        { chunks: ["I", "am", "from", "Uzbekistan"], answer: "i am from uzbekistan" },
        { chunks: ["Are", "you", "from", "China?"], answer: "are you from china?" },
        { chunks: ["He", "is", "American"], answer: "he is american" },
        { chunks: ["They", "are", "from", "Brazil"], answer: "they are from brazil" },
        { chunks: ["She", "is not", "German"], answer: "she is not german" },
        { chunks: ["Is he", "from", "France?"], answer: "is he from france?" },
        { chunks: ["We", "are", "Turkish"], answer: "we are turkish" },
        { chunks: ["I am not", "from", "India"], answer: "i am not from india" },
        { chunks: ["What nationality", "is she?"], answer: "what nationality is she?" },
        { chunks: ["He is", "from", "a big city"], answer: "he is from a big city" },
        { chunks: ["They are", "not", "Spanish"], answer: "they are not spanish" },
        { chunks: ["Are they", "Japanese?"], answer: "are they japanese?" },
        { chunks: ["My friend", "is", "from Italy"], answer: "my friend is from italy" },
        { chunks: ["I think", "she is", "French"], answer: "i think she is french" },
        { chunks: ["He is", "not", "from here"], answer: "he is not from here" },
        { chunks: ["Are you", "American", "or Canadian?"], answer: "are you american or canadian?" },
        { chunks: ["I am", "an Uzbek", "student"], answer: "i am an uzbek student" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l6-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men O'zbekistondanman", answer: "i am from uzbekistan" },
        { prompt: "U (qiz bola) Ispaniyadan", answer: "she is from spain" },
        { prompt: "Siz Xitoydansiz", answer: "you are from china" },
        { prompt: "U (o'g'il bola) AQShdan emas", answer: "he is not from the usa" },
        { prompt: "U (qiz bola) Xitoydan emas", answer: "she is not from china" },
        { prompt: "Siz Ispaniyadanmisiz?", answer: "are you from spain" },
        { prompt: "Men AQShdanman", answer: "i am from the usa" },
        { prompt: "U (o'g'il bola) Ispaniyadan", answer: "he is from spain" },
        { prompt: "Siz O'zbekistondan emassiz", answer: "you are not from uzbekistan" },
        { prompt: "U (qiz bola) AQShdan", answer: "she is from the usa" },
        { prompt: "Men Ispaniyadan emasman", answer: "i am not from spain" },
        { prompt: "U (o'g'il bola) Xitoydan", answer: "he is from china" },
        { prompt: "Siz O'zbekistondanmisiz?", answer: "are you from uzbekistan" },
        { prompt: "U (qiz bola) Ispaniyadan emas", answer: "she is not from spain" },
        { prompt: "Men Xitoydanman", answer: "i am from china" },
        { prompt: "U (o'g'il bola) O'zbekistondan emas", answer: "he is not from uzbekistan" },
        { prompt: "Siz AQShdan emassiz", answer: "you are not from the usa" },
        { prompt: "U (qiz bola) O'zbekistondan", answer: "she is from uzbekistan" },
        { prompt: "U (o'g'il bola) Ispaniyadan emas", answer: "he is not from spain" },
        { prompt: "Siz Xitoydan emassiz", answer: "you are not from china" },
    ];

    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l6-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};
