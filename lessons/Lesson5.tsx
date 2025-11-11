

import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson5/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson5/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson5GrammarRules = [
    { title: "This (Yaqin, Birlik)", structure: "This is a/an...", example: `This is <span class="font-bold">a book</span>.`, color: 'green' as const },
    { title: "That (Uzoq, Birlik)", structure: "That is a/an...", example: `That is <span class="font-bold">a desk</span>.`, color: 'sky' as const },
    { title: "These (Yaqin, Ko'plik)", structure: "These are...", example: `These are <span class="font-bold">pens</span>.`, color: 'green' as const },
    { title: "Those (Uzoq, Ko'plik)", structure: "Those are...", example: `Those are <span class="font-bold">chairs</span>.`, color: 'sky' as const }
];

export const Lesson5 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">5-Dars: Bu Nima? (What's This?)</h1>
        <p class="mt-4 text-lg text-gray-600">Sinf xonasidagi narsalarni va ko'rsatish olmoshlarini o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Ko'rsatish Olmoshlari (This/That/These/Those)",
        description: "Bu olmoshlar narsalarning yaqin yoki uzoqligini va birlik yoki ko'plikda ekanligini bildirish uchun ishlatiladi.",
        rules: lesson5GrammarRules
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
