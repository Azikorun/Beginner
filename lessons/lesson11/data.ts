import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. 'A' Bilan Ishlatiladi (Undosh Tovush)",
        items: [
            { english: "a car", uzbek: "mashina" },
            { english: "a book", uzbek: "kitob" },
            { english: "a house", uzbek: "uy" },
            { english: "a dog", uzbek: "kuchuk" },
            { english: "a student", uzbek: "o'quvchi" },
        ],
    },
    {
        title: "2. 'An' Bilan Ishlatiladi (Unli Tovush)",
        items: [
            { english: "an apple", uzbek: "olma" },
            { english: "an orange", uzbek: "apelsin" },
            { english: "an umbrella", uzbek: "soyabon" },
            { english: "an elephant", uzbek: "fil" },
            { english: "an hour", uzbek: "soat (vaqt)" },
        ],
    },
    {
        title: "3. 'The' Bilan Ishlatiladi (Aniq)",
        items: [
            { english: "the sun", uzbek: "quyosh" },
            { english: "the moon", uzbek: "oy" },
            { english: "the sky", uzbek: "osmon" },
            { english: "the world", uzbek: "dunyo" },
            { english: "the president", uzbek: "prezident" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Ega", items: ["I see", "She wants", "He has"] },
    article: { title: "Artikl", items: ["a", "an", "the"] },
    object: { title: "Narsa", items: ["car", "apple", "sun", "book"] },
};

export const ALL_ITEMS_FOR_MATCHING: VocabularyItem[] = [
    { english: "a car", uzbek: "birorta mashina" },
    { english: "an apple", uzbek: "birorta olma" },
    { english: "the sky", uzbek: "osmon (yagona)" },
    { english: "a house", uzbek: "birorta uy" },
    { english: "an orange", uzbek: "birorta apelsin" },
    { english: "the sun", uzbek: "quyosh (yagona)" },
    { english: "an hour", uzbek: "bir soat" },
    { english: "a student", uzbek: "birorta o'quvchi" },
    { english: "the moon", uzbek: "oy (yagona)" },
];