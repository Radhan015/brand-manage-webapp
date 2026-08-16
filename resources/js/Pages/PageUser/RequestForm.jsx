import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function RequestForm() {
    const [jenisAcara, setJenisAcara] = useState('sehari');

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden pb-12">
            <Head title="Content Request | SIMACO" />

            {/* NAVBAR */}
            <nav className="w-full bg-white shadow-sm py-4 px-8 flex justify-between items-center fixed top-0 z-50">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <img
                            src="/images/Homepage/logoSimaco-removebg-preview.png"
                            alt="Logo SiMaCo"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>

                <div className="hidden md:flex space-x-8 font-medium text-gray-600">
                    <Link href="/#tentang" className="hover:text-red-800 transition">Tentang</Link>
                    <Link href="/#benefits" className="hover:text-red-800 transition">Benefits</Link>
                    <Link href="/#team" className="hover:text-red-800 transition">Branding Team</Link>
                    <Link href="/request-form" className="text-red-800 border-b-2 border-red-800 pb-1">Request</Link>
                    <Link href="/#contact" className="hover:text-red-800 transition">Contact Us</Link>
                </div>

                <Link
                    href="/login"
                    className="bg-[#8B0000] text-white px-6 py-2 rounded-md font-semibold hover:bg-red-900 transition"
                >
                    Login
                </Link>
            </nav>

            {/* header*/}
            <div className="pt-28 pb-10 text-center w-full font-sans">
                <h1 className="text-[3.5rem] font-black text-[#570000] mb-4 tracking-tight">
                    Content Request
                </h1>
                <p className="text-[#5D3F3B] text-[0.95rem] max-w-xl mx-auto">
                    Selesaikan langkah-langkah di bawah ini untuk mengirimkan permintaan Anda ke tim Branding FIF.
                </p>
            </div>

            {/* kesulurahnnaya Form */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white border border-[#E7BDB6] rounded-xl p-8 md:p-12 shadow-sm">
                    <form>
                        <div className="mb-10">
                            <h2 className="text-[22px] font-bold text-[#291714] mb-1">Data Pribadi Perequest</h2>
                            <p className="text-xs font-bold text-[#291714] mb-6">(*) Isian Wajib</p>
                            {/* senua input data userna */}
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Nama Lengkap*</label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama lengkap kamu..."
                                        className="w-full px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Email*</label>
                                    <input
                                        type="email"
                                        placeholder="Masukkan email kamu..."
                                        className="w-full px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Nomor HP*</label>
                                    <input
                                        type="tel"
                                        placeholder="Masukkan nomor hp kamu..."
                                        className="w-full px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ini Request form nya */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-[#291714] mb-1">Request Form</h2>
                            <p className="text-sm font-semibold text-[#291714] mb-6">(*) Isian Wajib</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Nama Acara*</label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama resmi acara..."
                                        className="w-full px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Deskripsi Acara*</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Berikan gambaran singkat tentang tujuan acara..."
                                        className="w-full px-4 py-3 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400 resize-none"
                                    ></textarea>
                                </div>
                                {/* durasi form  */}
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Durasi Acara*</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="date"
                                            className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                        />
                                        <span className="text-gray-500 font-bold">-</span>
                                        <input
                                            type="date"
                                            className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* ini buat pilihan jenis acara milih yg mana sehari atau lebih dari sehari*/}
                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-3">Jenis Acara*</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="jenis_acara"
                                                value="sehari"
                                                checked={jenisAcara === 'sehari'}
                                                onChange={() => setJenisAcara('sehari')}
                                                className="w-4 h-4 text-[#800000] border-gray-300 focus:ring-[#8B0000]"
                                            />
                                            <span className="text-[#000000]">Sehari</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="jenis_acara"
                                                value="lebih_dari_sehari"
                                                checked={jenisAcara === 'lebih_dari_sehari'}
                                                onChange={() => setJenisAcara('lebih_dari_sehari')}
                                                className="w-4 h-4 text-[#800000] border-gray-300 focus:ring-[#8B0000]"
                                            />
                                            <span className="text-[#000000]">Lebih dari sehari</span>
                                        </label>
                                    </div>
                                </div>

                                {/* ini buat nama serial kontennya dan durasi kontennya kalo yg dipilih lebih dari sehari */}
                                {jenisAcara === 'lebih_dari_sehari' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-800 mb-2">Nama Serial Konten</label>
                                        <input
                                            type="text"
                                            placeholder="Masukkan nama serial konten..."
                                            className="w-full px-4 py-2.5 border border-[#EACACA] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400"
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-[#291714] mb-2">Durasi Konten*</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="date"
                                                    className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                                />
                                                <span className="text-gray-500 font-bold">-</span>
                                                <input
                                                    type="date"
                                                    className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* nah kalo yang ini jika hanya sehari */}
                                {jenisAcara === 'sehari' && (
                                    <div>
                                        <label className="block text-sm font-medium text-[#291714] mb-2">Tenggat Waktu Konten</label>
                                        <input
                                            type="date"
                                            className="px-4 py-2.5 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#800000] text-gray-700"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Media terkait</label>

                                    {/* link inputnya */}
                                    <textarea
                                        rows="3"
                                        placeholder="Masukan link disini..."
                                        className="w-full px-4 py-3 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400 resize-none"
                                    ></textarea>

                                    {/* ini buat drag and drop aja */}
                                    <div className="w-full h-40 bg-[#FBF0F0] border-2 border-dashed border-[#D4A3A3] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#f8e9e9] transition mt-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#995959] mb-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[#995959] text-sm font-medium">Masukkan media terkait...</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#291714] mb-2">Catatan Tambahan</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Berikan catatan tambahan untuk tim Branding FIF"
                                        className="w-full px-4 py-3 border border-[#E7BDB6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B0000] text-gray-700 placeholder-gray-400 resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* tombol sumitnya */}
                        <div className="flex justify-end border-t border-[#E5C3C3] pt-6">
                            <button
                                type="button"
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
        </div>
    );
}