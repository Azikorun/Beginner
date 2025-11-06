import { VocabularyCategory, SentenceBuilderColumns, VocabularyItem } from '../../types';

export const VOCABULARY_DATA: VocabularyCategory[] = [
    {
        title: "1. Qoidalar va Majburiyatlar ('Must')",
        items: [
            { english: "do homework", uzbek: "uy vazifasini bajarmoq" },
            { english: "wear a seatbelt", uzbek: "xavfsizlik kamarini taqmoq" },
            { english: "be quiet", uzbek: "jim bo'lmoq" },
            { english: "stop at a red light", uzbek: "qizil chiroqda to'xtamoq" },
            { english: "mustn't run in the library", uzbek: "kutubxonada yugurish mumkin emas" },
            { english: "mustn't touch the art", uzbek: "san'at asariga tegish mumkin emas" },
        ],
    },
    {
        title: "2. Maslahatlar va Tavsiyalar ('Should')",
        items: [
            { english: "see a doctor", uzbek: "shifokorga ko'rinmoq" },
            { english: "drink water", uzbek: "suv ichmoq" },
            { english: "get some rest", uzbek: "dam olmoq" },
            { english: "study for the test", uzbek: "imtihonga o'qimoq" },
            { english: "shouldn't eat too much candy", uzbek: "ko'p shirinlik yemaslik kerak" },
            { english: "shouldn't watch too much TV", uzbek: "ko'p televizor ko'rmaslik kerak" },
        ],
    },
];

export const SENTENCE_BUILDER_COLUMNS: SentenceBuilderColumns = {
    subject: { title: "Kim?", items: ["You", "He", "Students"] },
    modal: { title: "Modal fe'l", items: ["must", "mustn't", "should", "shouldn't"] },
    verb: { title: "Fe'l", items: ["be quiet", "study", "see a doctor", "eat junk food"] },
    extra: { title: "Qo'shimcha", items: ["in the library", "for the test", "if you are sick", "every day"] },
};


export const ALL_ADVICE_AND_RULES: VocabularyItem[] = [
    { english: "You must stop.", uzbek: "Siz to'xtashingiz shart." },
    { english: "You should rest.", uzbek: "Siz dam olishingiz kerak." },
    { english: "You mustn't run.", uzbek: "Siz yugurmasligingiz kerak (taqiqlanadi)." },
    { english: "You shouldn't worry.", uzbek: "Siz xavotir olmasligingiz kerak." },
    { english: "He must do his homework.", uzbek: "U uy vazifasini bajarishi shart." },
    { english: "She should see a doctor.", uzbek: "U shifokorga ko'rinishi kerak." },
    { english: "They mustn't be loud.", uzbek: "Ular shovqin qilmasliklari shart." },
    { english: "We should drink water.", uzbek: "Biz suv ichishimiz kerak." },
];