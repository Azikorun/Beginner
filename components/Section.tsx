interface SectionProps {
    title: string;
    description: string;
    children: HTMLElement | DocumentFragment;
}

export const Section = ({ title, description, children }: SectionProps): HTMLElement => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = "my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200";

    const h3 = document.createElement('h3');
    h3.className = "text-2xl font-bold text-gray-800";
    h3.textContent = title;

    const p = document.createElement('p');
    p.className = "mt-2 text-gray-600 mb-6";
    p.textContent = description;

    sectionDiv.appendChild(h3);
    sectionDiv.appendChild(p);
    sectionDiv.appendChild(children);

    return sectionDiv;
};
