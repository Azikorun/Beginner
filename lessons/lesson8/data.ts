import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Raqamlar 1-20 (Numbers 1-20)",
        items: [
            { english: "one", uzbek: "bir" },
            { english: "two", uzbek: "ikki" },
            { english: "three", uzbek: "uch" },
            { english: "four", uzbek: "to'rt" },
            { english: "five", uzbek: "besh" },
            { english: "six", uzbek: "olti" },
            { english: "seven", uzbek: "yetti" },
            { english: "eight", uzbek: "sakkiz" },
            { english: "nine", uzbek: "to'qqiz" },
            { english: "ten", uzbek: "o'n" },
            { english: "eleven", uzbek: "o'n bir" },
            { english: "twelve", uzbek: "o'n ikki" },
            { english: "thirteen", uzbek: "o'n uch" },
            { english: "twenty", uzbek: "yigirma" },
        ],
    },
    {
        title: "2. Raqamlar 20-100 (O'nliklar)",
        items: [
            { english: "thirty", uzbek: "o'ttiz" },
            { english: "forty", uzbek: "qirq" },
            { english: "fifty", uzbek: "ellik" },
            { english: "sixty", uzbek: "oltmish" },
            { english: "seventy", uzbek: "yetmish" },
            { english: "eighty", uzbek: "sakson" },
            { english: "ninety", uzbek: "to'qson" },
            { english: "one hundred", uzbek: "yuz" },
        ],
    },
    {
        title: "3. Vaqt Iboralari (Time Phrases)",
        items: [
            { english: "What time is it?", uzbek: "Soat necha?" },
            { english: "It is... o'clock", uzbek: "Soat..." },
            { english: "half past...", uzbek: "...dan yarim soat o'tdi" },
            { english: "a quarter past...", uzbek: "...dan chorak o'tdi" },
            { english: "a quarter to...", uzbek: "...ga chorak qoldi" },
            { english: "midday / noon", uzbek: "peshin" },
            { english: "midnight", uzbek: "yarim tun" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    start: { title: "Boshlanishi", items: ["It is"] },
    time: { title: "Vaqt", items: ["seven", "ten", "half past", "quarter past"] },
    number: { title: "Son/So'z", items: ["o'clock", "two", "five", "nine"] },
};

export const ALL_TIMES: VocabularyItem[] = [
    { english: "It's one o'clock", uzbek: "1:00" },
    { english: "It's two o'clock", uzbek: "2:00" },
    { english: "It's three o'clock", uzbek: "3:00" },
    { english: "It's four o'clock", uzbek: "4:00" },
    { english: "It's five o'clock", uzbek: "5:00" },
    { english: "It's six o'clock", uzbek: "6:00" },
    { english: "It's seven o'clock", uzbek: "7:00" },
    { english: "It's eight o'clock", uzbek: "8:00" },
    { english: "It's nine o'clock", uzbek: "9:00" },
    { english: "It's ten o'clock", uzbek: "10:00" },
    { english: "It's eleven o'clock", uzbek: "11:00" },
    { english: "It's twelve o'clock", uzbek: "12:00" },
    { english: "It's half past one", uzbek: "1:30" },
    { english: "It's half past four", uzbek: "4:30" },
    { english: "It's half past nine", uzbek: "9:30" },
    { english: "It's a quarter past two", uzbek: "2:15" },
    { english: "It's a quarter past six", uzbek: "6:15" },
    { english: "It's a quarter to three", uzbek: "2:45" },
    { english: "It's a quarter to eight", uzbek: "7:45" },
];