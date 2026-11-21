<p align="center">
  <img src="public/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" height="90">
  &nbsp;&nbsp;
  <img src="public/images/Homepage/logo-fakultas-informatika.png" alt="Logo Fakultas Informatika" height="70">
</p>

# SiMaCo — Sistem Manajemen Content

Platform web untuk mengelola **pengajuan hingga produksi konten branding** Fakultas Informatika, Telkom University.

Pemohon (mahasiswa, dosen, unit kerja) mengajukan request konten lewat satu form yang terstruktur. Tim Branding memprosesnya di panel admin: meninjau, menugaskan PIC dan deadline, memantau jadwal di kalender, sampai menandai selesai dan mengirim link hasil ke pemohon. Semua yang sebelumnya tersebar di chat, email, dan spreadsheet kini terpusat di satu tempat.

> Dikembangkan oleh **KP Branding Team 2026**. Spesifikasi lengkap ada di [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) (PRD + revisi).

---

## Daftar Isi
- [Fitur](#fitur)
- [Peran Pengguna](#peran-pengguna)
- [Alur Kerja](#alur-kerja)
- [Tech Stack](#tech-stack)
- [Menjalankan di Lokal](#menjalankan-di-lokal)
- [Konfigurasi `.env`](#konfigurasi-env)
- [Testing](#testing)
- [Struktur Folder Penting](#struktur-folder-penting)
- [Checklist Deploy](#checklist-deploy)
- [Status & Batasan](#status--batasan)

---

## Fitur

**Pemohon**
- Form request lengkap: nama acara (dengan counter karakter), deskripsi, tipe proyek, tanggal acara, jenis konten (**Sekali Tayang** atau **Konten Series** dengan nama serial & periode tayang), tenggat konten (minimal H+3), dan platform tujuan (boleh lebih dari satu, urutan tersimpan).
- Lampiran materi: **link** (Google Drive, Canva, YouTube, dll., satu per baris) dan/atau **upload foto/PDF** (maks 5 MB per file, maks 5 file).
- Halaman **Permintaan Saya**: daftar request beserta status, PIC, dan link hasil saat selesai.

**Admin**
- **Dashboard**: ringkasan permintaan aktif, jadwal liputan terdekat, dan daftar request.
- **Manajemen Permintaan**: cari & filter request, buka detail, **terima & tugaskan PIC** (deadline otomatis terisi dari tenggat pemohon), **tolak** dengan alasan, atau **tandai selesai** dengan link hasil.
- **Manajemen Penugasan**: ganti PIC dan kelola jadwal liputan.
- **Kalender** bulanan: tanggal acara, periode tayang series, tenggat konten, deadline pengerjaan, dan liputan.
- **Master Data Staf**: atur role (user/staf/admin) dan status aktif.
- **Tipe Proyek & Platform**: kelola pilihan yang muncul di form request (tambah, ubah, aktif/nonaktif).
- **Aset**: kelola tautan template dan sumber daya.

**Staf**
- Melihat request yang **ditugaskan** kepadanya (ditandai "Ditugaskan ke Anda") beserta materi dan file upload.

**Umum**
- **Notifikasi**: email ke admin saat ada request baru, plus **lonceng** in-app untuk admin (request baru) dan staf (tugas baru).
- **Dua bahasa (ID/EN)** di seluruh antarmuka, termasuk pesan validasi.
- **Responsif** di HP, tablet, dan laptop. Sidebar admin bisa disembunyikan untuk tampilan layar penuh.
- **Keamanan**: otorisasi role di backend, file upload di storage privat (hanya pemohon, PIC, dan admin), sesi berakhir setelah idle 120 menit atau maksimal 8 jam, cookie aman di production.

## Peran Pengguna

| Role | Akses |
|---|---|
| `user` | Membuat request, melihat request **miliknya** beserta status & hasil |
| `staff` | Semua akses user + melihat request yang **ditugaskan** kepadanya. Dapat dipilih sebagai PIC |
| `admin` | Panel admin penuh: kelola request, tugaskan PIC, ubah status, kelola master data |

Akun baru selalu mendapat role `user`. Role `staff`/`admin` hanya bisa diberikan admin lewat **Master Data Staf**.

## Alur Kerja

```
Pemohon mengisi form request
        │
        ▼
 [Baru] ──► Admin meninjau ──► Tolak (dengan alasan) ──► [Ditolak]
        │
        ▼
 Terima & tugaskan PIC + deadline ──► [Berjalan]   (staf mendapat notifikasi)
        │
        ▼
 Admin mengisi link hasil & tandai selesai ──► [Selesai]   (pemohon melihat link hasil)
```

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Backend | PHP 8.4, Laravel 13 |
| Frontend | React 18 + Inertia.js 2, Tailwind CSS 3, Vite |
| Database | MySQL / MariaDB |
| Email & antrian | Laravel Mail + Queue (driver `database`) |
| Notifikasi in-app | Laravel Notifications (channel `database`) |

## Menjalankan di Lokal

**Prasyarat:** PHP 8.4, Composer, Node.js 20+, MySQL/MariaDB (misalnya lewat XAMPP).

```bash
# 1. Ambil kode dan pasang dependensi
git clone https://github.com/Radhan015/brand-manage-webapp.git
cd brand-manage-webapp
composer install
npm install

# 2. Siapkan konfigurasi
cp .env.example .env        # lalu isi koneksi DB (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
php artisan key:generate

# 3. Buat tabel dan data awal
php artisan migrate
php artisan db:seed         # tipe proyek, platform, dan 2 akun demo (lihat catatan di bawah)

# 4. Build aset frontend
npm run build

# 5. Jalankan
php artisan serve           # buka http://127.0.0.1:8000
```

Terminal tambahan saat pengembangan:

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Hot reload saat mengubah file React/JSX (pengganti `npm run build`) |
| `php artisan queue:work` | Memproses antrian email notifikasi |

**Akun demo dari seeder:** `admin@simaco.com` (admin) dan `user@telkomuniversity.ac.id` (user). Password diambil dari `SEED_DEFAULT_PASSWORD` di `.env`. Jika kosong, seeder membuat password acak dan menampilkannya sekali di terminal. Tidak ada password yang disimpan di repo.

> Jika `.env.example` belum ada, salin `.env` dari anggota tim lain lalu sesuaikan, jangan pernah commit `.env`.

## Konfigurasi `.env`

| Key | Keterangan |
|---|---|
| `APP_NAME` | `SiMaCo` (dipakai sebagai nama pengirim & header email) |
| `APP_ENV`, `APP_URL` | Set `production` dan domain asli saat deploy (link di email memakai `APP_URL`) |
| `DB_*` | Koneksi database |
| `MAIL_MAILER`, `MAIL_HOST`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM_ADDRESS` | Pengiriman email. Di lokal pakai `MAIL_MAILER=log` (email ditulis ke `storage/logs/laravel.log`) |
| `QUEUE_CONNECTION` | `database` |
| `SESSION_LIFETIME` | Batas idle sesi dalam menit (default 120) |
| `SIMACO_SESSION_ABSOLUTE_MINUTES` | Batas maksimal satu sesi login (default 480 = 8 jam) |
| `SIMACO_EVENT_NAME_MAX` | Panjang maksimal nama acara (default 100) |
| `SIMACO_MIN_LEAD_DAYS` | Tenggat konten minimal H+N dari hari ini (default 3) |
| `SEED_DEFAULT_PASSWORD` | Password akun demo dari seeder (opsional) |

Batas upload (5 MB, 5 file, JPG/PNG/WEBP/PDF) ada di [`config/simaco.php`](config/simaco.php).

## Testing

```bash
php artisan test
```

Test fitur ada di `tests/Feature/`, antara lain: form request & upload (`RequestFormTest`), role staf & akses (`StaffRoleTest`), master data (`MasterDataTest`), email (`NewRequestMailTest`), notifikasi lonceng (`NotificationTest`), kalender (`CalendarTest`), sesi (`SessionTimeoutTest`), dan dua bahasa (`LocaleTest`). Test memakai SQLite in-memory, tidak menyentuh database lokal.

## Struktur Folder Penting

```
app/
  Http/Controllers/        RequestController (pemohon), AdminController (panel admin)
  Http/Middleware/         SetLocale, AbsoluteSessionTimeout, CheckAdmin
  Mail/                    Email notifikasi request baru
  Notifications/           Notifikasi lonceng (request baru, tugas baru)
  Models/                  ContentRequest, Content, Asset, ProjectType, Platform, User, ...
config/simaco.php          Pengaturan khusus SiMaCo (batas upload, H+N, dll.)
lang/                      Terjemahan backend (validasi, pesan) ID/EN
resources/js/
  Pages/PageUser/          Beranda, form request, permintaan saya, detail
  Pages/PageAdmin/         Halaman panel admin
  Layouts/AdminLayout.jsx  Sidebar + header admin (menu ada di array NAV)
  Components/              Komponen bersama (mis. lonceng notifikasi)
  i18n.jsx, lang/en.js     Mekanisme & kamus dua bahasa frontend
routes/web.php             Semua rute web
```

## Checklist Deploy

- [ ] `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL` domain asli, `APP_NAME=SiMaCo`.
- [ ] Konfigurasi SMTP (`MAIL_*`) dan alamat pengirim.
- [ ] **Queue worker** berjalan terus (`php artisan queue:work` via Supervisor/systemd). Tanpa ini email tidak terkirim.
- [ ] HTTPS aktif (cookie sesi otomatis `Secure` di production).
- [ ] `upload_max_filesize` dan `post_max_size` di `php.ini` server minimal 5 MB / 25 MB.
- [ ] `php artisan migrate --force`, `npm run build`, `php artisan config:cache`.
- [ ] Folder `storage/` dapat ditulis web server. File upload tersimpan di `storage/app/private` (bukan publik).

## Status & Batasan

- **Login SSO Telkom University** belum diimplementasikan (menunggu otorisasi kampus). Saat ini login memakai email/nama + kata sandi.
- **Analitik konten** dan **publikasi langsung ke website** masih backlog.
- Halaman **Lupa Password** masih berupa tampilan, belum berfungsi.
- Perubahan di luar PRD awal tercatat di `PROJECT_CONTEXT.md` (R16–R18): link materi bebas, periode tayang series, dan notifikasi lonceng.

---

<p align="center"><sub>Developed by KP Branding Team 2026 · Fakultas Informatika, Telkom University</sub></p>
