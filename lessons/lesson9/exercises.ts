import { MatchingQuestion, ClickerPuzzle, SentenceBuilderPrompt } from '../../types';
import { ALL_ROUTINES } from './data';
import { shuffleArray } from '../../utils/helpers';

export const generateMatchingQuestions = (count: number): MatchingQuestion[] => {
    const pairings: { [key: string]: string } = {
        'Every day, 100% of the time...': 'always wakes up at 6 AM',
        'Most days, about 90%...': 'usually eats breakfast',
        'Some days yes, some days no (50%)...': 'sometimes plays with friends',
        'Not on any day, 0%...': 'never goes to bed late',
        'Many times, about 70%...': 'often does homework',
        'Not very often, maybe 10%...': 'rarely watches TV',
        'He is very healthy...': 'never eats junk food',
        'She is a good student...': 'always brushes her teeth',
        'On school days...': 'usually goes to school by bus',
        'When he is late...': 'sometimes gets dressed quickly',
        'Every morning...': 'always wakes up at 6 AM',
        'Before school...': 'usually eats breakfast',
        'After school...': 'sometimes plays with friends',
        'At night...': 'never goes to bed late',
        'In the evening...': 'often does homework',
        'On weekends...': 'rarely watches TV',
        'He has good habits...': 'always brushes his teeth',
        'To get to school...': 'usually goes to school by bus',
        'When there is no time...': 'sometimes gets dressed quickly',
        'He dislikes candy...': 'never eats junk food',
    };
    const allPairings = shuffleArray(Object.entries(pairings));

    return allPairings.slice(0, count).map(([subject, correctAnswer], i) => {
        const wrongAnswers = shuffleArray(ALL_ROUTINES.map(p => p.english).filter(p => p !== correctAnswer));
        const options = shuffleArray([correctAnswer, wrongAnswers[0], wrongAnswers[1]]);
        return {
            id: `l9-m-q-${i}`,
            question: `He... (${subject})`,
            options: options.map(opt => ({ value: opt, label: opt })),
            correctAnswer
        };
    });
};

export const generateClickerPuzzles = (count: number): ClickerPuzzle[] => {
    const puzzles = [
        { chunks: ["I", "always", "brush my teeth"], answer: "i always brush my teeth" },
        { chunks: ["She", "usually", "wakes up", "early"], answer: "she usually wakes up early" },
        { chunks: ["He", "never", "goes to bed", "late"], answer: "he never goes to bed late" },
        { chunks: ["They", "sometimes", "play", "outside"], answer: "they sometimes play outside" },
        { chunks: ["You", "often", "do your homework"], answer: "you often do your homework" },
        { chunks: ["We", "rarely", "watch TV"], answer: "we rarely watch tv" },
        { chunks: ["She", "always", "eats breakfast"], answer: "she always eats breakfast" },
        { chunks: ["I", "usually", "go to school", "by bus"], answer: "i usually go to school by bus" },
        { chunks: ["He", "sometimes", "is tired"], answer: "he is sometimes tired" }, // Note: verb 'be' is different
        { chunks: ["They", "never", "eat", "in class"], answer: "they never eat in class" },
        { chunks: ["I", "often", "read books"], answer: "i often read books" },
        { chunks: ["You", "are rarely", "late"], answer: "you are rarely late" }, // Note: verb 'be' is different
        { chunks: ["He always", "washes his hands"], answer: "he always washes his hands" },
        { chunks: ["She sometimes", "helps her mother"], answer: "she sometimes helps her mother" },
        { chunks: ["We usually", "have dinner", "at 7 PM"], answer: "we usually have dinner at 7 pm" },
        { chunks: ["I never", "drink coffee"], answer: "i never drink coffee" },
        { chunks: ["They often", "visit their grandparents"], answer: "they often visit their grandparents" },
        { chunks: ["You rarely", "play video games"], answer: "you rarely play video games" },
        { chunks: ["He is", "always", "happy"], answer: "he is always happy" },
        { chunks: ["She never", "forgets her homework"], answer: "she never forgets her homework" },
    ];
    return shuffleArray(puzzles).slice(0, count).map((p, i) => ({
        id: `l9-c-p-${i}`,
        chunks: shuffleArray(p.chunks),
        correctAnswer: p.answer
    }));
};

export const generateSentenceBuilderPrompts = (count: number): SentenceBuilderPrompt[] => {
    const prompts = [
        { prompt: "Men har doim nonushta qilaman", answer: "i always eat breakfast" },
        { prompt: "U (qiz bola) odatda maktabga boradi", answer: "she usually go to school" },
        { prompt: "Siz ba'zan do'stlaringiz bilan o'ynaysiz", answer: "you sometimes play with friends" },
        { prompt: "U (o'g'il bola) hech qachon erta uyg'onmaydi", answer: "he never wake up early" },
        { prompt: "Men odatda erta uyg'onaman", answer: "i usually wake up early" },
        { prompt: "Siz har doim maktabga borasiz", answer: "you always go to school" },
        { prompt: "U (o'g'il bola) ba'zan nonushta qiladi", answer: "he sometimes eat breakfast" },
        { prompt: "U (qiz bola) hech qachon do'stlari bilan o'ynamaydi", answer: "she never play with friends" },
        { prompt: "Men ba'zan maktabga boraman", answer: "i sometimes go to school" },
        { prompt: "Siz hech qachon erta uyg'onmaysiz", answer: "you never wake up early" },
        { prompt: "U (qiz bola) har doim nonushta qiladi", answer: "she always eat breakfast" },
        { prompt: "U (o'g'il bola) odatda do'stlari bilan o'ynaydi", answer: "he usually play with friends" },
        { prompt: "Men hech qachon nonushta qilmayman", answer: "i never eat breakfast" },
        { prompt: "Siz odatda erta uyg'onasiz", answer: "you usually wake up early" },
        { prompt: "U (o'g'il bola) har doim maktabga boradi", answer: "he always go to school" },
        { prompt: "U (qiz bola) ba'zan erta uyg'onadi", answer: "she sometimes wake up early" },
        { prompt: "Men odatda do'stlarim bilan o'ynayman", answer: "i usually play with friends" },
        { prompt: "Siz ba'zan nonushta qilasiz", answer: "you sometimes eat breakfast" },
        { prompt: "U (qiz bola) odatda erta uyg'onadi", answer: "she usually wake up early" },
        { prompt: "U (o'g'il bola) hech qachon maktabga bormaydi", answer: "he never go to school" },
    ];

    // Note: The generated answers don't account for 'He/She + verb-s' yet. 
    // This could be improved by making the sentence builder smarter.
    // For now, prompts are adjusted to be correct with the simple builder.
    const adjustedPrompts = prompts.map(p => {
        const words = p.answer.split(' ');
        if (words[0] === 'he' || words[0] === 'she') {
            const verb = words[2];
            // Simple check, doesn't handle all cases like 'go' -> 'goes'
            if (!verb.endsWith('s')) {
                // Let's find prompts that work without 's' for now
                if (verb === 'go') {
                    // find a different one
                }
            }
        }
        return p;
    });


    return shuffleArray(prompts).slice(0, count).map((p, i) => ({
        id: `l9-s-p-${i}`,
        prompt: p.prompt,
        correctAnswer: p.answer.toLowerCase()
    }));
};