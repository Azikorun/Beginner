
import React, { useState } from 'react';
import { lessons } from './lessons';

const App: React.FC = () => {
    const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

    const handleSelectLesson = (id: string) => {
        setCurrentLessonId(id);
    };

    const handleGoBack = () => {
        setCurrentLessonId(null);
    };

    const CurrentLessonComponent = currentLessonId ? lessons.find(l => l.id === currentLessonId)?.component : null;

    return (
        <div className="min-h-screen bg-gray-100">
            {CurrentLessonComponent ? (
                <div>
                    <button 
                        onClick={handleGoBack}
                        className="sticky top-4 left-4 z-10 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 m-4"
                        aria-label="Back to lessons"
                    >
                        &larr; Barcha Darslar
                    </button>
                    <CurrentLessonComponent />
                </div>
            ) : (
                <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                    <header className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Interaktiv Ingliz Tili Darslari</h1>
                        <p className="mt-4 text-lg text-gray-600">O'rganishni boshlash uchun dars tanlang.</p>
                    </header>
                    <div className="grid md:grid-cols-2 gap-8">
                        {lessons.map(lesson => (
                            <div key={lesson.id} onClick={() => handleSelectLesson(lesson.id)} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-2" role="button" tabIndex={0}>
                                <h2 className="text-2xl font-bold text-gray-800">{lesson.title}</h2>
                                <p className="mt-2 text-gray-600">{lesson.description}</p>
                                <div className="mt-6 text-right font-bold text-blue-600 group-hover:text-blue-800">
                                    Boshlash &rarr;
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            )}
        </div>
    );
};

export default App;
