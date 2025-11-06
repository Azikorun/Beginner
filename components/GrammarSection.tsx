
import React from 'react';

interface GrammarRule {
    title: string;
    structure: string;
    example: React.ReactNode;
    color: 'green' | 'red' | 'sky';
}

interface GrammarSectionProps {
    title: string;
    description: string;
    rules: GrammarRule[];
}

const GrammarSection: React.FC<GrammarSectionProps> = ({ title, description, rules }) => {
    const colorClasses = {
        green: 'text-green-700',
        red: 'text-red-700',
        sky: 'text-sky-700',
    };

    return (
        <section className="my-12 p-6 bg-blue-50 rounded-xl shadow-lg border border-blue-200">
            <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-6">{title}</h2>
            <p className="text-gray-700 mb-6">{description}</p>
            <div className={`grid grid-cols-1 md:grid-cols-${rules.length > 1 ? rules.length : 2} gap-6 text-center`}>
                {rules.map(rule => (
                    <div key={rule.title} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className={`text-xl font-bold ${colorClasses[rule.color]} mb-2`}>{rule.title}</h3>
                        <p className="font-semibold text-gray-600 mb-3"><code className="bg-gray-200 p-1 rounded">{rule.structure}</code></p>
                        <p className="text-gray-800">{rule.example}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GrammarSection;
