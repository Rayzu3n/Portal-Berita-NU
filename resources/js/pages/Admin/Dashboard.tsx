import { NewsStatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, StatCard } from "@/components/ui/Card";
import AdminLayout from "@/layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";

type LatestNewsItem = { id: number; title: string; status: "draft" | "published"; created_at: string; category: { id: number; name: string } | null };
type Activity = { id: number; title: string; status: "draft" | "published"; updated_at: string; user: { name: string } | null };
type DashboardProps = { stats: { totalNews: number; publishedNews: number; draftNews: number; totalResidents: number }; latestNews: LatestNewsItem[]; recentActivity: Activity[] };

const time = (value: string) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));

export default function Dashboard({ stats, latestNews, recentActivity }: DashboardProps) {
    const { props } = usePage();
    const firstName = props.auth.user.name.split(" ")[0];
    return <AdminLayout>
        <Head title="Dashboard" />
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Admin overview</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Halo, {firstName}</h1><p className="mt-1 text-sm text-muted-foreground">Ringkasan konten dan data warga NU di portal.</p></div>
            <Link href="/admin/berita/create" className="inline-flex w-fit items-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-95">+ Tulis Berita</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4"><StatCard label="Total Berita" value={stats.totalNews} /><StatCard label="Berita Terbit" value={stats.publishedNews} /><StatCard label="Draf Berita" value={stats.draftNews} /><StatCard label="Total Warga NU" value={stats.totalResidents} /></div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
            <Card><CardHeader><CardTitle>Berita Terbaru</CardTitle><Link href="/admin/berita" className="text-sm font-semibold text-primary hover:underline">Lihat semua</Link></CardHeader><CardContent className="p-0">{latestNews.length === 0 ? <div className="px-6 py-10 text-center"><p className="font-semibold text-ink">Belum ada berita</p><p className="mt-1 text-sm text-muted-foreground">Mulai dengan menambahkan berita pertama.</p></div> : <ul className="divide-y divide-border">{latestNews.map((news) => <li key={news.id} className="flex items-center justify-between gap-4 px-6 py-4"><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{news.title}</p><p className="mt-1 text-xs text-muted-foreground">{news.category?.name ?? "Tanpa kategori"}</p></div><NewsStatusBadge status={news.status} /></li>)}</ul>}</CardContent></Card>
            <Card><CardHeader><CardTitle>Aksi Cepat</CardTitle></CardHeader><CardContent className="space-y-2"><Link href="/admin/berita/create" className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"><span>Tambah berita</span><span>→</span></Link><Link href="/admin/warga/create" className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"><span>Tambah warga NU</span><span>→</span></Link><Link href="/" className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"><span>Lihat website publik</span><span>↗</span></Link></CardContent></Card>
        </div>
        <Card className="mt-6"><CardHeader><CardTitle>Aktivitas Terbaru</CardTitle></CardHeader><CardContent className="p-0">{recentActivity.length === 0 ? <p className="px-6 py-8 text-center text-sm text-muted-foreground">Belum ada aktivitas.</p> : <ul className="divide-y divide-border">{recentActivity.map((activity) => <li key={activity.id} className="flex items-center justify-between gap-4 px-6 py-4"><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{activity.title}</p><p className="mt-1 text-xs text-muted-foreground">Diperbarui oleh {activity.user?.name ?? "Admin"} · {time(activity.updated_at)}</p></div><NewsStatusBadge status={activity.status} /></li>)}</ul>}</CardContent></Card>
    </AdminLayout>;
}
