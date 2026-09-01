<?php

namespace Database\Seeders;

use App\Models\Resident;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    public function run(): void
    {
        $residents = [
            [
                'full_name' => 'Ahmad Fauzi',
                'nik' => '3501000000000001',
                'gender' => 'male',
                'address' => 'Jl. Desa Makmur No. 1',
                'phone' => '081234567801',
                'position' => 'Ketua',
                'organization' => 'NU Ranting Desa',
                'status' => 'active',
            ],
            [
                'full_name' => 'Siti Aminah',
                'nik' => '3501000000000002',
                'gender' => 'female',
                'address' => 'Jl. Desa Makmur No. 2',
                'phone' => '081234567802',
                'position' => 'Sekretaris',
                'organization' => 'NU Ranting Desa',
                'status' => 'active',
            ],
            [
                'full_name' => 'Muhammad Rizky',
                'nik' => '3501000000000003',
                'gender' => 'male',
                'address' => 'Jl. Desa Makmur No. 3',
                'phone' => '081234567803',
                'position' => 'Bendahara',
                'organization' => 'NU Ranting Desa',
                'status' => 'active',
            ],
            [
                'full_name' => 'Nur Aisyah',
                'nik' => '3501000000000004',
                'gender' => 'female',
                'address' => 'Jl. Desa Makmur No. 4',
                'phone' => '081234567804',
                'position' => 'Anggota',
                'organization' => 'Muslimat NU',
                'status' => 'active',
            ],
            [
                'full_name' => 'Abdul Rahman',
                'nik' => '3501000000000005',
                'gender' => 'male',
                'address' => 'Jl. Desa Makmur No. 5',
                'phone' => '081234567805',
                'position' => 'Anggota',
                'organization' => 'GP Ansor',
                'status' => 'active',
            ],
            [
                'full_name' => 'Fatimah Zahra',
                'nik' => '3501000000000006',
                'gender' => 'female',
                'address' => 'Jl. Desa Makmur No. 6',
                'phone' => '081234567806',
                'position' => 'Anggota',
                'organization' => 'Fatayat NU',
                'status' => 'active',
            ],
            [
                'full_name' => 'Deni Kurniawan',
                'nik' => '3501000000000007',
                'gender' => 'male',
                'address' => 'Jl. Desa Makmur No. 7',
                'phone' => '081234567807',
                'position' => 'Anggota',
                'organization' => 'NU Ranting Desa',
                'status' => 'active',
            ],
            [
                'full_name' => 'Lina Marlina',
                'nik' => '3501000000000008',
                'gender' => 'female',
                'address' => 'Jl. Desa Makmur No. 8',
                'phone' => '081234567808',
                'position' => 'Anggota',
                'organization' => 'Muslimat NU',
                'status' => 'active',
            ],
            [
                'full_name' => 'Yusuf Maulana',
                'nik' => '3501000000000009',
                'gender' => 'male',
                'address' => 'Jl. Desa Makmur No. 9',
                'phone' => '081234567809',
                'position' => 'Anggota',
                'organization' => 'NU Ranting Desa',
                'status' => 'active',
            ],
            [
                'full_name' => 'Hana Putri',
                'nik' => '3501000000000010',
                'gender' => 'female',
                'address' => 'Jl. Desa Makmur No. 10',
                'phone' => '081234567810',
                'position' => 'Anggota',
                'organization' => 'Fatayat NU',
                'status' => 'active',
            ],
        ];

        foreach ($residents as $resident) {
            Resident::updateOrCreate(
                ['nik' => $resident['nik']],
                $resident
            );
        }
    }
}
