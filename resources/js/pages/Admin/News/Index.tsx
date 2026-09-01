import { Button } from "@/components/ui/Button";
import { NewsStatusBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import AdminLayout from "@/layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";

type NewsRow = {
    id: number;
    title: string;
    status: "draft" | "published";
    created_at: string;
    cover_image_url: string | null;
    category: { id: number; name: string } | null;
    user: { id: number; name: string } | null;
};

type PaginatedNews = {
    data: NewsRow[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function Index({ news }: { news: PaginatedNews }) {
    const handleDelete = (item: NewsRow) => {
        if (
            !confirm(
                `Hapus berita "${item.title}"? Tindakan ini tidak bisa dibatalkan.`,
            )
        ) {
            return;
        }
        router.delete(`/admin/berita/${item.id}`);
    };

    return (
        <AdminLayout>
            <Head title="Berita" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-ink">Berita</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {news.total} berita total.
                    </p>
                </div>
                <Link href="/admin/berita/create">
                    <Button>Tambah Berita</Button>
                </Link>
            </div>

            <Card className="overflow-hidden p-0">
                {news.data.length === 0 ? (
                    <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                        Belum ada berita. Klik "Tambah Berita" untuk mulai
                        menulis.
                    </p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-border bg-muted/30 text-xs text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Cover</th>
                                <th className="px-6 py-3 font-medium">Judul</th>
                                <th className="px-6 py-3 font-medium">
                                    Kategori
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Penulis
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Tanggal
                                </th>
                                <th className="px-6 py-3 font-medium text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {news.data.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-3">
                                        {item.cover_image_url ? (
                                            <img
                                                src={item.cover_image_url}
                                                alt={item.title}
                                                className="h-14 w-20 rounded-md object-cover ring-1 ring-border"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-20 items-center justify-center rounded-md bg-muted text-[10px] text-muted-foreground ring-1 ring-border">
                                                No image
                                            </div>
                                        )}
                                    </td>
                                    <td className="max-w-xs truncate px-6 py-3 font-medium text-ink">
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">
                                        {item.category?.name ?? "—"}
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">
                                        {item.user?.name ?? "—"}
                                    </td>
                                    <td className="px-6 py-3">
                                        <NewsStatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">
                                        {formatDate(item.created_at)}
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/berita/${item.id}/edit`}
                                                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>

            {news.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {news.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? "#"}
                            preserveScroll
                            className={
                                "rounded-lg px-3 py-1.5 text-sm " +
                                (link.active
                                    ? "bg-primary text-primary-foreground"
                                    : link.url
                                      ? "text-muted-foreground hover:bg-muted/50"
                                      : "pointer-events-none text-muted-foreground/40")
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
