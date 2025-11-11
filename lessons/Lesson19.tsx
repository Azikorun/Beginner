import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson19/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson19/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson19GrammarRules = [
    { title: "Will (Kelajak)", structure: "Subject + will + fe'l", example: `Kelajakdagi harakat yoki va'da. I <span class="font-bold">will call</span> you tomorrow.`, color: 'green' as const },
    { title: "May / Might (Ehtimol)", structure: "Subject + may/might + fe'l", example: `Ishonch past bo'lgan ehtimollik. It <span class="font-bold">might rain</span> later.`, color: 'sky' as const },
    { title: "Can / Could (So'rov/Qobiliyat)", structure: "Can/Could + you + fe'l?", example: `Qobiliyat yoki norasmiy/rasmiy so'rov. <span class="font-bold">Can you</span> swim? <span class="font-bold">Could you</span> help me?`, color: 'red' as const },
    { title: "Would (Iltimos)", structure: "Would you + fe'l?", example: `Juda muloyim iltimos. <span class="font-bold">Would you</span> open the door, please?`, color: 'sky' as const }
];

export const Lesson19 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">19-Dars: Ehtimollik va So'rov</h1>
        <p class="mt-4 text-lg text-gray-600">Turli vaziyatlar uchun to'g'ri modal fe'lni tanlashni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: Ko'p Qo'llaniladigan Modal Fe'llar",
        description: "Modal fe'llar gapning asosiy fe'liga qo'shimcha ma'no beradi, masalan, ehtimollik, majburiyat yoki qobiliyat.",
        rules: lesson19GrammarRules
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
