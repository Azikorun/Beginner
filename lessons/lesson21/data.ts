import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. 'To Be' Fe'li Shakllari",
        items: [
            { english: "I am", uzbek: "Men ...man" },
            { english: "You are", uzbek: "Sen ...san" },
            { english: "He is", uzbek: "U ... (o'g'il)" },
            { english: "She is", uzbek: "U ... (qiz)" },
            { english: "It is", uzbek: "U ... (jism)" },
            { english: "We are", uzbek: "Biz ...miz" },
            { english: "They are", uzbek: "Ular ..." },
        ],
    },
    {
        title: "2. Sifatlar (Adjectives)",
        items: [
            { english: "happy", uzbek: "baxtli" },
            { english: "sad", uzbek: "xafa" },
            { english: "tired", uzbek: "charchagan" },
            { english: "hungry", uzbek: "och" },
            { english: "thirsty", uzbek: "chanqagan" },
            { english: "tall", uzbek: "baland bo'yli" },
        ],
    },
    {
        title: "3. Kasblar va Otlar (Professions & Nouns)",
        items: [
            { english: "a student", uzbek: "o'quvchi" },
            { english: "a teacher", uzbek: "o'qituvchi" },
            { english: "a doctor", uzbek: "shifokor" },
            { english: "friends", uzbek: "do'stlar" },
            { english: "from Uzbekistan", uzbek: "O'zbekistondan" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I", "You", "He", "She", "They"] },
    verb: { title: "Fe'l", items: ["am", "is", "are", "am not", "isn't", "aren't"] },
    complement: { 
        title: "Nima/Qanday?", 
        items: ["happy", "sad", "a doctor", "a student", "students", "friends", "tired", "hungry", "from here"] 
    },
};

export const ALL_BE_FORMS: VocabularyItem[] = [
    { english: "I am", uzbek: "Men" },
    { english: "He is", uzbek: "U (o'g'il)" },
    { english: "She is", uzbek: "U (qiz)" },
    { english: "They are", uzbek: "Ular" },
    { english: "You are", uzbek: "Siz" },
    { english: "We are", uzbek: "Biz" },
];