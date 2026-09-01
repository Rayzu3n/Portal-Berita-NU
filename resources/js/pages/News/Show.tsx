import { Head, Link } from '@inertiajs/react';

type NewsItem = {
    title: string;
    excerpt: string | null;
    content: string;
    cover_image_url: string | null;
    published_at: string | null;
    category: { name: string } | null;
    user: { name: string } | null;
};

const formatDate = (value: string | null) =>
    value
        ? new Intl.DateTimeFormat('id-ID', {
              dateStyle: 'long',
          }).format(new Date(value))
        : 'Baru saja';

export default function Show({ news }: { news: NewsItem }) {
    return (
        <>
            <Head title={news.title} />
            <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
                <header className="border-b border-[var(--color-border)] bg-white">
                    <div className="mx-auto flex h-[76px] max-w-5xl items-center justify-between px-5 sm:px-8">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-primary)] text-sm font-black text-white">NU</span>
                            <span className="text-sm font-bold">Portal Berita NU</span>
                        </Link>
                        <Link href="/" className="text-sm font-semibold text-[var(--color-primary)]">← Kembali</Link>
                    </div>
                </header>

                <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
                    <div className="mx-auto max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                            {news.category && <span className="rounded-full bg-[var(--color-info)]/45 px-3 py-1.5 text-[var(--color-info-foreground)]">{news.category.name}</span>}
                            <span className="text-[var(--color-muted-foreground)]">{formatDate(news.published_at)}</span>
                        </div>
                        <h1 className="mt-5 text-3xl font-bold tracking-[-0.035em] sm:text-5xl sm:leading-[1.08]">{news.title}</h1>
                        {news.excerpt && <p className="mt-5 text-lg leading-8 text-[var(--color-muted-foreground)]">{news.excerpt}</p>}
                        <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">Ditulis oleh {news.user?.name ?? 'Redaksi Desa'}</p>
                    </div>

                    {news.cover_image_url && (
                        <img src={news.cover_image_url} alt="" className="mt-10 aspect-[16/8] w-full rounded-[28px] object-cover shadow-[var(--shadow-card)]" />
                    )}

                    <article className="prose prose-slate mx-auto mt-10 max-w-3xl text-[16px] leading-8">
                        {news.content.split(/\n+/).map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </article>
                </main>
            </div>
        </>
    );
}
