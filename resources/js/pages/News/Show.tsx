import { Head, Link } from '@inertiajs/react';

type Category = { id?: number; name: string; slug?: string };
type NewsItem = {
    id: number;
    title: string;
    slug?: string;
    excerpt?: string | null;
    content: string;
    cover_image_url: string | null;
    published_at: string | null;
    category: Category | null;
    user: { name: string } | null;
};

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(value)) : 'Baru saja';
const placeholder = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80';

function ShareIcon({ type }: { type: 'copy' | 'whatsapp' }) {
    return type === 'copy' ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 9h8a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M15 15H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> : <span className="text-sm font-black">WA</span>;
}

export default function Show({ news, related = [] }: { news: NewsItem; related?: NewsItem[] }) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const copyLink = async () => { try { await navigator.clipboard.writeText(shareUrl); } catch {} };

    return <>
        <Head title={news.title} />
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
            <header className="border-b border-[var(--color-border)] bg-white"><div className="mx-auto flex h-[76px] max-w-5xl items-center justify-between px-5 sm:px-8"><Link href="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-primary)] text-sm font-black text-white">NU</span><span className="text-sm font-bold">Portal Berita NU</span></Link><Link href="/berita" className="text-sm font-semibold text-[var(--color-primary)]">← Semua berita</Link></div></header>
            <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
                <div className="mx-auto max-w-3xl"><div className="flex flex-wrap items-center gap-2 text-xs font-semibold">{news.category && <span className="rounded-full bg-[var(--color-info)]/45 px-3 py-1.5 text-[var(--color-info-foreground)]">{news.category.name}</span>}<span className="text-[var(--color-muted-foreground)]">{formatDate(news.published_at)}</span></div><h1 className="mt-5 text-3xl font-bold tracking-[-0.035em] sm:text-5xl sm:leading-[1.08]">{news.title}</h1>{news.excerpt && <p className="mt-5 text-lg leading-8 text-[var(--color-muted-foreground)]">{news.excerpt}</p>}<p className="mt-4 text-sm text-[var(--color-muted-foreground)]">Ditulis oleh {news.user?.name ?? 'Redaksi Desa'}</p></div>
                <img src={news.cover_image_url ?? placeholder} alt="" className="mt-10 aspect-[16/8] w-full rounded-[28px] object-cover shadow-[var(--shadow-card)]" />
                <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center gap-2 border-y border-[var(--color-border)] py-4"><span className="mr-2 text-sm font-semibold">Bagikan</span><a href={`https://wa.me/?text=${encodeURIComponent(`${news.title} ${shareUrl}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-bold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"><ShareIcon type="whatsapp"/> WhatsApp</a><button onClick={copyLink} className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-bold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"><ShareIcon type="copy"/> Salin tautan</button></div>
                <article className="prose prose-slate mx-auto mt-10 max-w-3xl text-[16px] leading-8">{news.content.split(/\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>
                {related.length > 0 && <section className="mx-auto mt-14 max-w-5xl border-t border-[var(--color-border)] pt-10"><div className="mb-6"><p className="text-sm font-bold text-[var(--color-primary)]">Lanjut membaca</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Berita terkait</h2></div><div className="grid gap-5 md:grid-cols-3">{related.map((item) => <Link key={item.id} href={`/berita/${item.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"><img src={item.cover_image_url ?? placeholder} alt="" className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.02]"/><div className="p-5">{item.category && <span className="text-xs font-bold text-[var(--color-primary)]">{item.category.name}</span>}<h3 className="mt-2 line-clamp-2 font-bold leading-6 group-hover:text-[var(--color-primary)]">{item.title}</h3><p className="mt-3 text-xs text-[var(--color-muted-foreground)]">{formatDate(item.published_at)}</p></div></Link>)}</div></section>}
            </main>
        </div>
    </>;
}
