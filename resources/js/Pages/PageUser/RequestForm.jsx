import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLang, LangSwitch } from '@/i18n';

// yyyy-mm-dd in the browser's local time zone (toISOString alone would shift to UTC)
const ymd = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];

const inputClass = "w-full px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400";
const dateClass = "px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700";
const labelClass = "block text-sm font-medium text-[#291714] mb-2";
const FieldError = ({ msg }) => msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

export default function RequestForm({ auth, flash, projectTypes = [], platforms = [], rules = {} }) {
    const { t } = useLang();
    const maxName = rules.event_name_max ?? 100;
    const leadDays = rules.min_lead_days ?? 3;
    const today = ymd(new Date());
    const minDeadline = ymd(new Date(Date.now() + leadDays * 86400000));

    const { data, setData, post, processing, errors, reset } = useForm({
        event_name: '',
        description: '',
        project_type_id: '',
        content_type: 'single',
        serial_name: '',
        theme_category_group: '',
        series_start_date: '',
        series_end_date: '',
        event_start_date: '',
        event_end_date: '',
        content_deadline: '',
        platform_ids: [],
        drive_url: '',
        files: [],
        additional_notes: '',
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const isSeries = data.content_type === 'series';
    const firstError = (prefix) => Object.entries(errors).find(([k]) => k === prefix || k.startsWith(prefix + '.'))?.[1];

    // Keeps click order so the platform order (Media 1, Media 2, ...) is saved as chosen
    const togglePlatform = (id) => setData('platform_ids',
        data.platform_ids.includes(id) ? data.platform_ids.filter(x => x !== id) : [...data.platform_ids, id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const confirmSubmit = () => {
        setShowConfirmModal(false);
        post('/request-form', {
            onSuccess: () => {
                reset();
                setShowSuccessModal(true);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden pb-12">
            <Head title={`${t('Content Request')} | SIMACO`} />

            {/* header*/}
            <div className="pt-10 pb-10 w-full font-sans max-w-4xl mx-auto px-4">
                <div className="flex justify-end mb-2"><LangSwitch /></div>
                <Link href="/my-requests" className="inline-flex items-center gap-2 text-[#800000] hover:text-red-900 font-semibold mb-6 transition">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('Kembali ke Request')}
                </Link>
                <div className="text-center">
                    <h1 className="text-[3.5rem] font-black text-[#570000] mb-4 tracking-tight">
                        {t('Content Request')}
                    </h1>
                    <p className="text-[#5D3F3B] text-[0.95rem] max-w-xl mx-auto">
                        {t('Selesaikan langkah-langkah di bawah ini untuk mengirimkan permintaan Anda ke tim Branding FIF.')}
                    </p>
                </div>
            </div>

            {/* kesulurahnnaya Form */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12">
                    {flash?.success && (
                        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">{flash.success}</span>
                        </div>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        {/* ini Request form nya */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-[#291714] mb-1">{t('Form Request')}</h2>
                            <p className="text-sm font-semibold text-[#291714] mb-6">{t('(*) Isian Wajib')}</p>

                            <div className="space-y-5">
                                <div>
                                    <label className={labelClass}>{t('Nama Acara')}*</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={maxName}
                                        placeholder={t('Masukkan nama resmi acara...')}
                                        className={inputClass}
                                        value={data.event_name}
                                        onChange={e => setData('event_name', e.target.value)}
                                    />
                                    <p className={`text-xs mt-1 text-right ${data.event_name.length >= maxName ? 'text-red-500' : 'text-gray-500'}`}>
                                        {t('Sisa :n karakter', { n: maxName - data.event_name.length })}
                                    </p>
                                    <FieldError msg={errors.event_name} />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Deskripsi Acara')}*</label>
                                    <textarea
                                        rows="4"
                                        required
                                        placeholder={t('Berikan gambaran singkat tentang tujuan acara...')}
                                        className={`${inputClass} resize-none`}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    ></textarea>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {t('Contoh: "Poster promosi Seminar AI untuk mahasiswa FIF. Pesan utama: pendaftaran gratis, kuota 100 orang. Sertakan logo FIF dan QR pendaftaran."')}
                                    </p>
                                    <FieldError msg={errors.description} />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Tipe Proyek')}*</label>
                                    <select
                                        required
                                        className={`${inputClass} bg-white pr-10`}
                                        value={data.project_type_id}
                                        onChange={e => setData('project_type_id', e.target.value)}
                                    >
                                        <option value="" disabled>{t('Pilih tipe proyek...')}</option>
                                        {projectTypes.map(pt => <option key={pt.id} value={pt.id}>{pt.name}</option>)}
                                    </select>
                                    <p className="text-gray-500 text-xs mt-1">{t('Tipe yang dibutuhkan tidak ada? Hubungi admin untuk ditambahkan.')}</p>
                                    <FieldError msg={errors.project_type_id} />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Tanggal Acara')}*</label>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <input
                                            type="date"
                                            required
                                            aria-label={t('Tanggal mulai acara')}
                                            min={today}
                                            className={dateClass}
                                            value={data.event_start_date}
                                            onChange={e => setData('event_start_date', e.target.value)}
                                        />
                                        <span className="text-gray-500 font-bold">-</span>
                                        <input
                                            type="date"
                                            required
                                            aria-label={t('Tanggal selesai acara')}
                                            min={data.event_start_date || today}
                                            className={dateClass}
                                            value={data.event_end_date}
                                            onChange={e => setData('event_end_date', e.target.value)}
                                        />
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1">{t('Acara sehari? Isi tanggal mulai dan selesai dengan tanggal yang sama.')}</p>
                                    <FieldError msg={errors.event_start_date || errors.event_end_date} />
                                </div>

                                <div>
                                    <label className={`${labelClass} mb-3`}>{t('Jenis Konten')}*</label>
                                    <div className="flex flex-col gap-3">
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="content_type"
                                                value="single"
                                                checked={!isSeries}
                                                onChange={() => setData('content_type', 'single')}
                                                className="w-4 h-4 mt-1 text-[#800000] border-gray-300 focus:ring-[#8B0000]"
                                            />
                                            <span>
                                                <span className="text-black">{t('Sekali Tayang')}</span>
                                                <span className="block text-xs text-gray-500">{t('Satu konten untuk satu kali publikasi. Contoh: poster Seminar AI.')}</span>
                                            </span>
                                        </label>
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="content_type"
                                                value="series"
                                                checked={isSeries}
                                                onChange={() => setData('content_type', 'series')}
                                                className="w-4 h-4 mt-1 text-[#800000] border-gray-300 focus:ring-[#8B0000]"
                                            />
                                            <span>
                                                <span className="text-black">{t('Konten Series')}</span>
                                                <span className="block text-xs text-gray-500">{t('Beberapa konten berseri yang tayang dalam satu periode. Contoh: "Kenalan Sama Lab FIF" 4 episode, tiap minggu.')}</span>
                                            </span>
                                        </label>
                                    </div>
                                    <FieldError msg={errors.content_type} />
                                </div>

                                {isSeries && (
                                    <div className="space-y-5 border-l-4 border-[#E7BDB6] pl-4">
                                        <div>
                                            <label className={labelClass}>{t('Nama Serial Konten')}*</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder={t('Contoh: "Kenalan Sama Lab FIF"')}
                                                className={inputClass}
                                                value={data.serial_name}
                                                onChange={e => setData('serial_name', e.target.value)}
                                            />
                                            <FieldError msg={errors.serial_name} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>{t('Tema / Kategori / Grup')}</label>
                                            <input
                                                type="text"
                                                placeholder={t('Contoh: Profil Laboratorium')}
                                                className={inputClass}
                                                value={data.theme_category_group}
                                                onChange={e => setData('theme_category_group', e.target.value)}
                                            />
                                            <FieldError msg={errors.theme_category_group} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>{t('Periode Tayang Series')}*</label>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <input
                                                    type="date"
                                                    required
                                                    aria-label={t('Mulai tayang')}
                                                    min={today}
                                                    className={dateClass}
                                                    value={data.series_start_date}
                                                    onChange={e => setData('series_start_date', e.target.value)}
                                                />
                                                <span className="text-gray-500 font-bold">-</span>
                                                <input
                                                    type="date"
                                                    required
                                                    aria-label={t('Selesai tayang')}
                                                    min={data.series_start_date || today}
                                                    className={dateClass}
                                                    value={data.series_end_date}
                                                    onChange={e => setData('series_end_date', e.target.value)}
                                                />
                                            </div>
                                            <p className="text-gray-500 text-xs mt-1">{t('Kapan episode pertama sampai episode terakhir ditayangkan.')}</p>
                                            <FieldError msg={errors.series_start_date || errors.series_end_date} />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className={labelClass}>{t('Tenggat Waktu Konten')}*</label>
                                    <input
                                        type="date"
                                        required
                                        min={minDeadline}
                                        className={`${dateClass} w-full sm:w-auto`}
                                        value={data.content_deadline}
                                        onChange={e => setData('content_deadline', e.target.value)}
                                    />
                                    <p className="text-gray-500 text-xs mt-1">
                                        {t(isSeries ? 'Kapan konten harus sudah jadi (untuk series: tenggat episode pertama). Minimal H+:days dari hari ini.' : 'Kapan konten harus sudah jadi. Minimal H+:days dari hari ini.', { days: leadDays })}
                                    </p>
                                    <FieldError msg={errors.content_deadline} />
                                </div>

                                <fieldset>
                                    <legend className={labelClass}>{t('Platform Tujuan')}*</legend>
                                    <div className="flex flex-wrap gap-2">
                                        {platforms.map(p => {
                                            const order = data.platform_ids.indexOf(p.id);
                                            return (
                                                <label key={p.id} className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer text-sm ${order >= 0 ? 'border-[#800000] bg-red-50 text-[#570000]' : 'border-[#E7BDB6] text-gray-700'}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={order >= 0}
                                                        onChange={() => togglePlatform(p.id)}
                                                        className="rounded text-[#800000] focus:ring-[#8B0000]"
                                                    />
                                                    {p.name}
                                                    {order >= 0 && data.platform_ids.length > 1 && <span className="text-xs font-bold">#{order + 1}</span>}
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1">{t('Boleh pilih lebih dari satu. Urutan klik = urutan prioritas platform.')}</p>
                                    <FieldError msg={firstError('platform_ids')} />
                                </fieldset>

                                <div>
                                    <label className={labelClass}>{t('Link Materi / Referensi')}</label>
                                    <textarea
                                        rows="3"
                                        placeholder={'https://...\n' + t('Satu link per baris')}
                                        className={`${inputClass} resize-none`}
                                        value={data.drive_url}
                                        onChange={e => setData('drive_url', e.target.value)}
                                    ></textarea>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {t('Boleh link apa saja (Google Drive, Canva, YouTube, dll.), diawali http:// atau https://. Pastikan link bisa dibuka tim Branding, misalnya akses Drive diatur ke "Siapa saja yang memiliki link".')}
                                    </p>
                                    <FieldError msg={errors.drive_url} />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Upload Foto / PDF Pendukung')}</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-50 file:text-[#570000] file:font-semibold hover:file:bg-red-100"
                                        onChange={e => setData('files', Array.from(e.target.files))}
                                    />
                                    <p className="text-gray-500 text-xs mt-1">
                                        {t('Opsional. JPG, PNG, WEBP, atau PDF, maks :mb MB per file, maks :count file. Isi minimal salah satu: link atau upload file.', { mb: (rules.upload_max_kb ?? 5120) / 1024, count: rules.upload_max_files ?? 5 })}
                                    </p>
                                    <FieldError msg={firstError('files')} />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Catatan Tambahan')}</label>
                                    <textarea
                                        rows="4"
                                        placeholder={t('Berikan catatan tambahan untuk tim Branding FIF')}
                                        className={`${inputClass} resize-none`}
                                        value={data.additional_notes}
                                        onChange={e => setData('additional_notes', e.target.value)}
                                    ></textarea>
                                    <FieldError msg={errors.additional_notes} />
                                </div>
                            </div>
                        </div>

                        {/* tombol sumitnya */}
                        <div className="flex justify-end border-t border-[#E5C3C3] pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#570000] hover:bg-[#410000] text-white px-8 py-2.5 rounded-full font-semibold flex items-center gap-2 transition"
                            >
                                {t('Kirim')}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* FOOTER */}
            <footer id="contact" className="bg-[#EEEEEF] py-16 px-8 md:px-16 border-t border-gray-200">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-6">
                            <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-12 sm:h-20 w-auto object-contain" /><img src="/images/Homepage/logo-fakultas-informatika.png" alt="Logo Fakultas Informatika" className="h-12 sm:h-20 w-auto object-contain ml-3" />
                        </div>
                        <div className="space-y-4 text-sm text-[#1A1C1D]">
                            <p className="flex items-start gap-2">
                                <img src="/images/Homepage/lokasi.png" alt="Lokasi" className="w-5 h-5 object-contain mt-1" />
                                <span>Tult lt.16, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Sukapura,<br />
                                    Kecamatan Bojongsoang, Kabupaten Bandung, Jawa Barat 40257</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <img src="/images/Homepage/telepon.png" alt="Telepon" className="w-5 h-5 object-contain" />
                                Yeyen Hamidah (+62 857-1194-5328)
                            </p>
                            <p className="flex items-center gap-2">
                                <img src="/images/Homepage/icon-instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                                @yeyenhamidah
                            </p>
                        </div>
                    </div>

                    {/* links nya */}
                    <div className="flex gap-16 justify-end">
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="font-semibold text-[#8B0000]">{t('Beranda')}</a>
                            <a href="/#tentang" className="text-gray-600 hover:text-red-800">{t('Tentang')}</a>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <span className="font-semibold text-[#8B0000]">{t('Layanan')}</span>
                            <Link href="/request-form" className="text-gray-600 hover:text-red-800">{t('Request Konten')}</Link>
                            <a href="#contact" className="text-gray-600 hover:text-red-800">{t('Hubungi Kami')}</a>
                        </div>
                    </div>
                </div>
                <p className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-300 text-center text-xs text-gray-500">Developed by KP Branding Team 2026</p>
            </footer>

            {/* Modal Konfirmasi */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('Yakin kirim data?')}</h3>
                            <p className="text-sm text-gray-500 mb-6">{t('Pastikan semua data yang dimasukkan sudah benar sebelum mengirim.')}</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={confirmSubmit} className="w-full bg-[#570000] hover:bg-[#400000] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition">{t('Ya, kirim')}</button>
                                <button onClick={() => setShowConfirmModal(false)} className="w-full text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition">{t('Batal')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Sukses */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('Berhasil!')}</h3>
                            <p className="text-sm text-gray-500 mb-6">{t('Data permintaan berhasil dimasukkan.')}</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => window.location.href = '/my-requests'} className="w-full bg-[#570000] hover:bg-[#400000] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition">{t('Menuju Dashboard')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}