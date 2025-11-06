import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Harakat Predloglari",
        items: [
            { english: "to", uzbek: "...ga, ...tomon" },
            { english: "from", uzbek: "...dan" },
            { english: "into", uzbek: "ichiga" },
            { english: "out of", uzbek: "ichidan, tashqarisiga" },
        ],
    },
    {
        title: "2. Harakat Fe'llari",
        items: [
            { english: "go", uzbek: "bormoq" },
            { english: "come", uzbek: "kelmoq" },
            { english: "walk", uzbek: "yurmoq, piyoda bormoq" },
            { english: "run", uzbek: "yugurmoq" },
            { english: "drive", uzbek: "mashina haydamoq" },
        ],
    },
    {
        title: "3. Joylar va Misollar",
        items: [
            { english: "go to school", uzbek: "maktabga bormoq" },
            { english: "come from work", uzbek: "ishdan kelmoq" },
            { english: "walk into the room", uzbek: "xonaga kirmoq" },
            { english: "run out of the house", uzbek: "uydan yugurib chiqmoq" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I", "He", "The cat", "She"] },
    verb: { title: "Nima qiladi?", items: ["goes", "walks", "comes", "runs"] },
    preposition: { title: "Predlog", items: ["to", "from", "into", "out of"] },
    object: { title: "Qayerga/Qayerdan?", items: ["school", "the house", "the room", "work"] },
};


export const ALL_MOVEMENTS: VocabularyItem[] = [
    { english: "I go to school.", uzbek: "Men maktabga boraman." },
    { english: "He comes from the shop.", uzbek: "U do'kondan keladi." },
    { english: "The cat runs into the box.", uzbek: "Mushuk qutiga yugurib kiradi." },
    { english: "She walks out of the room.", uzbek: "U xonadan chiqib ketadi." },
    { english: "They drive to the city.", uzbek: "Ular shaharga mashinada boradilar." },
    { english: "We walk from the park.", uzbek: "Biz parkdan piyoda kelamiz." },
];
