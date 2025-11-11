import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson13/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson13/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson13GrammarRules = [
    { title: "Darak (Birlik)", structure: "There is a/an + narsa", example: `There <span class="font-bold">is a book</span> on the table.`, color: 'green' as const },
    { title: "Darak (Ko'plik)", structure: "There are + narsalar", example: `There <span class="font-bold">are two</span> chairs.`, color: 'sky' as const },
    { title: "Inkor (-)", structure: "There isn't / aren't...", example: `There <span class="font-bold">isn't a pen</span>. There <span class="font-bold">aren't any</span> pens.`, color: 'red' as const },
    { title: "So'roq (?)", structure: "Is there...? / Are there...?", example: `<span class="font-bold">Is there a</span> window? <span class="font-bold">Are there any</span> students?`, color: 'sky' as const }
];

export const Lesson13 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">13-Dars: U Yerda Bor (There is / There are)</h1>
        <p class="mt-4 text-lg text-gray-600">Biror joyda narsalarning mavjudligini yoki yo'qligini ifodalashni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: 'There is' va 'There are' Ishlatilishi",
        description: "'There is' birlikdagi otlar uchun, 'There are' esa ko'plikdagi otlar uchun ishlatiladi. Bu ibora biror narsaning mavjudligini bildiradi.",
        rules: lesson13GrammarRules
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
