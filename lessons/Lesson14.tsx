import { VOCABULARY_DATA, SENTENCE_BUILDER_COLUMNS } from './lesson14/data';
import { generateMatchingQuestions, generateClickerPuzzles, generateSentenceBuilderPrompts } from './lesson14/exercises';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { MatchingExercise } from '../components/MatchingExercise';
import { ClickToPlaceExercise } from '../components/ClickToPlaceExercise';
import { SentenceBuilderExercise } from '../components/SentenceBuilderExercise';

const lesson14GrammarRules = [
    { title: "Must (Shart)", structure: "Subject + must + fe'l", example: `Qat'iy majburiyat yoki qoida. You <span class="font-bold">must wear</span> a seatbelt.`, color: 'red' as const },
    { title: "Should (Kerak)", structure: "Subject + should + fe'l", example: `Yaxshi maslahat yoki tavsiya. You <span class="font-bold">should drink</span> more water.`, color: 'green' as const },
    { title: "Mustn't (Mumkin emas)", structure: "Subject + mustn't + fe'l", example: `Qat'iy taqiq. You <span class="font-bold">mustn't touch</span> that.`, color: 'red' as const },
    { title: "Shouldn't (Kerak emas)", structure: "Subject + shouldn't + fe'l", example: `Yomon fikrga qarshi maslahat. You <span class="font-bold">shouldn't eat</span> too much candy.`, color: 'green' as const }
];

export const Lesson14 = (container: HTMLElement) => {
    container.innerHTML = '';
    const main = document.createElement('main');
    main.className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8";

    const header = document.createElement('header');
    header.className = "text-center mb-10";
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">14-Dars: Shart va Maslahat (Must / Should)</h1>
        <p class="mt-4 text-lg text-gray-600">Majburiyat ('must') va maslahat ('should') berish uchun modal fe'llarni o'rganing.</p>
    `;
    main.appendChild(header);

    main.appendChild(VocabularySection(VOCABULARY_DATA));
    main.appendChild(GrammarSection({
        title: "Grammatika: 'Must' va 'Should' Modal Fe'llari",
        description: "'must' va 'should' fe'llari asosiy fe'ldan oldin keladi va ish-harakatga qo'shimcha ma'no beradi. Ular barcha shaxslar uchun bir xil qo'llaniladi.",
        rules: lesson14GrammarRules
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
