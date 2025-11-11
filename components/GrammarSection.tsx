interface GrammarRule {
    title: string;
    structure: string;
    example: string | HTMLElement;
    color: 'green' | 'red' | 'sky';
}

interface GrammarSectionProps {
    title: string;
    description: string;
    rules: GrammarRule[];
}

export const GrammarSection = ({ title, description, rules }: GrammarSectionProps): HTMLElement => {
    const colorClasses = {
        green: 'text-green-700',
        red: 'text-red-700',
        sky: 'text-sky-700',
    };

    const section = document.createElement('section');
    section.className = "my-12 p-6 bg-blue-50 rounded-xl shadow-lg border border-blue-200";

    section.innerHTML = `
        <h2 class="text-3xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-6">${title}</h2>
        <p class="text-gray-700 mb-6">${description}</p>
    `;

    const grid = document.createElement('div');
    grid.className = `grid grid-cols-1 md:grid-cols-${rules.length > 1 ? rules.length : 2} gap-6 text-center`;

    rules.forEach(rule => {
        const ruleDiv = document.createElement('div');
        ruleDiv.className = "bg-white p-4 rounded-lg border border-gray-200";

        const h3 = document.createElement('h3');
        h3.className = `text-xl font-bold ${colorClasses[rule.color]} mb-2`;
        h3.textContent = rule.title;

        const structureP = document.createElement('p');
        structureP.className = "font-semibold text-gray-600 mb-3";
        structureP.innerHTML = `<code class="bg-gray-200 p-1 rounded">${rule.structure}</code>`;
        
        const exampleP = document.createElement('p');
        exampleP.className = "text-gray-800";
        if (typeof rule.example === 'string') {
            exampleP.innerHTML = rule.example;
        } else {
            exampleP.appendChild(rule.example);
        }

        ruleDiv.append(h3, structureP, exampleP);
        grid.appendChild(ruleDiv);
    });

    section.appendChild(grid);
    return section;
};
