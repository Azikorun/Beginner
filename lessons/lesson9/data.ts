import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Kun Tartibi Fe'llari",
        items: [
            { english: "wake up", uzbek: "uyg'onmoq" },
            { english: "get up", uzbek: "turmoq (o'rindan)" },
            { english: "brush teeth", uzbek: "tishlarni yuvmoq" },
            { english: "get dressed", uzbek: "kiyinmoq" },
            { english: "eat breakfast", uzbek: "nonushta qilmoq" },
            { english: "go to school", uzbek: "maktabga bormoq" },
            { english: "do homework", uzbek: "uy ishini qilmoq" },
            { english: "play with friends", uzbek: "do'stlar bilan o'ynamoq" },
        ],
    },
    {
        title: "2. Takrorlanish Ravishlari (Frequency Adverbs)",
        items: [
            { english: "always", uzbek: "har doim (100%)" },
            { english: "usually", uzbek: "odatda (90%)" },
            { english: "often", uzbek: "tez-tez (70%)" },
            { english: "sometimes", uzbek: "ba'zan (50%)" },
            { english: "rarely", uzbek: "kamdan-kam (10%)" },
            { english: "never", uzbek: "hech qachon (0%)" },
        ],
    },
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I", "You", "He", "She"] },
    adverb: { title: "Qanchalik tez-tez?", items: ["always", "usually", "sometimes", "never"] },
    action: { title: "Nima qiladi?", items: ["wake up early", "eat breakfast", "go to school", "play with friends"] },
};

export const ALL_ROUTINES: VocabularyItem[] = [
    { english: "always wakes up at 6 AM", uzbek: "har doim soat 6 da uyg'onadi" },
    { english: "usually eats breakfast", uzbek: "odatda nonushta qiladi" },
    { english: "sometimes plays with friends", uzbek: "ba'zan do'stlari bilan o'ynaydi" },
    { english: "never goes to bed late", uzbek: "hech qachon kech yotmaydi" },
    { english: "often does homework", uzbek: "tez-tez uy vazifasini bajaradi" },
    { english: "rarely watches TV", uzbek: "kamdan-kam televizor ko'radi" },
    { english: "always brushes his teeth", uzbek: "har doim tishlarini yuvadi" },
    { english: "usually goes to school by bus", uzbek: "odatda maktabga avtobusda boradi" },
    { english: "sometimes gets dressed quickly", uzbek: "ba'zan tez kiyinadi" },
    { english: "never eats junk food", uzbek: "hech qachon zararli ovqat yemaydi" },
];