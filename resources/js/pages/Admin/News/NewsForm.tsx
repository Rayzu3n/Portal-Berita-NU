import { Button } from '@/components/ui/Button';
import { FieldError, Input, Label, Select, Textarea } from '@/components/ui/Input';
import { type ChangeEvent } from 'react';

export type NewsFormData = {
    title: string;
    category_id: string;
    excerpt: string;
    content: string;
    status: 'draft' | 'published';
    cover_image: File | null;
    _method?: 'put';
};

type Category = { id: number; name: string };

export function NewsForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
    categories,
    currentCoverUrl,
}: {
    data: NewsFormData;
    setData: <K extends keyof NewsFormData>(key: K, value: NewsFormData[K]) => void;
    errors: Partial<Record<keyof NewsFormData, string>>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    categories: Category[];
    /** Public URL of the currently saved cover image, when editing. */
    currentCoverUrl?: string | null;
}) {
    const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData('cover_image', e.target.files?.[0] ?? null);
    };

    return (
        <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
            <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <FieldError message={errors.title} />
            </div>

            <div>
                <Label htmlFor="category_id">Kategori</Label>
                <Select
                    id="category_id"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                >
                    <option value="">Pilih kategori</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
                <FieldError message={errors.category_id} />
            </div>

            <div>
                <Label htmlFor="cover_image">Cover</Label>
                {currentCoverUrl && (
                    <img
                        src={currentCoverUrl}
                        alt="Cover saat ini"
                        className="mb-2 h-32 w-full rounded-lg object-cover"
                    />
                )}
                <Input id="cover_image" type="file" accept="image/*" onChange={handleCoverChange} />
                <FieldError message={errors.cover_image} />
            </div>

            <div>
                <Label htmlFor="excerpt">Ringkasan (opsional)</Label>
                <Textarea
                    id="excerpt"
                    rows={2}
                    value={data.excerpt}
                    onChange={(e) => setData('excerpt', e.target.value)}
                />
                <FieldError message={errors.excerpt} />
            </div>

            <div>
                <Label htmlFor="content">Isi Berita</Label>
                <Textarea
                    id="content"
                    rows={10}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                />
                <FieldError message={errors.content} />
            </div>

            <div>
                <Label htmlFor="status">Status</Label>
                <Select
                    id="status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value as NewsFormData['status'])}
                >
                    <option value="draft">Draf</option>
                    <option value="published">Terbit</option>
                </Select>
                <FieldError message={errors.status} />
            </div>

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
