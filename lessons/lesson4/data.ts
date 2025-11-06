
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Qobiliyat Fe'llari (Ability Verbs)",
        items: [
            { english: "swim", uzbek: "suzmoq" },
            { english: "run", uzbek: "yugurmoq" },
            { english: "sing", uzbek: "qo'shiq aytmoq" },
            { english: "draw", uzbek: "rasm chizmoq" },
            { english: "fly", uzbek: "uchmoq" },
            { english: "speak English", uzbek: "inglizcha gapirmoq" },
            { english: "cook", uzbek: "ovqat pishirmoq" },
            { english: "dance", uzbek: "raqsga tushmoq" },
            { english: "ride a bike", uzbek: "velosiped haydamoq" },
            { english: "play the guitar", uzbek: "gitara chalmoq" },
            { english: "climb", uzbek: "tirmashib chiqmoq" },
            { english: "jump", uzbek: "sakramoq" },
        ],
    },
    {
        title: "2. 'Can' Bilan Iboralar",
        items: [
            { english: "I can...", uzbek: "Men ... qila olaman" },
            { english: "I can't...", uzbek: "Men ... qila olmayman" },
            { english: "You can...", uzbek: "Siz ... qila olasiz" },
            { english: "Can you...?", uzbek: "Siz ... qila olasizmi?" },
            { english: "A bird can fly.", uzbek: "Qush ucha oladi." },
            { english: "A fish can swim.", uzbek: "Baliq suza oladi." },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim/Nima?", items: ["I", "You", "A bird", "A fish"] },
    modal: { title: "Qila oladimi?", items: ["can", "can't"] },
    action: { title: "Nima?", items: ["swim", "fly", "sing", "run fast"] },
};


export const ALL_ABILITIES: VocabularyItem[] = [
    { english: "can swim", uzbek: "suza oladi" },
    { english: "can't fly", uzbek: "ucha olmaydi" },
    { english: "can sing", uzbek: "qo'shiq ayta oladi" },
    { english: "can run", uzbek: "yugura oladi" },
    { english: "can fly", uzbek: "ucha oladi" },
    { english: "can cook", uzbek: "pishira oladi" },
    { english: "can dance", uzbek: "raqsga tusha oladi" },
    { english: "can't sing", uzbek: "qo'shiq ayta olmaydi" },
    { english: "can ride a bike", uzbek: "velosiped hayday oladi" },
    { english: "can't speak English", uzbek: "Inglizcha gapira olmaydi" },
    { english: "can draw", uzbek: "rasm chiza oladi" },
    { english: "can't climb", uzbek: "tirmashib chiqa olmaydi" },
];
