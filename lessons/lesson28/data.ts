
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Sifatlar (Degrees)",
        items: [
            { english: "hot", uzbek: "issiq" },
            { english: "cold", uzbek: "sovuq" },
            { english: "heavy", uzbek: "og'ir" },
            { english: "tall", uzbek: "baland" },
            { english: "rich", uzbek: "boy" },
            { english: "old", uzbek: "qari / yoshda" },
        ],
    },
    {
        title: "2. 'Too' va 'Enough' Iboralari",
        items: [
            { english: "too hot", uzbek: "haddan ortiq issiq" },
            { english: "too expensive", uzbek: "haddan ortiq qimmat" },
            { english: "warm enough", uzbek: "yetarli darajada iliq" },
            { english: "old enough", uzbek: "yetarli darajada katta" },
            { english: "too small", uzbek: "juda kichik" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Nima/Kim?", items: ["The tea", "I am", "This bag", "He is", "The shoes"] },
    verb: { title: "Fe'l", items: ["is", "not", "are"] },
    degree: { title: "Daraja", items: ["too", "enough"] },
    adjective: { title: "Sifat", items: ["hot", "tall", "heavy", "big", "old"] },
};

export const ALL_DEGREE_PHRASES: VocabularyItem[] = [
    { english: "The tea is too hot.", uzbek: "Choy juda issiq (ichib bo'lmaydi)." },
    { english: "I am tall enough.", uzbek: "Mening bo'yim yetarli darajada baland." },
    { english: "The bag is too heavy.", uzbek: "Sumka juda ham og'ir." },
    { english: "He is not old enough.", uzbek: "U yetarli darajada katta emas." },
    { english: "The shoes are too small.", uzbek: "Oyoq kiyimlar juda kichik." },
];
