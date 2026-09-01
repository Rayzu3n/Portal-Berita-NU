import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { ResidentForm, type ResidentFormData } from './ResidentForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<ResidentFormData>({
        full_name: '',
        nik: '',
        gender: '',
        address: '',
        phone: '',
        position: '',
        organization: '',
        status: 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/warga');
    };

    return (
        <AdminLayout>
            <Head title="Tambah Warga" />

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-ink">Tambah Warga NU</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Data ini masih data provisional — struktur field bisa berubah setelah validasi ke Ketua NU.
                </p>
            </div>

            <ResidentForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
                submitLabel="Simpan Warga"
            />
        </AdminLayout>
    );
}
