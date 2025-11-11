import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson15/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson15/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson15GrammarRules = [
    { title: "Qiyosiy (Comparative)", structure: "sifat + -er than", example: `A car is <span class="font-bold">faster than</span> a bike.`, color: 'green' as const },
    { title: "Orttirma (Superlative)", structure: "the + sifat + -est", example: `A plane is <span class="font-bold">the fastest</span>.`, color: 'sky' as const },
    { title: "Uzun Sifatlar", structure: "more / the most + sifat", example: `This book is <span class="font-bold">more interesting</span>.`, color: 'red' as const },
    { title: "Istisnolar", structure: "good -> better -> best", example: `My English is <span class="font-bold">better</span> now.`, color: 'red' as const }
];

export const Lesson15 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">15-Dars: Sifat Darajalari (Bigger, The Biggest)</h1>
        <p class="mt-4 text-lg text-gray-600">Narsalarni solishtirish uchun sifatlarning qiyosiy va orttirma darajalarini o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Sifat Darajalari",
        description: "Sifatlar narsalarni solishtirish uchun o'zgarishi mumkin. Odatda, qisqa so'zlarga '-er' va '-est' qo'shimchalari, uzun so'zlarga esa 'more' va 'the most' so'zlari qo'shiladi.",
        rules: lesson15GrammarRules
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
