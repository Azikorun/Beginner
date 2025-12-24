
import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson27/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson27/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson27GrammarRules = [
    { title: "So + Sifat", structure: "so + adjective", example: `She is <span class="font-bold">so happy</span>. (U shunchalik baxtli)`, color: 'sky' as const },
    { title: "Such + Ot", structure: "such + (a/an) + adjective + noun", example: `It is <span class="font-bold">such a big</span> house. (Bu shunday katta uy)`, color: 'green' as const },
    { title: "Ko'plikda Such", structure: "such + plural noun", example: `They are <span class="font-bold">such good</span> friends. (Ular shunday yaxshi do'stlar)`, color: 'sky' as const }
];

export const Lesson27 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-indigo-800">27-Dars: So va Such (O'ta / Shunday)</h1>
        <p class="mt-4 text-lg text-gray-600">Sifatlar va otlarni yanada kuchliroq tasvirlashni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: So va Such farqi",
        description: "'So' faqat sifat bilan, 'Such' esa sifat va ot bilan birga ishlatiladi.",
        rules: lesson27GrammarRules
    }));

    const hr = document.createElement('hr');
    hr.className = "my-12 border-gray-300";
    main.appendChild(hr);

    const exercisesHeader = document.createElement('div');
    exercisesHeader.className = "text-center mb-8";
    exercisesHeader.innerHTML = `
        <h2 class="text-3xl font-bold text-indigo-800">2-Qism: Mashqlar Bo'limi</h2>
    `;
    const regenerateButton = document.createElement('button');
    regenerateButton.className = "mt-4 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500";
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
