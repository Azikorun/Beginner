
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson25/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson25/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson25GrammarRules = [
    { title: "It is + Sifat", structure: "It is + [ob-havo]", example: `It is <span class="font-bold">sunny</span>. It is <span class="font-bold">hot</span>.`, color: 'green' as const },
    { title: "Savol Berish", structure: "What is the weather like?", example: `Ob-havo qanday? <span class="font-bold">How is the weather?</span> ham to'g'ri.`, color: 'sky' as const },
    { title: "Inkor", structure: "It is not (isn't) + Sifat", example: `It <span class="font-bold">is not</span> cold.`, color: 'red' as const }
];

export const Lesson25 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">25-Dars: Ob-havo (The Weather)</h1>
        <p class="mt-4 text-lg text-gray-600">Ob-havo haqida gapirishni va haroratni tasvirlashni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Ob-havoni Tasvirlash",
        description: "Ingliz tilida ob-havo haqida gapirganda odatda gapni 'It is' (bu ...) bilan boshlaymiz.",
        rules: lesson25GrammarRules
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
