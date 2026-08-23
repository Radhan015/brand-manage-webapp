import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function RequestForm({ auth, flash }) {
    const { data, setData, post, processing, errors, transform, reset } = useForm({
        event_name: '',
        description: '',
        project_type: '',
        content_type: 'sehari',
        event_start_date: '',
        event_end_date: '',
        theme_category_group: '',
        drive_url: '',
        additional_notes: '',
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const confirmSubmit = () => {
        setShowConfirmModal(false);
        transform((currentData) => {
            let extraNotes = '';
            if (currentData.durasi_acara_start || currentData.durasi_acara_end) {
                extraNotes += `\n[Durasi Acara: ${currentData.durasi_acara_start || '?'} s/d ${currentData.durasi_acara_end || '?'}]`;
            }
            if (currentData.content_type === 'lebih_dari_sehari' && (currentData.durasi_konten_start || currentData.durasi_konten_end)) {
                extraNotes += `\n[Durasi Konten: ${currentData.durasi_konten_start || '?'} s/d ${currentData.durasi_konten_end || '?'}]`;
            }
            return {
                ...currentData,
                additional_notes: extraNotes ? (currentData.additional_notes + '\n\n---\nCatatan Sistem:' + extraNotes).trim() : currentData.additional_notes,
            };
        });
        post('/request-form', {
            onSuccess: () => {
                reset();
                setShowSuccessModal(true);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden pb-12">
            <Head title="Content Request | SIMACO" />

            {/* header*/}
            <div className="pt-10 pb-10 w-full font-sans max-w-4xl mx-auto px-4">
                <Link href="/my-requests" className="inline-flex items-center gap-2 text-[#800000] hover:text-red-900 font-semibold mb-6 transition">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Dashboard Request
                </Link>
                <div className="text-center">
                    <h1 className="text-[3.5rem] font-black text-[#570000] mb-4 tracking-tight">
                        Content Request
                    </h1>
                    <p className="text-[#5D3F3B] text-[0.95rem] max-w-xl mx-auto">
                        Selesaikan langkah-langkah di bawah ini untuk mengirimkan permintaan Anda ke tim Branding FIF.
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
                            <h2 className="text-xl font-bold text-[#291714] mb-1">Request Form</h2>
                            <p className="text-sm font-semibold text-[#291714] mb-6">(*) Isian Wajib</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Nama Acara*</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Masukkan nama resmi acara..."
                                        className="w-full px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400"
                                        value={data.event_name}
                                        onChange={e => setData('event_name', e.target.value)}
                                    />
                                    {errors.event_name && <p className="text-red-500 text-xs mt-1">{errors.event_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Deskripsi Acara*</label>
                                    <textarea
                                        rows="4"
                                        required
                                        placeholder="Berikan gambaran singkat tentang tujuan acara..."
                                        className="w-full px-4 py-3 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400 resize-none"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                {/* Tipe Proyek */}
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Tipe Proyek*</label>
                                    <select
                                        required
                                        className="w-full px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 bg-white"
                                        value={data.project_type}
                                        onChange={e => setData('project_type', e.target.value)}
                                    >
                                        <option value="" disabled>Pilih tipe proyek...</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="Video">Video</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {errors.project_type && <p className="text-red-500 text-xs mt-1">{errors.project_type}</p>}
                                </div>

                                {/* Durasi Acara */}
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Durasi Acara*</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="date"
                                            required
                                            className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                            value={data.durasi_acara_start || ''}
                                            onChange={e => {
                                                setData(prev => ({...prev, durasi_acara_start: e.target.value, event_end_date: e.target.value}));
                                            }}
                                        />
                                        <span className="text-gray-500 font-bold">-</span>
                                        <input
                                            type="date"
                                            required
                                            className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                            value={data.durasi_acara_end || ''}
                                            onChange={e => setData('durasi_acara_end', e.target.value)}
                                        />
                                    </div>
                                    {errors.event_end_date && <p className="text-red-500 text-xs mt-1">{errors.event_end_date}</p>}
                                </div>

                                {/* Jenis Acara */}
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-3">Jenis Acara*</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="jenis_acara"
                                                value="sehari"
                                                required
                                                checked={data.content_type === 'sehari'}
                                                onChange={() => setData('content_type', 'sehari')}
                                                className="w-4 h-4 text-[#800000] border-gray-300 focus:ring-[#8B0000]"
                                            />
                                            <span className="text-[#000000]">Sehari</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="jenis_acara"
                                                value="lebih_dari_sehari"
                                                required
                                                checked={data.content_type === 'lebih_dari_sehari'}
                                                onChange={() => setData('content_type', 'lebih_dari_sehari')}
                                                className="w-4 h-4 text-[#800000] border-gray-300 focus:ring-[#8B0000]"
                                            />
                                            <span className="text-[#000000]">Lebih dari sehari</span>
                                        </label>
                                    </div>
                                    {errors.content_type && <p className="text-red-500 text-xs mt-1">{errors.content_type}</p>}
                                </div>

                                {/* Form untuk multi hari */}
                                {data.content_type === 'lebih_dari_sehari' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-800 mb-2">Nama Serial Konten</label>
                                            <input
                                                type="text"
                                                placeholder="Masukkan nama serial konten..."
                                                className="w-full px-4 py-2.5 border border-[#EACACA] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400"
                                                value={data.theme_category_group}
                                                onChange={e => setData('theme_category_group', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#291714] mb-2">Durasi Konten*</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="date"
                                                    className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                                    value={data.durasi_konten_start || ''}
                                                    onChange={e => setData('durasi_konten_start', e.target.value)}
                                                />
                                                <span className="text-gray-500 font-bold">-</span>
                                                <input
                                                    type="date"
                                                    className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                                    value={data.durasi_konten_end || ''}
                                                    onChange={e => setData('durasi_konten_end', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Tenggat Waktu Konten */}
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Tenggat Waktu Konten</label>
                                    <input
                                        type="date"
                                        required
                                        className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#800000] text-gray-700 w-full sm:w-auto"
                                        value={data.event_start_date}
                                        onChange={e => setData('event_start_date', e.target.value)}
                                    />
                                    {errors.event_start_date && <p className="text-red-500 text-xs mt-1">{errors.event_start_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Media terkait*</label>

                                    {/* link inputnya */}
                                    <textarea
                                        rows="3"
                                        required
                                        placeholder="Masukan link disini..."
                                        className="w-full px-4 py-3 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400 resize-none"
                                        value={data.drive_url}
                                        onChange={e => setData('drive_url', e.target.value)}
                                    ></textarea>
                                    {errors.drive_url && <p className="text-red-500 text-xs mt-1">{errors.drive_url}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Catatan Tambahan</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Berikan catatan tambahan untuk tim Branding FIF"
                                        className="w-full px-4 py-3 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400 resize-none"
                                        value={data.additional_notes}
                                        onChange={e => setData('additional_notes', e.target.value)}
                                    ></textarea>
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
                                Submit
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
                            <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-20 w-auto object-contain" />
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
                            <a href="#" className="font-semibold text-[#8B0000]">Home</a>
                            <a href="/#tentang" className="text-gray-600 hover:text-red-800">Tentang</a>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <span className="font-semibold text-[#8B0000]">Layanan</span>
                            <Link href="/request-form" className="text-gray-600 hover:text-red-800">Request Konten</Link>
                            <a href="#contact" className="text-gray-600 hover:text-red-800">Hubungi Kami</a>
                        </div>
                    </div>
                </div>
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Yakin Submit Data?</h3>
                            <p className="text-sm text-gray-500 mb-6">Pastikan semua data yang dimasukkan sudah benar sebelum mengirim.</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={confirmSubmit} className="w-full bg-[#570000] hover:bg-[#400000] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition">Ya, Submit</button>
                                <button onClick={() => setShowConfirmModal(false)} className="w-full text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition">Batal</button>
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Berhasil!</h3>
                            <p className="text-sm text-gray-500 mb-6">Data permintaan berhasil dimasukkan.</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => window.location.href = '/my-requests'} className="w-full bg-[#570000] hover:bg-[#400000] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition">Menuju Dashboard</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}