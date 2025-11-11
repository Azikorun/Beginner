import { ClickerPuzzle } from '../types';
import { Button } from './Button';
import { Section } from './Section';

type FeedbackStatus = 'unanswered' | 'correct' | 'incorrect';

interface PuzzleState {
    available: string[];
    placed: string[];
    feedback: FeedbackStatus;
}

export const ClickToPlaceExercise = ({ puzzles }: { puzzles: ClickerPuzzle[] }): HTMLElement => {
    
    let state: Record<string, PuzzleState> = {};
    const availableContainers: Record<string, HTMLElement> = {};
    const placedContainers: Record<string, HTMLElement> = {};
    let totalFeedbackDiv: HTMLElement;

    const getInitialState = () => puzzles.reduce((acc, p) => ({
        ...acc,
        [p.id]: { available: [...p.chunks], placed: [], feedback: 'unanswered' }
    }), {});

    const renderPuzzleState = (puzzleId: string) => {
        const puzzleState = state[puzzleId];
        const availableContainer = availableContainers[puzzleId];
        const placedContainer = placedContainers[puzzleId];
        
        // Render available chunks
        availableContainer.innerHTML = '';
        puzzleState.available.forEach(chunk => {
            const chunkDiv = document.createElement('div');
            chunkDiv.className = "bg-yellow-400 text-gray-800 p-2 px-4 m-1 rounded-md cursor-pointer inline-block font-semibold hover:bg-yellow-500 hover:scale-105 transition-transform";
            chunkDiv.textContent = chunk;
            chunkDiv.onclick = () => handlePlace(puzzleId, chunk);
            availableContainer.appendChild(chunkDiv);
        });

        // Render placed chunks
        placedContainer.innerHTML = '';
        if (puzzleState.placed.length === 0) {
            placedContainer.innerHTML = `<span class="text-gray-400">Javobingiz shu yerda paydo bo'ladi</span>`;
        } else {
            puzzleState.placed.forEach((chunk, index) => {
                const chunkDiv = document.createElement('div');
                chunkDiv.className = "bg-blue-200 text-blue-800 p-2 px-4 m-1 rounded-md cursor-pointer inline-block font-semibold hover:bg-red-200 hover:text-red-800 hover:line-through";
                chunkDiv.textContent = chunk;
                chunkDiv.onclick = () => handleReturn(puzzleId, chunk, index);
                placedContainer.appendChild(chunkDiv);
            });
        }

        // Update feedback styles
        const feedbackClass = 
            puzzleState.feedback === 'correct' ? 'border-green-500 bg-green-50' :
            puzzleState.feedback === 'incorrect' ? 'border-red-500 bg-red-50' :
            'border-blue-500 bg-gray-50';
        placedContainer.className = `p-4 border-2 border-dashed rounded-lg min-h-[60px] flex flex-wrap items-center transition-colors ${feedbackClass}`;
    };

    const handlePlace = (puzzleId: string, chunk: string) => {
        const puzzleState = state[puzzleId];
        puzzleState.available = puzzleState.available.filter(c => c !== chunk);
        puzzleState.placed.push(chunk);
        renderPuzzleState(puzzleId);
    };
    
    const handleReturn = (puzzleId: string, chunk: string, index: number) => {
        const puzzleState = state[puzzleId];
        puzzleState.placed.splice(index, 1);
        puzzleState.available.push(chunk);
        renderPuzzleState(puzzleId);
    };

    const checkAnswers = () => {
        let correctCount = 0;
        puzzles.forEach(p => {
            const userAnswer = state[p.id].placed.join(' ').toLowerCase();
            if (userAnswer === p.correctAnswer) {
                state[p.id].feedback = 'correct';
                correctCount++;
            } else {
                state[p.id].feedback = 'incorrect';
            }
            renderPuzzleState(p.id);
        });
        const feedbackText = `Natija: ${correctCount} / ${puzzles.length} to'g'ri.`;
        totalFeedbackDiv.textContent = feedbackText;
        totalFeedbackDiv.className = `mt-4 p-3 text-center rounded-md font-bold ${correctCount <= 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`;
        totalFeedbackDiv.style.display = 'block';
    };

    const reset = () => {
        state = getInitialState();
        puzzles.forEach(p => renderPuzzleState(p.id));
        totalFeedbackDiv.style.display = 'none';
    };

    const fragment = document.createDocumentFragment();
    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'space-y-8';
    
    puzzles.forEach(p => {
        const puzzleDiv = document.createElement('div');
        
        const availableContainer = document.createElement('div');
        availableContainer.className = "bg-gray-100 p-3 rounded-lg mb-3 text-center min-h-[60px]";
        availableContainers[p.id] = availableContainer;

        const placedContainer = document.createElement('div');
        placedContainers[p.id] = placedContainer;

        puzzleDiv.append(availableContainer, placedContainer);
        puzzleContainer.appendChild(puzzleDiv);
    });

    fragment.appendChild(puzzleContainer);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = "mt-6 flex justify-center space-x-4";
    const checkButton = Button({ onClick: checkAnswers, children: 'Tekshirish' });
    const resetButton = document.createElement('button');
    resetButton.className = "bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all";
    resetButton.textContent = "Qayta Boshlash";
    resetButton.onclick = reset;
    buttonContainer.append(checkButton, resetButton);
    fragment.appendChild(buttonContainer);

    totalFeedbackDiv = document.createElement('div');
    totalFeedbackDiv.style.display = 'none';
    fragment.appendChild(totalFeedbackDiv);

    reset(); // Initial render

    return Section({
        title: "Mashq 2: Qismlardan Gap Yig'ing",
        description: "To'g'ri gap hosil qilish uchun kerakli so'z bo'laklarini bosing. Xatoni tuzatish uchun javob qatoridagi so'zga bosing.",
        children: fragment,
    });
};
