import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Sanaladigan Otlar (Countable)",
        items: [
            { english: "an apple / apples", uzbek: "olma / olmalar" },
            { english: "a book / books", uzbek: "kitob / kitoblar" },
            { english: "a chair / chairs", uzbek: "stul / stullar" },
            { english: "a friend / friends", uzbek: "do'st / do'stlar" },
            { english: "a car / cars", uzbek: "mashina / mashinalar" },
        ],
    },
    {
        title: "2. Sanalmaydigan Otlar (Uncountable)",
        items: [
            { english: "water", uzbek: "suv" },
            { english: "milk", uzbek: "sut" },
            { english: "rice", uzbek: "guruch" },
            { english: "sugar", uzbek: "shakar" },
            { english: "money", uzbek: "pul" },
            { english: "information", uzbek: "ma'lumot" },
            { english: "music", uzbek: "musiqa" },
        ],
    },
    {
        title: "3. Miqdor So'zlari (Quantifiers)",
        items: [
            { english: "a / an", uzbek: "bir (faqat sanaladigan)" },
            { english: "some", uzbek: "bir nechta, biroz (darak)" },
            { english: "any", uzbek: "birorta, hech qanday (so'roq, inkor)" },
            { english: "many", uzbek: "ko'p (sanaladigan)" },
            { english: "much", uzbek: "ko'p (sanalmaydigan)" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    structure: { title: "Tuzilma", items: ["I have", "I don't have", "Do you have", "There is", "There isn't", "Is there"] },
    quantifier: { title: "Miqdor", items: ["a", "some", "any"] },
    object: { title: "Narsa", items: ["book", "books", "water", "money", "friends", "milk"] },
};

export const ALL_NOUNS_FOR_MATCHING: VocabularyItem[] = [
    { english: "apple", uzbek: "Countable" },
    { english: "water", uzbek: "Uncountable" },
    { english: "book", uzbek: "Countable" },
    { english: "rice", uzbek: "Uncountable" },
    { english: "car", uzbek: "Countable" },
    { english: "money", uzbek: "Uncountable" },
    { english: "friend", uzbek: "Countable" },
    { english: "milk", uzbek: "Uncountable" },
    { english: "chair", uzbek: "Countable" },
    { english: "sugar", uzbek: "Uncountable" },
    { english: "student", uzbek: "Countable" },
    { english: "information", uzbek: "Uncountable" },
];