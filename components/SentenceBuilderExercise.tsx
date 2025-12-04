import { SentenceBuilderPrompt, SentenceBuilderColumns } from '../types';
import { Button } from './Button';
import { Section } from './Section';
import { shuffleArray } from '../utils/helpers';

type FeedbackStatus = 'unanswered' | 'correct' | 'incorrect';

export const SentenceBuilderExercise = ({ columns, prompts }: { columns: SentenceBuilderColumns, prompts: SentenceBuilderPrompt[] }): HTMLElement => {
    
    let state = {
        index: 0,
        placed: [] as { item: string; category: string }[],
        feedback: 'unanswered' as FeedbackStatus,
        completed: false,
        currentOptions: null as Record<string, string[]> | null,
    };

    const mainContainer = document.createElement('div');

    const getOptionsForCurrentPrompt = () => {
        if (state.currentOptions) return state.currentOptions;
        if (!prompts || prompts.length === 0) return {};

        const currentPrompt = prompts[state.index];
        const answerLower = currentPrompt.correctAnswer.toLowerCase();
        const newOptions: Record<string, string[]> = {};

        Object.keys(columns).forEach(cat => {
            const col = columns[cat];
            const allItems = col.items;

            // Identify items that are required for the answer
            // We check if the item string appears in the answer.
            // Note: This is a simple substring check. ideally we match tokens.
            const required = allItems.filter(item => 
                answerLower.includes(item.toLowerCase())
            );

            // Identify distractors (items not in the answer)
            const distractors = allItems.filter(item => 
                !answerLower.includes(item.toLowerCase())
            );

            // We want max 4 items total.
            // Always include required items first.
            const MAX_ITEMS = 4;
            
            // If we have more required items than MAX, we must keep them all (rare case for simple sentences)
            // Otherwise fill the rest with random distractors.
            let selectedItems = [...required];
            
            if (selectedItems.length < MAX_ITEMS) {
                const numNeeded = MAX_ITEMS - selectedItems.length;
                const shuffledDistractors = shuffleArray(distractors);
                selectedItems = [...selectedItems, ...shuffledDistractors.slice(0, numNeeded)];
            }

            newOptions[cat] = shuffleArray(selectedItems);
        });

        state.currentOptions = newOptions;
        return newOptions;
    };

    const render = () => {
        mainContainer.innerHTML = '';
        if (state.completed) {
            mainContainer.innerHTML = `
                <div class="text-center p-8 bg-green-100 rounded-lg">
                    <h3 class="text-3xl font-bold text-green-800">Tabriklaymiz!</h3>
                    <p class="mt-2 text-lg text-green-700">Siz barcha topshiriqlarni bajardingiz!</p>
                </div>
            `;
            return;
        }

        if (!prompts || prompts.length === 0) {
            mainContainer.textContent = 'Yuklanmoqda...';
            return;
        }

        const currentPrompt = prompts[state.index];
        const currentOptions = getOptionsForCurrentPrompt();
        const usedCategories = new Set(state.placed.map(item => item.category));

        // Prompt
        const promptDiv = document.createElement('div');
        promptDiv.className = "text-center p-4 bg-gray-100 rounded-lg mb-4";
        promptDiv.innerHTML = `
            <p class="text-lg font-semibold">Topshiriq ${state.index + 1}/${prompts.length}:</p>
            <p class="text-xl font-bold text-blue-800 mt-1">"${currentPrompt.prompt}"</p>
        `;

        // Placed words box
        const placedBox = document.createElement('div');
        const boxClasses = state.feedback === 'correct' ? 'border-green-500 bg-green-50' :
                           state.feedback === 'incorrect' ? 'border-red-500 bg-red-50' :
                           'border-blue-500 bg-gray-50';
        placedBox.className = `p-4 border-2 border-dashed rounded-lg my-4 min-h-[70px] text-center flex justify-center items-center flex-wrap ${boxClasses}`;

        if (state.placed.length === 0) {
            placedBox.innerHTML = `<span class="text-gray-400">Bo'laklar shu yerga tushadi</span>`;
        } else {
            const p = document.createElement('p');
            state.placed.forEach((placedItem, i) => {
                const span = document.createElement('span');
                span.className = "text-2xl font-bold text-gray-800 cursor-pointer hover:text-red-600 hover:line-through mx-1";
                span.textContent = placedItem.item;
                span.onclick = () => handleReturn(i);
                p.appendChild(span);
            });
            placedBox.appendChild(p);
        }

        // Columns with selectable words
        const columnsGrid = document.createElement('div');
        columnsGrid.className = "grid grid-cols-2 md:grid-cols-4 gap-4 my-6";
        
        Object.keys(currentOptions).forEach(cat => {
            const colTitle = columns[cat].title;
            const items = currentOptions[cat];
            
            const colDiv = document.createElement('div');
            colDiv.className = "bg-white p-3 rounded-lg border";
            colDiv.innerHTML = `<h4 class="text-center font-bold text-gray-600 mb-2">${colTitle}</h4>`;
            
            const itemsContainer = document.createElement('div');
            itemsContainer.className = "text-center";
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = `p-2 px-3 m-1 rounded-md cursor-pointer inline-block font-semibold border transition-colors ${
                    usedCategories.has(cat)
                        ? 'bg-gray-200 text-gray-400 opacity-70 cursor-not-allowed'
                        : 'bg-sky-200 text-sky-800 hover:bg-sky-300'
                }`;
                itemDiv.textContent = item;
                itemDiv.onclick = () => handlePlace(item, cat);
                itemsContainer.appendChild(itemDiv);
            });
            colDiv.appendChild(itemsContainer);
            columnsGrid.appendChild(colDiv);
        });

        // Buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = "mt-6 flex justify-center items-center space-x-4 flex-wrap gap-2";
        
        const checkButton = Button({ onClick: checkAnswer, disabled: state.feedback === 'correct', children: 'Tekshirish'});
        buttonContainer.appendChild(checkButton);

        // Skip Button
        if (state.feedback !== 'correct') {
            const skipButton = document.createElement('button');
            skipButton.className = "text-gray-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400";
            skipButton.textContent = "O'tkazib yuborish";
            skipButton.onclick = handleSkip;
            buttonContainer.appendChild(skipButton);
        }

        if (state.feedback === 'correct') {
            const nextButton = Button({ onClick: nextPrompt, className: 'bg-green-600 hover:bg-green-700', children: 'Keyingisi'});
            buttonContainer.appendChild(nextButton);
        }
        
        mainContainer.append(promptDiv, placedBox, columnsGrid, buttonContainer);
    };

    const handlePlace = (item: string, category: string) => {
        const usedCategories = new Set(state.placed.map(p => p.category));
        if (!usedCategories.has(category)) {
            state.placed.push({ item, category });
            render();
        }
    };

    const handleReturn = (itemIndex: number) => {
        state.placed = state.placed.filter((_, idx) => idx !== itemIndex);
        state.feedback = 'unanswered';
        render();
    };

    const checkAnswer = () => {
        const userAnswer = state.placed.map(p => p.item).join(' ').toLowerCase();
        // Remove punctuation for comparison
        const cleanUserAnswer = userAnswer.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
        const cleanCorrectAnswer = prompts[state.index].correctAnswer.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");

        if (cleanUserAnswer === cleanCorrectAnswer) {
            state.feedback = 'correct';
            if (state.index === prompts.length - 1) {
                setTimeout(() => {
                    state.completed = true;
                    render();
                }, 1000);
            }
        } else {
            state.feedback = 'incorrect';
        }
        render();
    };
    
    const nextPrompt = () => {
        if (state.index < prompts.length - 1) {
            state.index++;
            state.placed = [];
            state.feedback = 'unanswered';
            state.currentOptions = null; // Reset options for the new prompt
            render();
        } else {
            state.completed = true;
            render();
        }
    };

    const handleSkip = () => {
        nextPrompt();
    };

    render();

    return Section({
        title: "Mashq 3: Gap Quruvchi",
        description: "Tarjimaga mos gapni qismlarni bosish orqali yig'ing.",
        children: mainContainer,
    });
};