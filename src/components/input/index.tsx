import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorMessage?: string;
}

export function Input(props: InputProps) {
    return (
        <div className="flex flex-col">
            <input
                className={`
                w-full h-9 rounded-md outline-none px-2 bg-white
                ${props.error
                        ? 'border-2 border-red-700'
                        : 'border-0'}
                `}
                {...props}
            />

            {props.error &&
                <p className="text-red-600 text-sm mt-1">
                    {props.errorMessage}
                </p>
            }
        </div>
    )
}