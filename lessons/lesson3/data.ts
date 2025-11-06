
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Oziq-ovqat (Food)",
        items: [
            { english: "a pizza", uzbek: "pitsa" },
            { english: "a salad", uzbek: "salat" },
            { english: "a sandwich", uzbek: "sendvich" },
            { english: "soup", uzbek: "sho'rva" },
            { english: "an apple", uzbek: "olma" },
            { english: "an orange", uzbek: "apelsin" },
            { english: "a burger", uzbek: "burger" },
            { english: "fries", uzbek: "fri kartoshkasi" },
            { english: "a cake", uzbek: "tort" },
        ],
    },
    {
        title: "2. Ichimliklar (Drinks)",
        items: [
            { english: "water", uzbek: "suv" },
            { english: "a coffee", uzbek: "kofe" },
            { english: "tea", uzbek: "choy" },
            { english: "juice", uzbek: "sharbat" },
            { english: "a soda", uzbek: "gazli ichimlik" },
            { english: "milk", uzbek: "sut" },
        ],
    },
    {
        title: "3. Restoran Iboralari",
        items: [
            { english: "I would like...", uzbek: "Men ... xohlayman" },
            { english: "Can I have...?", uzbek: "... olsam maylimi?" },
            { english: "a table for two", uzbek: "ikki kishilik stol" },
            { english: "the menu, please", uzbek: "menyuni, iltimos" },
            { english: "the bill, please", uzbek: "hisobni, iltimos" },
            { english: "Enjoy your meal!", uzbek: "Yoqimli ishtaha!" },
            { english: "Ready to order?", uzbek: "Buyurtma berishga tayyormisiz?" },
        ],
    },
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I"] },
    verb: { title: "Nima qilmoqchi?", items: ["would like", "want"] },
    object: { title: "Nima?", items: ["a coffee", "some water", "a pizza", "the bill"] },
    polite: { title: "Qo'shimcha?", items: ["please"] }
};


export const ALL_FOOD_ITEMS: VocabularyItem[] = [
    ...VOCABULARY_DATA[0].items,
    ...VOCABULARY_DATA[1].items,
];
