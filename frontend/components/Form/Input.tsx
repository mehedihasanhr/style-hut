import React, { forwardRef } from 'react';

const InputComponent: React.ForwardRefRenderFunction<
    HTMLInputElement | undefined,
    React.InputHTMLAttributes<HTMLInputElement>
> = ({ className, ...props }, ref) => {
    const defaultClassName =
        'w-full px-4 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';

    return (
        <input
            className={`${defaultClassName} ${className}`}
            {...props}
            ref={ref as any}
        />
    );
};

// export input component
const Input = forwardRef<
    HTMLInputElement | undefined,
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
>(InputComponent) as React.FC<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
>;

export default Input;
