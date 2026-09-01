import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

type Resident = {
    id: number;
    full_name: string;
    nik: string | null;
    gender: 'male' | 'female' | null;
    address: string | null;
    phone: string | null;
    position: string | null;
    organization: string | null;
    status: string;
};

const genderLabel: Record<string, string> = {
    male: 'Laki-laki',
    female: 'Perempuan',
};

function Field({ label, value }: { label: string; value: string | null }) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-0.5 text-sm text-ink">{value || '—'}</p>
        </div>
    );
}

export default function Show({ resident }: { resident: Resident }) {
    return (
        <AdminLayout>
            <Head title={resident.full_name} />

            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-ink">{resident.full_name}</h1>
                    <Badge tone={resident.status === 'active' ? 'success' : 'neutral'} className="mt-2">
                        {resident.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                </div>
                <Link href={`/admin/warga/${resident.id}/edit`}>
                    <Button variant="outlined">Edit Data</Button>
                </Link>
            </div>

            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Detail Warga</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-5">
                    <Field label="NIK" value={resident.nik} />
                    <Field label="Jenis Kelamin" value={resident.gender ? genderLabel[resident.gender] : null} />
                    <Field label="No. Telepon" value={resident.phone} />
                    <Field label="Jabatan" value={resident.position} />
                    <Field label="Organisasi/Unit" value={resident.organization} />
                    <div className="col-span-2">
                        <Field label="Alamat" value={resident.address} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
