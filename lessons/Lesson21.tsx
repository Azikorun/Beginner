import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson21/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson21/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson21GrammarRules = [
    { title: "Darak (+)", structure: "Subject + am/is/are", example: `I <span class="font-bold">am</span> happy. He <span class="font-bold">is</span> a doctor. They <span class="font-bold">are</span> friends.`, color: 'green' as const },
    { title: "Inkor (-)", structure: "Subject + am/is/are + not", example: `I <span class="font-bold">am not</span> sad. He <span class="font-bold">isn't</span> a teacher. They <span class="font-bold">aren't</span> late.`, color: 'red' as const },
    { title: "So'roq (?)", structure: "Am/Is/Are + Subject...?", example: `<span class="font-bold">Am I</span> right? <span class="font-bold">Is she</span> a student? <span class="font-bold">Are you</span> ready?`, color: 'sky' as const }
];

export const Lesson21 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">21-Dars: 'To Be' Fe'li (am, is, are)</h1>
        <p class="mt-4 text-lg text-gray-600">Bo'lish fe'lining uch asosiy shaklini o'rganing va ularni sifatlar, otlar va joylar bilan ishlating.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: 'To Be' Fe'li",
        description: "'Be' fe'li holatni, kim/nima ekanligini yoki qayerdaligini bildirish uchun ishlatiladi. Bu ingliz tilidagi eng muhim fe'llardan biridir. U shaxsga qarab o'zgaradi.",
        rules: lesson21GrammarRules
    }));

    const hr = document.createElement('hr');
    hr.className = "my-12 border-gray-300";
    main.appendChild(hr);

    const exercisesHeader = document.createElement('div');
    exercisesHeader.className = "text-center mb-8";
    exercisesHeader.innerHTML = `
        <h2 class="text-3xl font-bold text-blue-800">2-Qism: Mashqlar Bo'limi</h2>
        <p class="text-gray-600 mt-2">Har safar yangi, tasodifiy mashqlarni olish uchun tugmani bosing.</p>
    `;
    const regenerateButton = document.createElement('button');
    regenerateButton.className = "mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50";
    regenerateButton.textContent = 'Yangi Mashqlar';
    exercisesHeader.appendChild(regenerateButton);
    main.appendChild(exercisesHeader);

    const exercisesContainer = document.createElement('div');
    main.appendChild(exercisesContainer);

    const renderExercises = () => {
        exercisesContainer.innerHTML = '';
        exercisesContainer.appendChild(MatchingExercise({ questions: generateMatchingQuestions(6) }));
        exercisesContainer.appendChild(ClickToPlaceExercise({ puzzles: generateClickerPuzzles(6) }));
        exercisesContainer.appendChild(SentenceBuilderExercise({ columns: SENTENCE_BUILDER_COLUMNS, prompts: generateSentenceBuilderPrompts(6) }));
    };

    regenerateButton.onclick = renderExercises;

    renderExercises();

    container.appendChild(main);
};