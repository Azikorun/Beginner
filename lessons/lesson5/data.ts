
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Sinf Xonasi Narsalari (Singular)",
        items: [
            { english: "a book", uzbek: "kitob" },
            { english: "a pen", uzbek: "ruchka" },
            { english: "a pencil", uzbek: "qalam" },
            { english: "a desk", uzbek: "parta" },
            { english: "a chair", uzbek: "stul" },
            { english: "a notebook", uzbek: "daftar" },
            { english: "a teacher", uzbek: "o'qituvchi" },
            { english: "a window", uzbek: "deraza" },
            { english: "a door", uzbek: "eshik" },
            { english: "an eraser", uzbek: "o'chirg'ich" },
        ],
    },
    {
        title: "2. Sinf Xonasi Narsalari (Plural)",
        items: [
            { english: "books", uzbek: "kitoblar" },
            { english: "pens", uzbek: "ruchkalar" },
            { english: "pencils", uzbek: "qalamlar" },
            { english: "desks", uzbek: "partalar" },
            { english: "chairs", uzbek: "stullar" },
            { english: "students", uzbek: "o'quvchilar" },
            { english: "windows", uzbek: "derazalar" },
            { english: "erasers", uzbek: "o'chirg'ichlar" },
        ],
    },
    {
        title: "3. Savol Iboralari",
        items: [
            { english: "What is this?", uzbek: "Bu nima?" },
            { english: "What is that?", uzbek: "Anavi nima?" },
            { english: "What are these?", uzbek: "Bular nima?" },
            { english: "What are those?", uzbek: "Anavilar nima?" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    demonstrative: { title: "Ko'rsatish", items: ["This", "That", "These", "Those"] },
    verb: { title: "Fe'l", items: ["is", "are"] },
    article: { title: "Artikl", items: ["a", "an"] },
    object: { title: "Narsa", items: ["book", "apple", "pens", "chairs"] },
};


export const ALL_OBJECTS: VocabularyItem[] = [
    { english: "This is a pen.", uzbek: "Bu ruchka." },
    { english: "That is a chair.", uzbek: "Anavi stul." },
    { english: "These are books.", uzbek: "Bular kitoblar." },
    { english: "Those are students.", uzbek: "Anavilar o'quvchilar." },
    { english: "That is a teacher.", uzbek: "Anavi o'qituvchi." },
    { english: "This is a notebook.", uzbek: "Bu daftar." },
    { english: "That is a window.", uzbek: "Anavi deraza." },
    { english: "This is an eraser.", uzbek: "Bu o'chirg'ich." },
    { english: "These are pencils.", uzbek: "Bular qalamlar." },
    { english: "Those are desks.", uzbek: "Anavilar partalar." },
    { english: "That is a door.", uzbek: "Anavi eshik." },
];
