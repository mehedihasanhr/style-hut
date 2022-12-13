import * as React from 'react';

const TextArea: React.FC<
    React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >
> = ({ className, ...props }) => {
    return (
        <textarea
            className={`w-full h-32 px-4  bg-slate-100 py-3 rounded-lg resize-none focus:outline-none focus:border-primary-500 ${className}`}
            {...props}
        />
    );
};

export default TextArea;
