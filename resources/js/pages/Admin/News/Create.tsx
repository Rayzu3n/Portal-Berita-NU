import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { NewsForm, type NewsFormData } from './NewsForm';

type Category = { id: number; name: string };

export default function Create({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors } = useForm<NewsFormData>({
        title: '',
        category_id: '',
        excerpt: '',
        content: '',
        status: 'draft',
        cover_image: null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/berita', { forceFormData: true });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Berita" />

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-ink">Tambah Berita</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Isi detail berita, lalu simpan sebagai draf atau langsung terbitkan.
                </p>
            </div>

            <NewsForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
                submitLabel="Simpan Berita"
                categories={categories}
            />
        </AdminLayout>
    );
}
