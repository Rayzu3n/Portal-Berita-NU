import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

/**
 * Button primitive.
 *
 * Shape/spacing language: Untitled UI (rounded-lg, 1px border on
 * non-filled variants, shadow-xs resting state, visible focus ring).
 *
 * Variant set: Material Design 3 (filled / tonal / outlined / text),
 * since those four cover every button role we need — primary action,
 * secondary emphasis, low-emphasis bordered, and plain link-like action —
 * without inventing a fifth ad-hoc variant per screen.
 */

const sizeClasses = {
    sm: 'h-9 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 px-5 text-base gap-2',
} as const;

const variantClasses = {
    filled: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover active:bg-primary-hover',
    tonal: 'bg-secondary/20 text-primary hover:bg-secondary/30 active:bg-secondary/40',
    outlined: 'border border-border bg-surface text-ink shadow-xs hover:bg-muted/40 active:bg-muted/60',
    text: 'text-primary hover:bg-primary/10 active:bg-primary/15',
    destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:opacity-90 active:opacity-80',
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variantClasses;
    size?: keyof typeof sizeClasses;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'filled', size = 'md', type = 'button', ...props }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                    'disabled:pointer-events-none disabled:opacity-40',
                    sizeClasses[size],
                    variantClasses[variant],
                    className,
                )}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';
