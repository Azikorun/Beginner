import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson16/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson16/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson16GrammarRules = [
    { title: "Sanaladigan (Countable)", structure: "a/an + birlik, some/many + ko'plik", example: `Otni sanash mumkin: <span class="font-bold">an apple, two apples</span>.`, color: 'green' as const },
    { title: "Sanalmaydigan (Uncountable)", structure: "some / much + ot", example: `Otni sanab bo'lmaydi: <span class="font-bold">some water</span> (not two waters).`, color: 'sky' as const },
    { title: "Some (+)", structure: "darak gaplarda", example: `There is <span class="font-bold">some milk</span>. I have <span class="font-bold">some friends</span>.`, color: 'green' as const },
    { title: "Any (?/-)", structure: "so'roq va inkor gaplarda", example: `Is there <span class="font-bold">any sugar</span>? I don't have <span class="font-bold">any money</span>.`, color: 'red' as const }
];

export const Lesson16 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">16-Dars: Sanaladigan va Sanalmaydigan Otlar</h1>
        <p class="mt-4 text-lg text-gray-600">Bu ot turlari orasidagi farqni va ular bilan 'some' va 'any' ni qanday ishlatishni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Countable & Uncountable Nouns",
        description: "Ingliz tilida otlar sanaladigan (donalab sanash mumkin) va sanalmaydigan (suyuqlik, donador narsalar, mavhum tushunchalar) turlariga bo'linadi. Bu qaysi miqdor so'zini ishlatishni belgilaydi.",
        rules: lesson16GrammarRules
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
