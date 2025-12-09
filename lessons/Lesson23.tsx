
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson23/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson23/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson23GrammarRules = [
    { title: "By + Transport", structure: "go + by + car/bus/plane", example: `I go to work <span class="font-bold">by bus</span>. We travel <span class="font-bold">by plane</span>.`, color: 'green' as const },
    { title: "Istisno: Piyoda", structure: "go + on foot", example: `Men piyoda boraman = I go <span class="font-bold">on foot</span> (NOT by foot).`, color: 'red' as const },
    { title: "Fe'llar", structure: "drive vs ride", example: `You <span class="font-bold">drive</span> a car. You <span class="font-bold">ride</span> a bike.`, color: 'sky' as const }
];

export const Lesson23 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">23-Dars: Transport va Sayohat</h1>
        <p class="mt-4 text-lg text-gray-600">Transport turlari va 'by' predlogini ishlatishni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Transport Predloglari",
        description: "Transport vositasida harakatlanishni aytganda odatda 'by' predlogi ishlatiladi. Lekin piyoda yurish uchun 'on foot' deyiladi.",
        rules: lesson23GrammarRules
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
