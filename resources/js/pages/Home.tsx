import { Head, Link } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
    slug: string;
};

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image_url: string | null;
    published_at: string | null;
    category: Category | null;
    user?: { name: string } | null;
};

type Props = {
    featured: NewsItem | null;
    latest: NewsItem[];
    categories: Category[];
};

const formatDate = (value: string | null) =>
    value
        ? new Intl.DateTimeFormat('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
          }).format(new Date(value))
        : 'Baru saja';

const placeholder = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80';

function ArrowUpRight() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

export default function Home({ featured, latest, categories }: Props) {
    return (
        <>
            <Head title="Portal Berita NU Desa" />
            <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
                <header className="sticky top-0 z-30 border-b border-[var(--color-border)]/80 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                        <Link href="/" className="flex items-center gap-3" aria-label="Portal Berita NU Desa">
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-primary)] text-lg font-black text-white shadow-sm">NU</span>
                            <span className="hidden sm:block">
                                <span className="block text-[15px] font-bold tracking-tight">Portal Berita NU</span>
                                <span className="block text-xs text-[var(--color-muted-foreground)]">Desa • Informasi Warga</span>
                            </span>
                        </Link>

                        <nav className="hidden items-center gap-7 md:flex">
                            <Link href="/" className="text-sm font-semibold text-[var(--color-primary)]">Beranda</Link>
                            <a href="#berita" className="text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">Berita</a>
                            <a href="#kategori" className="text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">Kategori</a>
                            <a href="#tentang" className="text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">Tentang Desa</a>
                        </nav>

                        <button className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] bg-white text-slate-600 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]" aria-label="Cari berita">
                            <SearchIcon />
                        </button>
                    </div>
                </header>

                <main>
                    <section className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-10 lg:pt-16">
                        <div className="mb-7 flex items-end justify-between gap-6">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-info)]/45 px-3 py-1.5 text-xs font-bold text-[var(--color-info-foreground)]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                                    Kabar Desa Terkini
                                </div>
                                <h1 className="max-w-3xl text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-[48px] lg:leading-[1.08]">Informasi desa, langsung dari sumbernya.</h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted-foreground)] sm:text-lg">Berita, kegiatan, dan cerita warga dalam satu ruang informasi yang mudah diakses.</p>
                            </div>
                        </div>

                        {featured && (
                            <article className="group grid overflow-hidden rounded-[28px] bg-[var(--color-primary)] shadow-[var(--shadow-card)] lg:grid-cols-[1.08fr_.92fr]">
                                <div className="relative min-h-[330px] overflow-hidden lg:min-h-[450px]">
                                    <img src={featured.cover_image_url ?? placeholder} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                                    <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 sm:bottom-7 sm:left-7">
                                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[var(--color-primary)]">Unggulan</span>
                                        {featured.category && <span className="rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">{featured.category.name}</span>}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-7 text-white sm:p-10 lg:p-12">
                                    <p className="text-sm font-medium text-white/65">{formatDate(featured.published_at)}</p>
                                    <h2 className="mt-4 text-2xl font-bold tracking-[-0.025em] sm:text-3xl lg:text-[38px] lg:leading-[1.15]">{featured.title}</h2>
                                    {featured.excerpt && <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/72 sm:text-base">{featured.excerpt}</p>}
                                    <Link href={`/berita/${featured.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-[var(--color-accent-foreground)] transition hover:brightness-95">
                                        Baca berita <ArrowUpRight />
                                    </Link>
                                </div>
                            </article>
                        )}
                    </section>

                    <section id="berita" className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                        <div className="mb-7 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold text-[var(--color-primary)]">Dari desa</p>
                                <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Berita terbaru</h2>
                            </div>
                            <span className="hidden rounded-full bg-[var(--color-muted)]/45 px-3 py-1.5 text-xs font-semibold text-[var(--color-muted-foreground)] sm:block">{latest.length} berita</span>
                        </div>

                        {latest.length > 0 ? (
                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {latest.map((item) => (
                                    <Link key={item.id} href={`/berita/${item.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                                        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-muted)]">
                                            <img src={item.cover_image_url ?? placeholder} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                                        </div>
                                        <div className="p-5 sm:p-6">
                                            <div className="flex items-center gap-2 text-xs font-semibold">
                                                {item.category && <span className="rounded-full bg-[var(--color-info)]/40 px-2.5 py-1 text-[var(--color-info-foreground)]">{item.category.name}</span>}
                                                <span className="text-[var(--color-muted-foreground)]">{formatDate(item.published_at)}</span>
                                            </div>
                                            <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-6 tracking-tight group-hover:text-[var(--color-primary)]">{item.title}</h3>
                                            {item.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-muted-foreground)]">{item.excerpt}</p>}
                                            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)]">Selengkapnya <ArrowUpRight /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl bg-white p-10 text-center shadow-[var(--shadow-card)]">
                                <p className="font-semibold">Belum ada berita yang dipublikasikan.</p>
                                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Berita terbaru akan muncul di sini.</p>
                            </div>
                        )}
                    </section>

                    <section id="kategori" className="border-y border-[var(--color-border)] bg-white">
                        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
                            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                                <div>
                                    <p className="text-sm font-bold text-[var(--color-primary)]">Jelajahi</p>
                                    <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Topik berita</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <span key={category.id} className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">{category.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer id="tentang" className="bg-[var(--color-ink)] text-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                        <div>
                            <p className="font-bold">Portal Berita NU Desa</p>
                            <p className="mt-1 text-sm text-white/55">Media informasi dan dokumentasi kegiatan desa.</p>
                        </div>
                        <p className="text-xs text-white/40">© {new Date().getFullYear()} Portal Berita NU Desa</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
