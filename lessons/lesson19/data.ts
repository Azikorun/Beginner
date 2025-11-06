import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Kelajak va Va'da",
        items: [
            { english: "will / 'll", uzbek: "...-man (kelajak)" },
            { english: "will not / won't", uzbek: "...mayman (inkor)" },
            { english: "I will help you.", uzbek: "Men sizga yordam beraman." },
            { english: "She will be here soon.", uzbek: "U tez orada shu yerda bo'ladi." },
        ],
    },
    {
        title: "2. Ehtimollik (Possibility)",
        items: [
            { english: "may", uzbek: "...-ishi mumkin (ehtimol)" },
            { english: "might", uzbek: "...-ishi mumkin (ehtimol kamroq)" },
            { english: "It may rain.", uzbek: "Yomg'ir yog'ishi mumkin." },
            { english: "He might be late.", uzbek: "U kech qolishi mumkin." },
        ],
    },
    {
        title: "3. So'rov va Ruxsat",
        items: [
            { english: "Can I...?", uzbek: "...-sam maylimi? (norasmiy)" },
            { english: "Could you...?", uzbek: "...-a olasizmi? (rasmiy)" },
            { english: "May I...?", uzbek: "...-sam maylimi? (juda rasmiy)" },
            { english: "Would you...?", uzbek: "...-a olasizmi? (juda muloyim)" },
        ],
    }
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    start: { title: "Boshlanishi", items: ["I", "It", "He", "Could you", "May I"] },
    modal: { title: "Modal fe'l", items: ["will", "might", "may", "please"] },
    verb: { title: "Fe'l", items: ["be late", "rain", "help you", "open", "come in?"] },
    end: { title: "Yakuni", items: ["tomorrow", "later", "now", "the window?"] },
};


export const ALL_MODAL_SENTENCES: VocabularyItem[] = [
    { english: "It might rain.", uzbek: "Yomg'ir yog'ishi mumkin." },
    { english: "Could you open the window?", uzbek: "Derazani ochib yubora olasizmi?" },
    { english: "I will call you tomorrow.", uzbek: "Men senga ertaga qo'ng'iroq qilaman." },
    { english: "May I leave now?", uzbek: "Hozir ketsam maylimi?" },
    { english: "He may be busy.", uzbek: "U band bo'lishi mumkin." },
    { english: "Would you like some tea?", uzbek: "Choy xohlaysizmi?" },
    { english: "She won't be at the party.", uzbek: "U bazmda bo'lmaydi." },
];