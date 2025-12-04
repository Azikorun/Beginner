
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Kelajak Vaqt Iboralari (Time Expressions)",
        items: [
            { english: "tomorrow", uzbek: "ertaga" },
            { english: "next week", uzbek: "keyingi hafta" },
            { english: "next year", uzbek: "keyingi yil" },
            { english: "soon", uzbek: "tez orada" },
            { english: "later", uzbek: "keyinroq" },
            { english: "in the future", uzbek: "kelajakda" },
        ],
    },
    {
        title: "2. Rejalar va Orzular (Plans & Dreams)",
        items: [
            { english: "travel to London", uzbek: "Londonga sayohat qilmoq" },
            { english: "buy a car", uzbek: "mashina sotib olmoq" },
            { english: "be rich", uzbek: "boy bo'lmoq" },
            { english: "get married", uzbek: "turmush qurmoq" },
            { english: "learn English", uzbek: "ingliz tilini o'rganmoq" },
            { english: "become a doctor", uzbek: "shifokor bo'lmoq" },
        ],
    },
    {
        title: "3. 'Will' Iboralari",
        items: [
            { english: "I will...", uzbek: "Men ... qilaman" },
            { english: "I won't...", uzbek: "Men ... qilmayman" },
            { english: "Will you...?", uzbek: "Siz ... qilasizmi?" },
            { english: "I promise", uzbek: "Va'da beraman" },
            { english: "I think", uzbek: "Menimcha / O'ylaymanki" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I", "You", "He", "She", "They", "We"] },
    modal: { title: "Yordamchi", items: ["will", "won't"] },
    verb: { title: "Fe'l", items: ["go", "buy a car", "travel", "call you", "be late", "help you"] },
    time: { title: "Qachon?", items: ["tomorrow", "next week", "soon", "later", "next year"] },
};

export const ALL_FUTURE_PHRASES: VocabularyItem[] = [
    { english: "I will go tomorrow", uzbek: "Men ertaga boraman" },
    { english: "She will buy a car", uzbek: "U mashina sotib oladi" },
    { english: "He won't come", uzbek: "U kelmaydi" },
    { english: "They will travel", uzbek: "Ular sayohat qilishadi" },
    { english: "It will rain", uzbek: "Yomg'ir yog'adi" },
    { english: "We will win", uzbek: "Biz g'alaba qozonamiz" },
];
