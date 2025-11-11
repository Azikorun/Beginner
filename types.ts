export interface VocabularyItem {
    english: string;
    uzbek: string;
}

export interface VocabularyCategory {
    title: string;
    items: VocabularyItem[];
}

export interface MatchingQuestion {
    id: string;
    question: string;
    options: { value: string; label: string; }[];
    correctAnswer: string;
}

export interface ClickerPuzzle {
    id: string;
    chunks: string[];
    correctAnswer: string;
}

export interface SentenceBuilderPrompt {
    id: string;
    prompt: string;
    correctAnswer: string;
}

export interface SentenceBuilderColumn {
    title: string;
    items: string[];
}

export interface SentenceBuilderColumns {
    [key: string]: SentenceBuilderColumn;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    component: (container: HTMLElement) => void;
}

export interface TranscriptEntry {
    speaker: 'user' | 'model' | 'system';
    text: string;
}
