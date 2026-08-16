import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function DetailPermintaan() {
    const [isApproved, setIsApproved] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState("");
    const staffList = ['Andi Wijaya', 'Budi Santoso', 'Siti Rahmawati', 'Rina Saraswati'];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Detail Permintaan | SIMACO" />

            {/* sidebar buat pagenya */}
            <aside className="w-64 bg-[#FCFCFC] border-r border-gray-200 fixed h-full z-20 flex flex-col pt-6">
                <div className="px-8 mb-10">
                    <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-25 w-auto" />
                </div>
                
                <div className="px-6 mb-2">
                    <p className="text-[10px] font-bold text-[#5A413D] uppercase tracking-widest">Utama</p>
                </div>

                <nav className="flex flex-col gap-1 px-4">
                    <Link href="/dashboard" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        Ringkasan Dashboard
                    </Link>
                    <Link href="/asset" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Aset
                    </Link>
                    <Link href="/permintaan" className="flex items-center gap-3 bg-[#570000] text-white px-4 py-3 rounded-lg font-medium shadow-sm mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                        Manajemen Permintaan
                    </Link>

                    <Link href="/manajemen-konten" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        Manajemen Konten
                    </Link>
                </nav>
            </aside>

            {/* wrapper kanan */}
            <div className="flex-1 flex flex-col ml-64 relative min-h-screen">

                {/* header yg diatas buat profile sama notifikasi */}
                <header className="h-20 bg-white/50 backdrop-blur-md flex justify-end items-center px-8 sm:px-12 relative z-10">
                    <div className="flex items-center gap-6">
                        {/* ikon lonceng */}
                        <button className="relative text-gray-700 hover:text-gray-900 transition">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
                        </button>

                        {/* info user atau admin */}
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-[14px] font-bold text-[#1A1C1D] leading-none">Admin User</p>
                                <p className="text-[10px] font-bold text-[#5A413D] mt-1 tracking-wider uppercase">SUPER ADMIN</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#570000] flex items-center justify-center text-white shadow-sm cursor-pointer">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                            </div>
                        </div>
                    </div>
                </header>

                {/* main kontennya */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1100px]">
                    
                    {/* button kembali ke page permintaan */}
                    <Link href="/permintaan" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#570000] transition font-medium mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Daftar Permintaan
                    </Link>

                    {/* bagian status dan judul */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-2 flex-wrap">
                            <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A1C1D] leading-tight tracking-tight">
                                Brosur Penerimaan Mahasiswa Baru 2024
                            </h1>
                            {/* status permintaannya */}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold border shadow-sm mt-1 ${isApproved ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                <span className={`w-2 h-2 rounded-full ${isApproved ? 'bg-gray-400' : 'bg-red-500'}`}></span>
                                {isApproved ? 'Berjalan' : 'Pending'}
                            </span>
                        </div>
                        <p className="text-[#5A413D] text-[18px]">
                            ID Permintaan: REQ-2023-0842 | Disubmit pada: 12 Oktober 2023, 14:30 WIB
                        </p>
                    </div>

                    {/* buat 2 kolom */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        
                        {/* yang kiri informasi umum */}
                        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                <svg className="w-5 h-5 text-[#570000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h2 className="text-[24px] font-bold text-gray-900">Informasi Umum</h2>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">PEMOHON</h3>
                                <div className="flex items-center gap-3">
                                    {/* profile foto pemohonnya */} 
                                    <div className="w-10 h-10 rounded-full bg-[#570000] flex items-center justify-center text-xs font-bold text-white shrink-0">
                                        DR
                                    </div>
                                    <div>
                                        <p className="text-[16px] font-bold text-gray-900 leading-snug">Dr. Rina Saraswati</p>
                                        <p className="text-[16px] text-[#5A413D] mt-0.5">Fakultas Ilmu Komunikasi</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">TANGGAL ACARA</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">15 November<br/>2023</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">TIPE KONTEN</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">Sehari</p>
                                </div>
                            </div>
                        </div>


                        {/* bagian kanan detail konten sama kebutuhanya */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* card detail konten sama kebutuhanya */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                    <svg className="w-5 h-5 text-[#570000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <h2 className="text-lg font-bold text-gray-900">Detail Konten & Kebutuhan</h2>
                                </div>

                                {/* deskripsi kerjaan */}
                                <div className="mb-8">
                                    <h3 className="text-[16px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">DESKRIPSI PEKERJAAN</h3>
                                    <div className="bg-[#F8F9FA] p-5 rounded-lg text-[16px] text-[#1A1C1D] leading-relaxed">
                                        Membutuhkan desain ulang brosur penerimaan mahasiswa baru tahun 2024. Desain harus mencerminkan identitas visual universitas yang baru (Maroon & Gold), menonjolkan pencapaian fakultas, dan memiliki versi resolusi tinggi untuk cetak A4 serta versi PDF interaktif untuk distribusi WhatsApp.
                                    </div>
                                </div>

                                {/* buat aset apa yg diperlukannya trus pokoknya yang panjang itu iko aja */}
                                <div className="mb-8">
                                    <h3 className="text-[16px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">ASET YANG DIBUTUHKAN</h3>
                                    <div className="flex flex-col gap-2">
                                        <div className="bg-[#F4F4F5] text-gray-700 px-3.5 py-2 rounded-md text-[13px] flex items-center gap-2.5 w-fit font-medium">
                                            <svg className="w-4 h-4 text-[#1A1C1D] " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            Foto Gedung Utama (High-Res)
                                        </div>
                                        <div className="bg-[#F4F4F5] text-gray-700 px-3.5 py-2 rounded-md text-[13px] flex items-center gap-2.5 w-fit font-medium">
                                            <svg className="w-4 h-4 text-[#1A1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            Logo Vector (Primary & Secondary)
                                        </div>
                                        <div className="bg-[#F4F4F5] text-gray-700 px-3.5 py-2 rounded-md text-[13px] flex items-center gap-2.5 w-fit font-medium">
                                            <svg className="w-4 h-4 text-[#1A1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                            Copywriting Draft (Docx)
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[16px] font-bold text-[#1A1C1D]  uppercase tracking-wider mb-3">TAUTAN REFERENSI / GOOGLE DRIVE</h3>
                                    <a href="#" className="bg-gray-50 hover:bg-gray-100 transition border border-gray-100 text-[#570000] px-3.5 py-2 rounded-md text-[16px] flex items-center gap-2.5 w-fit font-medium">
                                        {/* ikon buat link */}
                                        <svg className="w-4 h-4 text-[#570000] " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        drive.google.com/drive/folders/1a2b3c4d5e...
                                        <svg className="w-3.5 h-3.5 text-[#991B1B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                </div>
                            </div>

                            {/* card tambahan buat admin kalo blom di acc */}
                            {!isApproved && (
                                <div className="bg-[#EBEBEB] rounded-xl p-6 md:p-8">
                                    <h2 className="text-[24px] font-bold text-[#1A1C1D] mb-2">Tindakan Admin</h2>
                                    <p className="text-[#5A413D] text-[16px] mb-6">
                                        Silakan tinjau detail permintaan di atas. Anda dapat menyetujui, menolak, atau menugaskan pekerjaan ini kepada staf desain terkait.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* button buat acc */}
                                        <button 
                                            onClick={() => setIsApproved(true)} 
                                            className="bg-[#570000] hover:bg-[#400000] text-white px-4 py-3 rounded-lg text-sm font-semibold transition flex flex-col items-center justify-center gap-1.5 shadow-sm min-h-[70px]"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="text-center leading-tight">Setujui<br/>Permintaan</span>
                                        </button>
                                        
                                        {/* buat tugasin ke staff */}
                                        <button className="bg-[#F4F4F5] hover:bg-gray-200 border border-gray-300 text-gray-800 px-4 py-3 rounded-lg text-sm font-semibold transition flex flex-col items-center justify-center gap-1.5 min-h-[70px]">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                                            <span className="text-center leading-tight">Tugaskan ke<br/>Staf</span>
                                        </button>
                                        
                                        {/* button buat nolak */}  
                                        <button className="bg-white hover:bg-red-50 border border-[#BA1A1A] text-[#BA1A1A] px-4 py-3 rounded-lg text-sm font-semibold transition flex flex-col items-center justify-center gap-1.5 min-h-[70px]">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="text-center leading-tight">Tolak</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}