import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

/**
 * Badge primitive — Untitled UI pill-chip shape (rounded-full, px-2.5,
 * 1px inset border via ring, text-xs font-medium) used for:
 * - news status (draft / published)
 * - category chips on news cards
 */

const toneClasses = {
    neutral: 'bg-muted text-muted-foreground ring-border',
    primary: 'bg-primary/10 text-primary ring-primary/20',
    info: 'bg-info/25 text-info-foreground ring-info/40',
    success: 'bg-success/10 text-success ring-success/25',
    warning: 'bg-warning/10 text-warning ring-warning/25',
    destructive: 'bg-destructive/10 text-destructive ring-destructive/25',
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: keyof typeof toneClasses;
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                toneClasses[tone],
                className,
            )}
            {...props}
        />
    );
}

/** Maps a News `status` column value straight to the right badge tone + label. */
export function NewsStatusBadge({ status }: { status: 'draft' | 'published' }) {
    if (status === 'published') {
        return <Badge tone="success">Terbit</Badge>;
    }
    return <Badge tone="neutral">Draf</Badge>;
}
