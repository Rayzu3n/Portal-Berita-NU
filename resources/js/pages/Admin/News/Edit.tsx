import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { NewsForm, type NewsFormData } from './NewsForm';

type Category = { id: number; name: string };

type NewsItem = {
    id: number;
    title: string;
    category_id: number;
    excerpt: string | null;
    content: string;
    status: 'draft' | 'published';
    cover_image_url: string | null;
};

export default function Edit({ news, categories }: { news: NewsItem; categories: Category[] }) {
    const { data, setData, processing, errors, transform, post } = useForm<NewsFormData>({
        title: news.title,
        category_id: String(news.category_id),
        excerpt: news.excerpt ?? '',
        content: news.content,
        status: news.status,
        cover_image: null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // File uploads on update go through POST + method spoofing —
        // multipart PUT bodies aren't reliably parsed by Laravel/PHP.
        transform((formData) => ({ ...formData, _method: 'put' }));
        post(`/admin/berita/${news.id}`, { forceFormData: true });
    };

    return (
        <AdminLayout>
            <Head title={`Edit — ${news.title}`} />

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-ink">Edit Berita</h1>
                <p className="mt-1 text-sm text-muted-foreground">{news.title}</p>
            </div>

            <NewsForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
                submitLabel="Simpan Perubahan"
                categories={categories}
                currentCoverUrl={news.cover_image_url}
            />
        </AdminLayout>
    );
}
