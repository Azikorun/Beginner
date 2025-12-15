
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Ob-havo (Weather Conditions)",
        items: [
            { english: "sunny", uzbek: "quyoshli" },
            { english: "rainy", uzbek: "yomg'irli" },
            { english: "cloudy", uzbek: "bulutli" },
            { english: "windy", uzbek: "shamolli" },
            { english: "snowy", uzbek: "qorli" },
            { english: "foggy", uzbek: "tumanli" },
            { english: "stormy", uzbek: "bo'ronli" },
        ],
    },
    {
        title: "2. Harorat (Temperature)",
        items: [
            { english: "hot", uzbek: "issiq" },
            { english: "cold", uzbek: "sovuq" },
            { english: "warm", uzbek: "iliq" },
            { english: "cool", uzbek: "salqin" },
            { english: "freezing", uzbek: "muzlaydigan darajada sovuq" },
        ],
    },
    {
        title: "3. Fasllar va Iboralar",
        items: [
            { english: "spring", uzbek: "bahor" },
            { english: "summer", uzbek: "yoz" },
            { english: "autumn / fall", uzbek: "kuz" },
            { english: "winter", uzbek: "qish" },
            { english: "What is the weather like?", uzbek: "Ob-havo qanday?" },
            { english: "It is nice outside.", uzbek: "Tashqarida havo yaxshi." },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Ega", items: ["It", "The weather", "Today"] },
    verb: { title: "Fe'l", items: ["is", "is not"] },
    adjective: { title: "Holat", items: ["sunny", "rainy", "hot", "cold", "windy", "cloudy"] },
    time: { title: "Vaqt/Joy", items: ["today", "now", "outside", "in summer"] },
};

export const ALL_WEATHER_PHRASES: VocabularyItem[] = [
    { english: "It is sunny today.", uzbek: "Bugun havo quyoshli." },
    { english: "It is cold in winter.", uzbek: "Qishda havo sovuq." },
    { english: "It is hot and sunny.", uzbek: "Havo issiq va quyoshli." },
    { english: "The weather is nice.", uzbek: "Ob-havo yaxshi." },
    { english: "It is rainy outside.", uzbek: "Tashqarida yomg'ir yog'yapti (yomg'irli)." },
    { english: "It is windy today.", uzbek: "Bugun shamol (shamolli)." },
];
