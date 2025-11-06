import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. 'There is/are' Iboralari",
        items: [
            { english: "There is...", uzbek: "... bor (birlik)" },
            { english: "There are...", uzbek: "... bor (ko'plik)" },
            { english: "There isn't...", uzbek: "... yo'q (birlik)" },
            { english: "There aren't...", uzbek: "... yo'q (ko'plik)" },
            { english: "Is there...?", uzbek: "... bormi? (birlik)" },
            { english: "Are there...?", uzbek: "... bormi? (ko'plik)" },
        ],
    },
    {
        title: "2. Narsalar va Joylar",
        items: [
            { english: "a book on the table", uzbek: "stolda kitob" },
            { english: "a cat under the chair", uzbek: "stul tagida mushuk" },
            { english: "a park near the house", uzbek: "uy yonida park" },
            { english: "two cars on the street", uzbek: "ko'chada ikkita mashina" },
            { english: "some apples in the bag", uzbek: "sumkada bir nechta olma" },
            { english: "any students in the room", uzbek: "xonada birorta o'quvchi" },
        ],
    },
    {
        title: "3. Miqdor so'zlari (Quantifiers)",
        items: [
            { english: "a / an", uzbek: "bir (sanaladigan)" },
            { english: "some", uzbek: "bir nechta (darak, ko'plik)" },
            { english: "any", uzbek: "birorta, hech qanday (so'roq, inkor)" },
            { english: "two, three, four...", uzbek: "ikki, uch, to'rt..." },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    structure: { title: "Tuzilma", items: ["There is", "There are", "Is there", "Are there", "There isn't", "There aren't"] },
    quantifier: { title: "Miqdor", items: ["a", "some", "any", "two"] },
    object: { title: "Narsa", items: ["book", "cats", "school", "apples"] },
    place: { title: "Joy", items: ["on the table", "in the park", "here", "in the bag?"] },
};

export const ALL_SENTENCES: VocabularyItem[] = [
    { english: "There is a cat.", uzbek: "U yerda mushuk bor." },
    { english: "There are some trees.", uzbek: "U yerda bir nechta daraxt bor." },
    { english: "There isn't a book.", uzbek: "U yerda kitob yo'q." },
    { english: "There aren't any cars.", uzbek: "U yerda mashinalar yo'q." },
    { english: "Is there a park?", uzbek: "U yerda park bormi?" },
    { english: "Are there any students?", uzbek: "U yerda o'quvchilar bormi?" },
];