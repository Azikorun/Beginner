import { lessons } from './lessons';

// App state
let state = {
    currentLessonId: null as string | null,
};

let rootContainer: HTMLElement | null = null;

const renderLessonList = () => {
    if (!rootContainer) return;
    rootContainer.innerHTML = ''; // Clear previous content

    const main = document.createElement('main');
    main.className = 'max-w-4xl mx-auto p-4 sm:p-6 lg:p-8';

    const header = document.createElement('header');
    header.className = 'text-center mb-10';
    header.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-blue-800">Interaktiv Ingliz Tili Darslari</h1>
        <p class="mt-4 text-lg text-gray-600">O'rganishni boshlash uchun dars tanlang.</p>
    `;
    main.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'grid md:grid-cols-2 gap-8';

    lessons.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-2';
        lessonCard.setAttribute('role', 'button');
        lessonCard.setAttribute('tabindex', '0');
        lessonCard.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-800">${lesson.title}</h2>
            <p class="mt-2 text-gray-600">${lesson.description}</p>
            <div class="mt-6 text-right font-bold text-blue-600 group-hover:text-blue-800">
                Boshlash &rarr;
            </div>
        `;
        lessonCard.onclick = () => handleSelectLesson(lesson.id);
        lessonCard.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleSelectLesson(lesson.id);
            }
        }
        grid.appendChild(lessonCard);
    });

    main.appendChild(grid);
    rootContainer.appendChild(main);
};

const renderLessonView = () => {
    if (!rootContainer || !state.currentLessonId) return;
    rootContainer.innerHTML = ''; // Clear previous content

    const lesson = lessons.find(l => l.id === state.currentLessonId);
    if (!lesson) {
        console.error(`Lesson with id ${state.currentLessonId} not found.`);
        handleGoBack();
        return;
    }
    
    const container = document.createElement('div');

    const backButton = document.createElement('button');
    backButton.className = "sticky top-4 left-4 z-10 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 m-4";
    backButton.innerHTML = '&larr; Barcha Darslar';
    backButton.setAttribute('aria-label', 'Back to lessons');
    backButton.onclick = handleGoBack;
    
    container.appendChild(backButton);

    // The lesson component is now a function that renders into a container
    const lessonContentContainer = document.createElement('div');
    lesson.component(lessonContentContainer);
    container.appendChild(lessonContentContainer);

    rootContainer.appendChild(container);
};

const handleSelectLesson = (id: string) => {
    state.currentLessonId = id;
    render();
    window.scrollTo(0, 0);
};

const handleGoBack = () => {
    state.currentLessonId = null;
    render();
    window.scrollTo(0, 0);
};

const render = () => {
    if (state.currentLessonId) {
        renderLessonView();
    } else {
        renderLessonList();
    }
};

export const renderApp = (container: HTMLElement) => {
    if (!container) {
        throw new Error('Container element not found for app');
    }
    rootContainer = container;
    render();
};
