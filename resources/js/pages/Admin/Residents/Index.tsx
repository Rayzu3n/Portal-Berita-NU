import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

type ResidentRow = {
    id: number;
    full_name: string;
    phone: string | null;
    position: string | null;
    organization: string | null;
    status: string;
};

type PaginatedResidents = {
    data: ResidentRow[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
};

export default function Index({ residents }: { residents: PaginatedResidents }) {
    const handleDelete = (item: ResidentRow) => {
        if (!confirm(`Hapus data "${item.full_name}"? Tindakan ini tidak bisa dibatalkan.`)) {
            return;
        }
        router.delete(`/admin/warga/${item.id}`);
    };

    return (
        <AdminLayout>
            <Head title="Warga NU" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-ink">Warga NU</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {residents.total} warga terdata.
                    </p>
                </div>
                <Link href="/admin/warga/create">
                    <Button>Tambah Warga</Button>
                </Link>
            </div>

            <Card className="overflow-hidden p-0">
                {residents.data.length === 0 ? (
                    <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                        Belum ada data warga. Klik "Tambah Warga" untuk mulai mencatat.
                    </p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-border bg-muted/30 text-xs text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Nama</th>
                                <th className="px-6 py-3 font-medium">Jabatan</th>
                                <th className="px-6 py-3 font-medium">Organisasi</th>
                                <th className="px-6 py-3 font-medium">No. Telepon</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {residents.data.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-3 font-medium text-ink">
                                        <Link href={`/admin/warga/${item.id}`} className="hover:underline">
                                            {item.full_name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">{item.position ?? '—'}</td>
                                    <td className="px-6 py-3 text-muted-foreground">{item.organization ?? '—'}</td>
                                    <td className="px-6 py-3 text-muted-foreground">{item.phone ?? '—'}</td>
                                    <td className="px-6 py-3">
                                        <Badge tone={item.status === 'active' ? 'success' : 'neutral'}>
                                            {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/warga/${item.id}/edit`}
                                                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item)}
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

            {residents.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {residents.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            preserveScroll
                            className={
                                'rounded-lg px-3 py-1.5 text-sm ' +
                                (link.active
                                    ? 'bg-primary text-primary-foreground'
                                    : link.url
                                      ? 'text-muted-foreground hover:bg-muted/50'
                                      : 'pointer-events-none text-muted-foreground/40')
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
