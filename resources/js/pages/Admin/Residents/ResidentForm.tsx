import { Button } from '@/components/ui/Button';
import { FieldError, Input, Label, Select } from '@/components/ui/Input';

export type ResidentFormData = {
    full_name: string;
    nik: string;
    gender: '' | 'male' | 'female';
    address: string;
    phone: string;
    position: string;
    organization: string;
    status: string;
};

export function ResidentForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
}: {
    data: ResidentFormData;
    setData: <K extends keyof ResidentFormData>(key: K, value: ResidentFormData[K]) => void;
    errors: Partial<Record<keyof ResidentFormData, string>>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
}) {
    return (
        <form onSubmit={onSubmit} className="max-w-xl space-y-5">
            <div>
                <Label htmlFor="full_name">Nama Lengkap</Label>
                <Input
                    id="full_name"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                />
                <FieldError message={errors.full_name} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="nik">NIK (opsional)</Label>
                    <Input id="nik" value={data.nik} onChange={(e) => setData('nik', e.target.value)} />
                    <FieldError message={errors.nik} />
                </div>
                <div>
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <Select
                        id="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value as ResidentFormData['gender'])}
                    >
                        <option value="">Tidak diisi</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                    </Select>
                    <FieldError message={errors.gender} />
                </div>
            </div>

            <div>
                <Label htmlFor="address">Alamat</Label>
                <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                <FieldError message={errors.address} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                    <FieldError message={errors.phone} />
                </div>
                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select id="status" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                    </Select>
                    <FieldError message={errors.status} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="position">Jabatan (opsional)</Label>
                    <Input
                        id="position"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                    />
                    <FieldError message={errors.position} />
                </div>
                <div>
                    <Label htmlFor="organization">Organisasi/Unit (opsional)</Label>
                    <Input
                        id="organization"
                        value={data.organization}
                        onChange={(e) => setData('organization', e.target.value)}
                    />
                    <FieldError message={errors.organization} />
                </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
