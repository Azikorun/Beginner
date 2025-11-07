import React from 'react';

const StopIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "h-6 w-6"} fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
    </svg>
);

export default StopIcon;
