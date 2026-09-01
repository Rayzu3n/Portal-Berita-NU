import { NewsStatusBadge } from "@/components/ui/Badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    StatCard,
} from "@/components/ui/Card";
import AdminLayout from "@/layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";

type LatestNewsItem = {
    id: number;
    title: string;
    status: "draft" | "published";
    created_at: string;
    category: { id: number; name: string } | null;
};

type DashboardProps = {
    stats: {
        totalNews: number;
        publishedNews: number;
        draftNews: number;
        totalResidents: number;
    };
    latestNews: LatestNewsItem[];
};

export default function Dashboard({ stats, latestNews }: DashboardProps) {
    const { props } = usePage();
    const firstName = props.auth.user.name.split(" ")[0];

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h1 className="text-xl font-semibold text-ink">
                    Halo, {firstName}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Ringkasan konten dan data warga NU di portal.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="Total Berita" value={stats.totalNews} />
                <StatCard label="Berita Terbit" value={stats.publishedNews} />
                <StatCard label="Draf Berita" value={stats.draftNews} />
                <StatCard label="Total Warga NU" value={stats.totalResidents} />
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Berita Terbaru</CardTitle>
                    <Link
                        href="/admin/berita"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Lihat semua
                    </Link>
                </CardHeader>
                <CardContent className="p-0">
                    {latestNews.length === 0 ? (
                        <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                            Belum ada berita. Mulai dengan menambahkan berita
                            pertama.
                        </p>
                    ) : (
                        <ul className="divide-y divide-border">
                            {latestNews.map((news) => (
                                <li
                                    key={news.id}
                                    className="flex items-center justify-between gap-4 px-6 py-3"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-ink">
                                            {news.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {news.category?.name ??
                                                "Tanpa kategori"}
                                        </p>
                                    </div>
                                    <NewsStatusBadge status={news.status} />
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
