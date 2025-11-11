import { MatchingQuestion } from '../types';
import { Button } from './Button';
import { Section } from './Section';

export const MatchingExercise = ({ questions }: { questions: MatchingQuestion[] }): HTMLElement => {
    const state = {
        answers: {} as Record<string, string>,
    };

    const selectElements: Record<string, HTMLSelectElement> = {};

    const getFeedbackClasses = (status?: 'correct' | 'incorrect') => {
        if (status === 'correct') return 'border-green-500 ring-2 ring-green-200';
        if (status === 'incorrect') return 'border-red-500 ring-2 ring-red-200';
        return 'border-gray-300';
    };

    const fragment = document.createDocumentFragment();
    const questionsContainer = document.createElement('div');
    questionsContainer.className = "space-y-4";
    fragment.appendChild(questionsContainer);
    
    questions.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = "flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-50 rounded-lg";
        
        const questionText = document.createElement('span');
        questionText.className = "font-medium text-gray-700 mb-2 sm:mb-0";
        questionText.textContent = q.question;
        
        const select = document.createElement('select');
        select.className = `p-2 border rounded-md w-full sm:w-52 transition-all duration-200 ${getFeedbackClasses()}`;
        select.innerHTML = `<option value="" disabled selected>Tanlang...</option>` + 
            q.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
        
        select.onchange = (e) => {
            state.answers[q.id] = (e.target as HTMLSelectElement).value;
        };

        selectElements[q.id] = select;
        questionDiv.append(questionText, select);
        questionsContainer.appendChild(questionDiv);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.className = "mt-6 text-center";
    fragment.appendChild(buttonContainer);

    const totalFeedbackDiv = document.createElement('div');
    totalFeedbackDiv.className = 'mt-4 p-3 text-center rounded-md font-bold';
    totalFeedbackDiv.style.display = 'none';
    fragment.appendChild(totalFeedbackDiv);

    const checkAnswers = () => {
        let correctCount = 0;
        questions.forEach(q => {
            const isCorrect = state.answers[q.id] === q.correctAnswer;
            const selectEl = selectElements[q.id];
            selectEl.className = `p-2 border rounded-md w-full sm:w-52 transition-all duration-200 ${getFeedbackClasses(isCorrect ? 'correct' : 'incorrect')}`;
            if (isCorrect) correctCount++;
        });

        totalFeedbackDiv.textContent = `Natija: ${correctCount} / ${questions.length} to'g'ri.`;
        totalFeedbackDiv.className = `mt-4 p-3 text-center rounded-md font-bold ${correctCount <= 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`;
        totalFeedbackDiv.style.display = 'block';
    };

    const checkButton = Button({ onClick: checkAnswers, children: 'Tekshirish' });
    buttonContainer.appendChild(checkButton);

    return Section({
        title: "Mashq 1: Harakatni Joy bilan Moslang",
        description: "Har bir ish-harakat uchun eng mos joyni tanlang.",
        children: fragment,
    });
};
