
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Sifatlar (Emphasis Adjectives)",
        items: [
            { english: "expensive", uzbek: "qimmat" },
            { english: "beautiful", uzbek: "chiroyli" },
            { english: "boring", uzbek: "zerikarli" },
            { english: "kind", uzbek: "mehribon" },
            { english: "tasty", uzbek: "mazali" },
            { english: "smart", uzbek: "aqlli" },
        ],
    },
    {
        title: "2. 'So' va 'Such' Iboralari",
        items: [
            { english: "so hot", uzbek: "shunchalik issiq" },
            { english: "so fast", uzbek: "shunchalik tez" },
            { english: "such a nice day", uzbek: "shunday ajoyib kun" },
            { english: "such a big house", uzbek: "shunday katta uy" },
            { english: "such good friends", uzbek: "shunday yaxshi do'stlar" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim/Nima?", items: ["She", "It", "They", "He", "The movie"] },
    emphasis: { title: "Urgu", items: ["is so", "is such a", "are so", "are such"] },
    complement: { title: "Tavsif", items: ["kind", "nice day", "beautiful", "good people", "boring"] },
};

export const ALL_EMPHASIS_PHRASES: VocabularyItem[] = [
    { english: "She is so kind.", uzbek: "U shunchalik mehribon." },
    { english: "It is such a cold day.", uzbek: "Shunday sovuq kun." },
    { english: "You are so smart.", uzbek: "Siz shunchalik aqllisiz." },
    { english: "He is such a funny boy.", uzbek: "U shunday qiziqarli bola." },
    { english: "The car is so expensive.", uzbek: "Mashina shunchalik qimmat." },
];
