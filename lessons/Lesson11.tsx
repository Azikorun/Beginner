import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson11/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson11/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson11GrammarRules = [
    { title: "Noaniq Artikllar (a/an)", structure: "a/an + birlikdagi ot", example: `'a' undosh tovush oldidan, 'an' unli tovush oldidan keladi.`, color: 'green' as const },
    { title: "Aniq Artikllar (the)", structure: "the + ot", example: `Suhbatdoshga ma'lum, yagona yoki avval aytilgan narsalar uchun.`, color: 'sky' as const },
    { title: "Misollar", structure: "a book, an apple, the sun", example: `I see <span class="font-bold">a car</span>. I eat <span class="font-bold">an apple</span>. Look at <span class="font-bold">the sky</span>.`, color: 'red' as const }
];

export const Lesson11 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">11-Dars: Artikllar (A, An, The)</h1>
        <p class="mt-4 text-lg text-gray-600">Noaniq ('a', 'an') va aniq ('the') artikllarini to'g'ri ishlatishni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Ingliz Tili Artikllari",
        description: "Artikllar otning noaniq (birorta) yoki aniq (aynan o'sha) ekanligini bildirish uchun ishlatiladi.",
        rules: lesson11GrammarRules
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
