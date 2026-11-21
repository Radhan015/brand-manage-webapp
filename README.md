<p align="center">
  <img src="public/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" height="90">
  &nbsp;&nbsp;
  <img src="public/images/Homepage/logo-fakultas-informatika.png" alt="Logo Fakultas Informatika" height="70">
</p>

# SiMaCo — Sistem Manajemen Content

Platform web untuk mengelola **pengajuan hingga produksi konten branding** Fakultas Informatika, Telkom University.

Pemohon mengajukan request konten lewat satu form terstruktur. Tim Branding memprosesnya di panel admin: meninjau, menugaskan PIC dan deadline, memantau jadwal di kalender, sampai mengirim link hasil ke pemohon. Proses yang sebelumnya tersebar di chat, email, dan spreadsheet kini terpusat di satu tempat.

## Fitur

**Pemohon**
- Form request lengkap: jenis konten (Sekali Tayang / Konten Series), tanggal acara, tenggat, dan platform tujuan.
- Lampiran berupa link (Google Drive, Canva, YouTube, dll.) atau upload foto/PDF.
- Pantau status request dan terima link hasil saat selesai.

**Admin**
- Dashboard ringkasan dan kalender jadwal (acara, periode tayang, tenggat, liputan).
- Terima, tolak, tugaskan PIC, dan tandai selesai.
- Kelola staf, role, tipe proyek, platform, dan aset.

**Staf**
- Lihat tugas yang ditugaskan beserta materinya.

**Umum**
- Notifikasi email dan lonceng in-app.
- Dua bahasa (Indonesia / English).
- Responsif di HP, tablet, dan laptop.
- Otorisasi role di backend, file upload di storage privat, dan batas sesi login.

## Alur Kerja

```
Request baru ──► Ditinjau admin ──► Ditolak
                       │
                       ▼
             Tugaskan PIC + deadline ──► Berjalan ──► Selesai (link hasil dikirim)
```

## Tech Stack

- **Backend:** PHP 8.4, Laravel 13
- **Frontend:** React 18, Inertia.js, Tailwind CSS, Vite
- **Database:** MySQL

## Menjalankan di Lokal

```bash
git clone https://github.com/Radhan015/brand-manage-webapp.git
cd brand-manage-webapp
composer install && npm install
cp .env.example .env   # isi koneksi database
php artisan key:generate
php artisan migrate --seed
npm run build
php artisan serve
```

Buka `http://127.0.0.1:8000`. Jalankan tes dengan `php artisan test`.

---

<p align="center"><sub>Developed by KP Branding Team 2026 · Fakultas Informatika, Telkom University</sub></p>
