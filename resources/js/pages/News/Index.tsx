import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Category = { id: number; name: string; slug: string };
type NewsItem = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image_url: string | null;
    published_at: string | null;
    category: Category | null;
    user: { name: string } | null;
};
type Paginated<T> = { data: T[]; current_page: number; last_page: number; from: number | null; to: number | null; total: number; links: { url: string | null; label: string; active: boolean }[] };
type Props = { news: Paginated<NewsItem>; categories: Category[]; filters: { search: string; category: string } };

const placeholder = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80';
const date = (value: string | null) => value ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)) : 'Baru saja';

function SearchIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function Arrow() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

export default function Index({ news, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const submit = (event: FormEvent) => { event.preventDefault(); router.get('/berita', { search, category: filters.category || undefined }, { preserveState: true, replace: true }); };
    const filterCategory = (value: string) => router.get('/berita', { search: filters.search || undefined, category: value || undefined }, { preserveState: true, replace: true });

    return <>
        <Head title="Berita" />
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
            <header className="border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                    <Link href="/" className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-primary)] text-lg font-black text-white">NU</span><span className="hidden sm:block"><b className="block text-[15px]">Portal Berita NU</b><small className="text-xs text-[var(--color-muted-foreground)]">Desa • Informasi Warga</small></span></Link>
                    <nav className="hidden gap-7 md:flex"><Link href="/" className="text-sm font-medium text-slate-600 hover:text-[var(--color-primary)]">Beranda</Link><Link href="/berita" className="text-sm font-semibold text-[var(--color-primary)]">Berita</Link></nav>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
                <div className="max-w-3xl"><p className="text-sm font-bold text-[var(--color-primary)]">Pusat informasi</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.035em] sm:text-5xl">Semua berita desa</h1><p className="mt-4 text-base leading-7 text-[var(--color-muted-foreground)]">Temukan kabar terbaru, kegiatan, dan informasi yang dipublikasikan untuk warga.</p></div>
                <div className="mt-8 flex flex-col gap-3 lg:flex-row">
                    <form onSubmit={submit} className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-4 shadow-sm"><span className="text-slate-400"><SearchIcon /></span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"/><button className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:brightness-95">Cari</button></form>
                    <select value={filters.category ?? ''} onChange={(e) => filterCategory(e.target.value)} className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-primary)]"><option value="">Semua kategori</option>{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select>
                </div>
                <div className="mt-8 flex items-center justify-between"><p className="text-sm text-[var(--color-muted-foreground)]">Menampilkan <b className="text-[var(--color-ink)]">{news.from ?? 0}–{news.to ?? 0}</b> dari <b className="text-[var(--color-ink)]">{news.total}</b> berita</p>{filters.search && <button onClick={() => router.get('/berita')} className="text-sm font-bold text-[var(--color-primary)]">Reset pencarian</button>}</div>
                {news.data.length ? <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{news.data.map((item) => <Link key={item.id} href={`/berita/${item.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"><div className="aspect-[16/9] overflow-hidden bg-[var(--color-muted)]"><img src={item.cover_image_url ?? placeholder} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"/></div><div className="p-5 sm:p-6">{item.category && <span className="rounded-full bg-[var(--color-info)]/40 px-2.5 py-1 text-xs font-bold text-[var(--color-info-foreground)]">{item.category.name}</span>}<p className="mt-3 text-xs font-medium text-[var(--color-muted-foreground)]">{date(item.published_at)}</p><h2 className="mt-2 line-clamp-2 text-lg font-bold leading-6 tracking-tight group-hover:text-[var(--color-primary)]">{item.title}</h2>{item.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-muted-foreground)]">{item.excerpt}</p>}<span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)]">Baca berita <Arrow/></span></div></Link>)}</div> : <div className="mt-5 rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-card)]"><p className="font-bold">Berita tidak ditemukan</p><p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Coba kata kunci atau kategori yang berbeda.</p></div>}
                {news.last_page > 1 && <div className="mt-8 flex flex-wrap justify-center gap-2">{news.links.map((link, index) => link.url ? <Link key={index} href={link.url} preserveScroll className={`rounded-lg border px-3 py-2 text-sm font-semibold ${link.active ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-border)] bg-white text-slate-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`} dangerouslySetInnerHTML={{ __html: link.label }} /> : <span key={index} className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: link.label }} />)}</div>}
            </main>
            <footer className="mt-10 bg-[var(--color-ink)] text-white"><div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"><b>Portal Berita NU Desa</b><p className="mt-1 text-sm text-white/55">Media informasi dan dokumentasi kegiatan desa.</p></div></footer>
        </div>
    </>;
}
