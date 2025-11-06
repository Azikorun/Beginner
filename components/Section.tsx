
import React from 'react';

interface SectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => (
    <div className="my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600 mb-6">{description}</p>
        {children}
    </div>
);

export default Section;
