
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Uyda Bajariladigan Ishlar",
        items: [
            { english: "watch TV", uzbek: "TV ko'rmoq" },
            { english: "read a book", uzbek: "kitob o'qimoq" },
            { english: "listen to music", uzbek: "musiqa tinglamoq" },
            { english: "cook dinner", uzbek: "ovqat pishirmoq" },
            { english: "drink tea", uzbek: "choy ichmoq" },
            { english: "check emails", uzbek: "xatlarni tekshirmoq" },
            { english: "make the bed", uzbek: "joyni yig'ishtirmoq" },
            { english: "take a shower", uzbek: "dush qabul qilmoq" },
        ],
    },
    {
        title: "2. Joyni Bildiruvchi Iboralar",
        items: [
            { english: "in the living room", uzbek: "mehmonxonada" },
            { english: "in the kitchen", uzbek: "oshxonada" },
            { english: "in the bedroom", uzbek: "yotoqxonada" },
            { english: "in the bathroom", uzbek: "hammomda" },
            { english: "in the garden", uzbek: "bog'da" },
            { english: "at my desk", uzbek: "ish stolimda" },
        ],
    },
    {
        title: "3. Vaqtni Bildiruvchi Iboralar",
        items: [
            { english: "in the morning", uzbek: "ertalab" },
            { english: "in the evening", uzbek: "kechqurun" },
            { english: "every day", uzbek: "har kuni" },
            { english: "on weekends", uzbek: "dam olish kunlari" },
            { english: "after work", uzbek: "ishdan keyin" },
            { english: "before bed", uzbek: "uyqudan oldin" },
        ],
    },
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["I", "You"] },
    action: { title: "Nima qiladi?", items: ["watch TV", "read a book", "cook dinner", "listen to music"] },
    place: { title: "Qayerda?", items: ["in the living room", "in the kitchen", "in the bedroom", "at my desk"] },
    time: { title: "Qachon?", items: ["in the evening", "on weekends", "every day", "in the morning"] }
};

export const ALL_PLACES: VocabularyItem[] = VOCABULARY_DATA[1].items;