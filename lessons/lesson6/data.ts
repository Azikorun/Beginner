
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Mamlakatlar (Countries)",
        items: [
            { english: "Uzbekistan", uzbek: "O'zbekiston" },
            { english: "the USA", uzbek: "AQSh" },
            { english: "Spain", uzbek: "Ispaniya" },
            { english: "China", uzbek: "Xitoy" },
            { english: "Italy", uzbek: "Italiya" },
            { english: "Japan", uzbek: "Yaponiya" },
            { english: "Germany", uzbek: "Germaniya" },
            { english: "Brazil", uzbek: "Braziliya" },
            { english: "France", uzbek: "Fransiya" },
            { english: "India", uzbek: "Hindiston" },
            { english: "Turkey", uzbek: "Turkiya" },
        ],
    },
    {
        title: "2. Millatlar (Nationalities)",
        items: [
            { english: "Uzbek", uzbek: "o'zbek" },
            { english: "American", uzbek: "amerikalik" },
            { english: "Spanish", uzbek: "ispan" },
            { english: "Chinese", uzbek: "xitoylik" },
            { english: "Italian", uzbek: "italyan" },
            { english: "Japanese", uzbek: "yapon" },
            { english: "German", uzbek: "nemis" },
            { english: "Brazilian", uzbek: "braziliyalik" },
            { english: "French", uzbek: "fransuz" },
            { english: "Indian", uzbek: "hind" },
            { english: "Turkish", uzbek: "turk" },
        ],
    },
    {
        title: "3. Savol Iboralari",
        items: [
            { english: "Where are you from?", uzbek: "Siz qayerdansiz?" },
            { english: "I am from...", uzbek: "Men ...danman" },
            { english: "He is...", uzbek: "U (o'g'il bola)..." },
            { english: "She is not...", uzbek: "U (qiz bola) ... emas" },
            { english: "Are you...?", uzbek: "Siz ...misiz?" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I", "You", "He", "She"] },
    verb: { title: "Fe'l", items: ["am", "are", "is"] },
    preposition: { title: "Predlog", items: ["from", "not from"] },
    country: { title: "Mamlakat", items: ["Uzbekistan", "Spain", "China", "the USA"] },
};


export const ALL_NATIONALITIES: VocabularyItem[] = VOCABULARY_DATA[1].items;
