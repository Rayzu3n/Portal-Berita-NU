import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { ResidentForm, type ResidentFormData } from './ResidentForm';

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

export default function Edit({ resident }: { resident: Resident }) {
    const { data, setData, put, processing, errors } = useForm<ResidentFormData>({
        full_name: resident.full_name,
        nik: resident.nik ?? '',
        gender: resident.gender ?? '',
        address: resident.address ?? '',
        phone: resident.phone ?? '',
        position: resident.position ?? '',
        organization: resident.organization ?? '',
        status: resident.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/warga/${resident.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit — ${resident.full_name}`} />

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-ink">Edit Warga NU</h1>
                <p className="mt-1 text-sm text-muted-foreground">{resident.full_name}</p>
            </div>

            <ResidentForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
                submitLabel="Simpan Perubahan"
            />
        </AdminLayout>
    );
}
