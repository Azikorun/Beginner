import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Egalik Fe'llari (Possession)",
        items: [
            { english: "I have got", uzbek: "Menda bor" },
            { english: "You have got", uzbek: "Sizda bor" },
            { english: "He has got", uzbek: "Unda bor (o'g'il)" },
            { english: "She has got", uzbek: "Unda bor (qiz)" },
            { english: "I haven't got", uzbek: "Menda yo'q" },
            { english: "He hasn't got", uzbek: "Unda yo'q" },
        ],
    },
    {
        title: "2. Narsalar va Odamlar",
        items: [
            { english: "a pet", uzbek: "uy hayvoni" },
            { english: "a car", uzbek: "mashina" },
            { english: "a brother", uzbek: "aka/uka" },
            { english: "a sister", uzbek: "opa/singil" },
            { english: "a question", uzbek: "savol" },
            { english: "a new phone", uzbek: "yangi telefon" },
            { english: "blue eyes", uzbek: "ko'k ko'zlar" },
        ],
    },
    {
        title: "3. Savol Iboralari",
        items: [
            { english: "Have you got...?", uzbek: "Sizda ... bormi?" },
            { english: "Has she got...?", uzbek: "Unda ... bormi?" },
            { english: "What have you got?", uzbek: "Sizda nima bor?" },
        ],
    }
];

// Updated SENTENCE_BUILDER_COLUMNS to support questions and negative sentences.
// Each sentence will be constructed from 3 parts.
export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    start: { title: "Boshlanishi", items: ["I", "You", "He", "She", "Have you", "Has he"] },
    middle: { title: "Markazi", items: ["have got", "has got", "haven't got", "hasn't got", "got"] },
    end: { title: "Yakuni", items: ["a pet", "a car", "a brother", "a new phone", "a question?", "blue eyes?"] },
};

export const ALL_POSSESSIONS: VocabularyItem[] = [
    { english: "have got a car", uzbek: "mashinasi bor" },
    { english: "has got a pet", uzbek: "uy hayvoni bor" },
    { english: "have got a sister", uzbek: "opasi/singlisi bor" },
    { english: "has got blue eyes", uzbek: "ko'k ko'zlari bor" },
    { english: "have got a question", uzbek: "savoli bor" },
    { english: "has got a new phone", uzbek: "yangi telefoni bor" },
    { english: "haven't got a brother", uzbek: "akasi/ukasi yo'q" },
    { english: "hasn't got a car", uzbek: "mashinasi yo'q" },
];