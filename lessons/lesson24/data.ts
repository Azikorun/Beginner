
import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. So'roq So'zlar (Question Words)",
        items: [
            { english: "What", uzbek: "Nima" },
            { english: "Where", uzbek: "Qayerda / Qayerga" },
            { english: "When", uzbek: "Qachon" },
            { english: "Who", uzbek: "Kim" },
            { english: "Why", uzbek: "Nega / Nima uchun" },
            { english: "How", uzbek: "Qanday / Qanaqa" },
        ],
    },
    {
        title: "2. Yordamchi Fe'llar (Auxiliary Verbs)",
        items: [
            { english: "do / does", uzbek: "qilmoq (savolda)" },
            { english: "am / is / are", uzbek: "bo'lmoq (savolda)" },
            { english: "can", uzbek: "qila olmoq" },
        ],
    },
    {
        title: "3. Namuna Savollar",
        items: [
            { english: "What is your name?", uzbek: "Ismingiz nima?" },
            { english: "Where do you live?", uzbek: "Qayerda yashaysiz?" },
            { english: "When do you start?", uzbek: "Qachon boshlaysiz?" },
            { english: "Who is that?", uzbek: "Anavi kim?" },
            { english: "How are you?", uzbek: "Qalaysiz? (Ahvolingiz yaxshimi?)" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    questionWord: { title: "So'roq So'z", items: ["What", "Where", "When", "Who", "How", "Why"] },
    auxiliary: { title: "Yordamchi", items: ["do", "does", "is", "are", "can"] },
    subject: { title: "Ega", items: ["you", "he", "she", "it", "they", "this"] },
    verb: { title: "Fe'l/Holat", items: ["live", "work", "go", "from", "do", "doing"] },
};

export const ALL_QUESTIONS: VocabularyItem[] = [
    { english: "Where do you live?", uzbek: "Siz qayerda yashaysiz?" },
    { english: "What is this?", uzbek: "Bu nima?" },
    { english: "Who is he?", uzbek: "U kim?" },
    { english: "When does it start?", uzbek: "U qachon boshlanadi?" },
    { english: "How do you do that?", uzbek: "Siz buni qanday qilasiz?" },
    { english: "Why are you sad?", uzbek: "Nega xafasiz?" },
];
