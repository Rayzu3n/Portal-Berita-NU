import { cn } from '@/lib/utils';
import {
    forwardRef,
    type InputHTMLAttributes,
    type LabelHTMLAttributes,
    type SelectHTMLAttributes,
    type TextareaHTMLAttributes,
} from 'react';

const fieldBase = cn(
    'block w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink shadow-xs',
    'placeholder:text-muted-foreground',
    'transition-colors duration-150',
    'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
    'disabled:pointer-events-none disabled:opacity-40',
);

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => <input ref={ref} className={cn(fieldBase, className)} {...props} />,
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => <textarea ref={ref} className={cn(fieldBase, 'min-h-32 resize-y', className)} {...props} />,
);
Textarea.displayName = 'Textarea';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className, ...props }, ref) => <select ref={ref} className={cn(fieldBase, 'pr-8', className)} {...props} />,
);
Select.displayName = 'Select';

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className={cn('mb-1.5 block text-sm font-medium text-ink', className)} {...props} />;
}

/** Field error text, shown under an input when Inertia form.errors has an entry for it. */
export function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-1.5 text-sm text-destructive">{message}</p>;
}
