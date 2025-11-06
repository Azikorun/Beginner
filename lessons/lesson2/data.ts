
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Kun Tartibi",
        items: [
            { english: "get up", uzbek: "uyg'onmoq" },
            { english: "have breakfast", uzbek: "nonushta qilmoq" },
            { english: "go to work", uzbek: "ishga bormoq" },
            { english: "have lunch", uzbek: "tushlik qilmoq" },
            { english: "finish work", uzbek: "ishni tugatmoq" },
            { english: "go home", uzbek: "uyga bormoq" },
            { english: "have dinner", uzbek: "kechki ovqatni yemoq" },
            { english: "go to bed", uzbek: "uxlashga yotmoq" },
        ],
    },
    {
        title: "2. Vaqtni Aytish",
        items: [
            { english: "What time is it?", uzbek: "Soat nechi?" },
            { english: "It's 7 o'clock.", uzbek: "Soat 7." },
            { english: "at 7 AM", uzbek: "ertalab soat 7 da" },
            { english: "at 1 PM", uzbek: "kunduzi soat 1 da" },
            { english: "at 6 PM", uzbek: "kechqurun soat 6 da" },
            { english: "in the morning", uzbek: "ertalab" },
            { english: "in the afternoon", uzbek: "kunduzi" },
            { english: "in the evening", uzbek: "kechqurun" },
        ],
    },
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["He", "She"] },
    action: { title: "Nima qiladi?", items: ["gets up", "goes to work", "has breakfast", "finishes work"] },
    time: { title: "Qachon?", items: ["at 7 AM", "in the morning", "at 6 PM", "in the evening"] },
};

export const ALL_TIMES: VocabularyItem[] = [
    { english: "at 7 AM", uzbek: "ertalab 7da" },
    { english: "at 7:30 AM", uzbek: "ertalab 7:30da" },
    { english: "at 8 AM", uzbek: "ertalab 8da" },
    { english: "at 9 AM", uzbek: "ertalab 9da" },
    { english: "at 12 PM", uzbek: "peshinda" },
    { english: "at 1 PM", uzbek: "kunduzi 1da" },
    { english: "at 3 PM", uzbek: "kunduzi 3da" },
    { english: "at 5 PM", uzbek: "kunduzi 5da" },
    { english: "at 6 PM", uzbek: "kechqurun 6da" },
    { english: "at 8 PM", uzbek: "kechqurun 8da" },
    { english: "at 10 PM", uzbek: "kechqurun 10da" },
    { english: "at 11 PM", uzbek: "kechqurun 11da" },
    { english: "at midnight", uzbek: "yarim tunda" },
];
