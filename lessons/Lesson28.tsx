
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson28/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson28/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson28GrammarRules = [
    { title: "Too + Sifat", structure: "too + adjective", example: `The tea is <span class="font-bold">too hot</span>. (Choy juda ham issiq - ichib bo'lmaydi)`, color: 'red' as const },
    { title: "Sifat + Enough", structure: "adjective + enough", example: `I am <span class="font-bold">tall enough</span>. (Bo'yim yetarli darajada baland)`, color: 'green' as const },
    { title: "Inkor", structure: "not + adjective + enough", example: `He is <span class="font-bold">not old enough</span>. (U yetarli darajada katta emas)`, color: 'red' as const }
];

export const Lesson28 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-amber-800">28-Dars: Too va Enough (Juda / Yetarli)</h1>
        <p class="mt-4 text-lg text-gray-600">Me'yor va daraja haqida gapirishni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Too va Enough Ishlatilishi",
        description: "'Too' sifatdan oldin, 'Enough' esa sifatdan keyin keladi. 'Too' ko'pincha salbiy ma'noda (haddan tashqari) ishlatiladi.",
        rules: lesson28GrammarRules
    }));

    const hr = document.createElement('hr');
    hr.className = "my-12 border-gray-300";
    main.appendChild(hr);

    const exercisesHeader = document.createElement('div');
    exercisesHeader.className = "text-center mb-8";
    exercisesHeader.innerHTML = `
        <h2 class="text-3xl font-bold text-amber-800">2-Qism: Mashqlar Bo'limi</h2>
    `;
    const regenerateButton = document.createElement('button');
    regenerateButton.className = "mt-4 bg-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500";
    regenerateButton.textContent = 'Mashqlarni Yangilash';
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
