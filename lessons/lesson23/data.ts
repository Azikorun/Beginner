
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Transport Turlari (Modes of Transport)",
        items: [
            { english: "a car", uzbek: "mashina" },
            { english: "a bus", uzbek: "avtobus" },
            { english: "a train", uzbek: "poezd" },
            { english: "a plane", uzbek: "samolyot" },
            { english: "a taxi", uzbek: "taksi" },
            { english: "a bicycle / bike", uzbek: "velosiped" },
            { english: "a boat", uzbek: "qayiq" },
            { english: "the subway / metro", uzbek: "metro" },
        ],
    },
    {
        title: "2. Harakat va Predloglar",
        items: [
            { english: "by car", uzbek: "mashinada" },
            { english: "by bus", uzbek: "avtobusda" },
            { english: "by train", uzbek: "poezdda" },
            { english: "by plane", uzbek: "samolyotda" },
            { english: "on foot", uzbek: "piyoda" },
            { english: "drive", uzbek: "haydamoq (mashina)" },
            { english: "ride", uzbek: "minmoq (velosiped/ot)" },
            { english: "fly", uzbek: "uchmoq" },
        ],
    },
    {
        title: "3. Joylar (Places)",
        items: [
            { english: "airport", uzbek: "aeroport" },
            { english: "train station", uzbek: "poezd stansiyasi" },
            { english: "bus stop", uzbek: "avtobus bekati" },
            { english: "school", uzbek: "maktab" },
            { english: "work", uzbek: "ish" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I", "You", "He", "She", "We", "They"] },
    verb: { title: "Fe'l", items: ["go", "goes", "travel", "travels"] },
    destination: { title: "Qayerga?", items: ["to work", "to school", "to London", "to Tashkent"] },
    transport: { title: "Nima bilan?", items: ["by car", "by bus", "by train", "by plane", "on foot"] },
};

export const ALL_TRANSPORT_PHRASES: VocabularyItem[] = [
    { english: "I go to work by car", uzbek: "Men ishga mashinada boraman" },
    { english: "She goes to school on foot", uzbek: "U maktabga piyoda boradi" },
    { english: "We travel by plane", uzbek: "Biz samolyotda sayohat qilamiz" },
    { english: "He goes by bus", uzbek: "U avtobusda boradi" },
    { english: "They go by train", uzbek: "Ular poezdda boradilar" },
    { english: "You ride a bike", uzbek: "Siz velosiped minasiz" },
];
