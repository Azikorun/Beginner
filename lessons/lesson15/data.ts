import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Oddiy Sifatlar (Adjectives)",
        items: [
            { english: "big", uzbek: "katta" },
            { english: "small", uzbek: "kichik" },
            { english: "fast", uzbek: "tez" },
            { english: "slow", uzbek: "sekin" },
            { english: "tall", uzbek: "baland (bo'y)" },
            { english: "short", uzbek: "past (bo'y)" },
            { english: "old", uzbek: "qari, eski" },
            { english: "young", uzbek: "yosh" },
            { english: "good", uzbek: "yaxshi" },
            { english: "bad", uzbek: "yomon" },
        ],
    },
    {
        title: "2. Qiyosiy Daraja (Comparative)",
        items: [
            { english: "bigger", uzbek: "kattaroq" },
            { english: "smaller", uzbek: "kichikroq" },
            { english: "faster", uzbek: "tezroq" },
            { english: "slower", uzbek: "sekinroq" },
            { english: "taller", uzbek: "balandroq" },
            { english: "older", uzbek: "kattaroq (yosh)" },
            { english: "younger", uzbek: "yoshroq" },
            { english: "better", uzbek: "yaxshiroq" },
            { english: "worse", uzbek: "yomonroq" },
        ],
    },
    {
        title: "3. Orttirma Daraja (Superlative)",
        items: [
            { english: "the biggest", uzbek: "eng katta" },
            { english: "the smallest", uzbek: "eng kichik" },
            { english: "the fastest", uzbek: "eng tez" },
            { english: "the slowest", uzbek: "eng sekin" },
            { english: "the tallest", uzbek: "eng baland" },
            { english: "the oldest", uzbek: "eng qari" },
            { english: "the youngest", uzbek: "eng yosh" },
            { english: "the best", uzbek: "eng yaxshi" },
            { english: "the worst", uzbek: "eng yomon" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim/Nima?", items: ["The car", "My brother", "An elephant", "This book"] },
    verb: { title: "Fe'l", items: ["is"] },
    adjective: { title: "Sifat", items: ["faster", "taller", "the biggest", "better"] },
    comparison: { title: "Solishtirish", items: ["than the bike", "than my sister", "animal", "than that book"] },
};


export const ALL_COMPARISONS: VocabularyItem[] = [
    { english: "An elephant is bigger than a mouse.", uzbek: "Fil sichqondan kattaroq." },
    { english: "A car is faster than a bicycle.", uzbek: "Mashina velosipeddan tezroq." },
    { english: "My grandfather is the oldest.", uzbek: "Mening bobom eng qarisi." },
    { english: "This is the best pizza.", uzbek: "Bu eng yaxshi pitsa." },
    { english: "She is taller than her brother.", uzbek: "U akasidan balandroq." },
    { english: "A turtle is slower than a rabbit.", uzbek: "Toshbaqa quyonndan sekinroq." },
    { english: "This is the worst movie.", uzbek: "Bu eng yomon kino." },
    { english: "I am younger than you.", uzbek: "Men sendan yoshroqman." },
];