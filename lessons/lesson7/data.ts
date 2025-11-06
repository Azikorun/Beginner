import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Shaxsiy Buyumlar (Personal Items)",
        items: [
            { english: "a book", uzbek: "kitob" },
            { english: "a pen", uzbek: "ruchka" },
            { english: "a bag", uzbek: "sumka" },
            { english: "a phone", uzbek: "telefon" },
            { english: "keys", uzbek: "kalitlar" },
            { english: "a car", uzbek: "mashina" },
        ],
    },
    {
        title: "2. Egalik Sifatlari (Possessive Adjectives)",
        items: [
            { english: "my", uzbek: "mening" },
            { english: "your", uzbek: "sizning" },
            { english: "his", uzbek: "uning (o'g'il bola)" },
            { english: "her", uzbek: "uning (qiz bola)" },
        ],
    },
    {
        title: "3. Misol Iboralar",
        items: [
            { english: "This is my book.", uzbek: "Bu mening kitobim." },
            { english: "Where is your phone?", uzbek: "Telefoningiz qayerda?" },
            { english: "His car is red.", uzbek: "Uning mashinasi qizil." },
            { english: "I like her bag.", uzbek: "Menga uning sumkasi yoqdi." },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    pronoun: { title: "Egalik", items: ["My", "Your", "His", "Her"] },
    object: { title: "Narsa", items: ["book", "pen", "bag", "phone"] },
    verb: { title: "Fe'l", items: ["is"] },
    color: { title: "Rang/Holat", items: ["new", "old", "blue", "here"] },
};

export const ALL_ITEMS: VocabularyItem[] = VOCABULARY_DATA[0].items;