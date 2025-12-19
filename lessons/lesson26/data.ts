
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Muammolar (Problems)",
        items: [
            { english: "pollution", uzbek: "ifloslanish" },
            { english: "climate change", uzbek: "iqlim o'zgarishi" },
            { english: "plastic waste", uzbek: "plastik chiqindilar" },
            { english: "global warming", uzbek: "global isish" },
            { english: "dirty air", uzbek: "iflos havo" },
            { english: "cutting trees", uzbek: "daraxtlarni kesish" },
        ],
    },
    {
        title: "2. Harakatlar (Actions)",
        items: [
            { english: "recycle", uzbek: "qayta ishlamoq" },
            { english: "protect", uzbek: "himoya qilmoq" },
            { english: "save water", uzbek: "suvni tejamoq" },
            { english: "plant trees", uzbek: "daraxt ekmoq" },
            { english: "clean up", uzbek: "tozalamoq" },
            { english: "stop pollution", uzbek: "ifloslanishni to'xtatmoq" },
        ],
    },
    {
        title: "3. Muhim So'zlar (Key Words)",
        items: [
            { english: "the planet", uzbek: "sayyora" },
            { english: "the environment", uzbek: "atrof-muhit" },
            { english: "nature", uzbek: "tabiat" },
            { english: "earth", uzbek: "er (sayyora)" },
            { english: "future", uzbek: "kelajak" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["We", "People", "You"] },
    modal: { title: "Nima qilish kerak?", items: ["should", "must", "shouldn't", "mustn't"] },
    action: { title: "Harakat", items: ["protect", "recycle", "waste", "save", "clean"] },
    object: { title: "Nima?", items: ["the planet", "plastic", "water", "the ocean", "nature"] },
};

export const ALL_ECOLOGY_PHRASES: VocabularyItem[] = [
    { english: "Protect the planet.", uzbek: "Sayyorani himoya qiling." },
    { english: "Recycle plastic bottles.", uzbek: "Plastik idishlarni qayta ishlang." },
    { english: "Save water at home.", uzbek: "Uyda suvni tejang." },
    { english: "Don't cut trees.", uzbek: "Daraxtlarni kesmang." },
    { english: "The earth is our home.", uzbek: "Yer bizning uyimiz." },
    { english: "Clean air is important.", uzbek: "Toza havo muhim." },
];
