import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

/**
 * Card primitive — Untitled UI surface treatment: white surface on the
 * off-white page background, rounded-xl, hairline border PLUS a soft
 * ambient shadow (--shadow-card) instead of either alone. One radius
 * scale for every card in the app; don't override per-instance.
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'rounded-xl border border-border bg-surface',
                'shadow-[var(--shadow-card)]',
                className,
            )}
            {...props}
        />
    );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('flex items-center justify-between gap-4 border-b border-border px-6 py-4', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn('text-sm font-semibold text-ink', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('px-6 py-4', className)} {...props} />;
}

/** Dashboard statistic card: big number + label, per PRD §5 "Statistic cards". */
export function StatCard({
    label,
    value,
    className,
}: {
    label: string;
    value: string | number;
    className?: string;
}) {
    return (
        <Card className={cn('px-6 py-5', className)}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
        </Card>
    );
}
