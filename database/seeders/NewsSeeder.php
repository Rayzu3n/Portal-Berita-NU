<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@portal-nu.test')->firstOrFail();
        $categories = Category::pluck('id', 'slug');

        $news = [
            [
                'title' => 'Pengajian Rutin Warga NU Desa',
                'category' => 'keagamaan',
                'excerpt' => 'Kegiatan pengajian rutin warga NU desa kembali dilaksanakan dengan antusiasme masyarakat.',
                'content' => 'Pengajian rutin warga NU desa kembali dilaksanakan sebagai bagian dari kegiatan keagamaan dan silaturahmi masyarakat.',
                'status' => 'published',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Gotong Royong Membersihkan Lingkungan Desa',
                'category' => 'sosial',
                'excerpt' => 'Warga bersama pengurus NU melaksanakan kegiatan gotong royong membersihkan lingkungan desa.',
                'content' => 'Kegiatan gotong royong dilaksanakan bersama warga dan pengurus NU untuk menjaga kebersihan serta mempererat kebersamaan masyarakat.',
                'status' => 'published',
                'published_at' => now()->subDays(4),
            ],
            [
                'title' => 'Kegiatan Pendidikan Anak dan Remaja NU',
                'category' => 'pendidikan',
                'excerpt' => 'Program pendidikan untuk anak dan remaja menjadi salah satu agenda kegiatan masyarakat.',
                'content' => 'Program pendidikan anak dan remaja dilaksanakan untuk mendukung kegiatan belajar serta pengembangan generasi muda di desa.',
                'status' => 'published',
                'published_at' => now()->subDays(6),
            ],
            [
                'title' => 'Rapat Koordinasi Pengurus NU Desa',
                'category' => 'organisasi',
                'excerpt' => 'Pengurus NU desa mengadakan rapat koordinasi untuk membahas agenda kegiatan mendatang.',
                'content' => 'Rapat koordinasi membahas evaluasi kegiatan sebelumnya dan persiapan berbagai agenda organisasi yang akan datang.',
                'status' => 'published',
                'published_at' => now()->subDays(8),
            ],
            [
                'title' => 'Santunan untuk Warga yang Membutuhkan',
                'category' => 'sosial',
                'excerpt' => 'Kegiatan santunan menjadi bagian dari kepedulian sosial warga dan pengurus NU.',
                'content' => 'Kegiatan santunan dilaksanakan sebagai bentuk kepedulian sosial kepada warga yang membutuhkan bantuan.',
                'status' => 'published',
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Persiapan Kegiatan Keagamaan Desa',
                'category' => 'keagamaan',
                'excerpt' => 'Pengurus dan warga mempersiapkan kegiatan keagamaan yang akan dilaksanakan dalam waktu dekat.',
                'content' => 'Persiapan kegiatan keagamaan dilakukan bersama pengurus dan warga agar seluruh rangkaian acara dapat berjalan dengan baik.',
                'status' => 'published',
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Pengumuman Agenda Kegiatan Bulanan',
                'category' => 'pengumuman',
                'excerpt' => 'Berikut agenda kegiatan NU desa yang direncanakan untuk bulan ini.',
                'content' => 'Pengurus NU desa menyampaikan agenda kegiatan bulanan sebagai informasi bagi seluruh warga.',
                'status' => 'published',
                'published_at' => now()->subDays(14),
            ],
            [
                'title' => 'Pelatihan Keterampilan untuk Warga',
                'category' => 'pendidikan',
                'excerpt' => 'Pelatihan keterampilan warga menjadi salah satu agenda pemberdayaan masyarakat desa.',
                'content' => 'Pelatihan keterampilan diselenggarakan untuk membantu meningkatkan kemampuan dan pengetahuan warga.',
                'status' => 'published',
                'published_at' => now()->subDays(16),
            ],
            [
                'title' => 'Rencana Kerja Pengurus NU Semester Berikutnya',
                'category' => 'organisasi',
                'excerpt' => 'Pengurus mulai menyusun rencana kerja untuk periode kegiatan berikutnya.',
                'content' => 'Rencana kerja disusun dengan mempertimbangkan kebutuhan masyarakat serta evaluasi kegiatan sebelumnya.',
                'status' => 'draft',
                'published_at' => null,
            ],
            [
                'title' => 'Persiapan Bakti Sosial Desa',
                'category' => 'sosial',
                'excerpt' => 'Persiapan kegiatan bakti sosial sedang dilakukan oleh pengurus dan relawan.',
                'content' => 'Panitia sedang mempersiapkan kegiatan bakti sosial yang akan melibatkan pengurus, relawan, dan masyarakat desa.',
                'status' => 'draft',
                'published_at' => null,
            ],
        ];

        foreach ($news as $item) {
            News::updateOrCreate(
                ['slug' => Str::slug($item['title'])],
                [
                    'category_id' => $categories[$item['category']],
                    'user_id' => $admin->id,
                    'title' => $item['title'],
                    'slug' => Str::slug($item['title']),
                    'excerpt' => $item['excerpt'],
                    'content' => $item['content'],
                    'status' => $item['status'],
                    'published_at' => $item['published_at'],
                ]
            );
        }
    }
}
