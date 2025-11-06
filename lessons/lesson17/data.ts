import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Asosiy Predloglar",
        items: [
            { english: "in", uzbek: "ichida" },
            { english: "on", uzbek: "ustida" },
            { english: "under", uzbek: "ostida, tagida" },
        ],
    },
    {
        title: "2. Narsalar va Joylar",
        items: [
            { english: "the box", uzbek: "quti" },
            { english: "the table", uzbek: "stol" },
            { english: "the chair", uzbek: "stul" },
            { english: "the bed", uzbek: "krovat" },
            { english: "the bag", uzbek: "sumka" },
            { english: "the tree", uzbek: "daraxt" },
        ],
    },
    {
        title: "3. Misol Gaplar",
        items: [
            { english: "The apple is in the box.", uzbek: "Olma qutining ichida." },
            { english: "The book is on the table.", uzbek: "Kitob stolning ustida." },
            { english: "The cat is under the chair.", uzbek: "Mushuk stulning ostida." },
            { english: "The ball is under the bed.", uzbek: "Koptok krovatning ostida." },
            { english: "The money is in the bag.", uzbek: "Pul sumkaning ichida." },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    start: { title: "Nima?", items: ["The ball", "The keys", "The cat", "The book"] },
    verb: { title: "Fe'l", items: ["is", "are"] },
    preposition: { title: "Predlog", items: ["in", "on", "under"] },
    object: { title: "Qayerda?", items: ["the box", "the table", "the chair", "the bed"] },
};


export const ALL_LOCATIONS: VocabularyItem[] = [
    { english: "The cat is on the table.", uzbek: "Mushuk stol ustida." },
    { english: "The apple is in the box.", uzbek: "Olma quti ichida." },
    { english: "The shoes are under the bed.", uzbek: "Oyoq kiyim krovat ostida." },
    { english: "The book is on the chair.", uzbek: "Kitob stul ustida." },
    { english: "The keys are in the bag.", uzbek: "Kalitlar sumka ichida." },
    { english: "The dog is under the tree.", uzbek: "Kuchuk daraxt ostida." },
];