import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson18/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson18/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson18GrammarRules = [
    { title: "To (..ga)", structure: "go/walk/run + to + joy", example: `Maqsad, yo'nalishni bildiradi. I walk <span class="font-bold">to school</span>.`, color: 'green' as const },
    { title: "From (..dan)", structure: "come/walk/run + from + joy", example: `Boshlanish nuqtasini bildiradi. He comes <span class="font-bold">from work</span>.`, color: 'sky' as const },
    { title: "Into (ichiga)", structure: "go/walk/run + into + yopiq joy", example: `Ichkariga kirish harakatini bildiradi. The cat runs <span class="font-bold">into the house</span>.`, color: 'red' as const },
    { title: "Out of (ichidan)", structure: "go/walk/run + out of + yopiq joy", example: `Ichkaridan chiqish harakatini bildiradi. She goes <span class="font-bold">out of the room</span>.`, color: 'red' as const }
];

export const Lesson18 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">18-Dars: Harakat Predloglari (To, From, Into)</h1>
        <p class="mt-4 text-lg text-gray-600">Qayerga borishni, qayerdan kelishni va harakat yo'nalishini ifodalashni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Harakat Predloglari",
        description: "Bu predloglar harakatning yo'nalishini ko'rsatish uchun fe'llar bilan birga ishlatiladi.",
        rules: lesson18GrammarRules
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
