import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Permintaan() {
    // --- DATA DUMMY TABEL PERMINTAAN ---
    const tableData = [
        {
            id: '#REQ-042',
            title: 'Kampanye Penerimaan Mahasiswa Baru 2024',
            desc: 'Desain spanduk, brosur, dan aset media sos',
            pemohon: 'Dr. Rina Suryani',
            dept: 'Fakultas Ekonomi',
            initials: 'DR',
            initialBg: 'bg-[#8B0000]',
            type: 'Graphic Design',
            dateDay: '24',
            dateMonth: 'Okt 2023',
            isLate: true,
            status: 'Baru',
            statusDot: 'bg-red-500',
            statusBg: 'bg-red-50 text-red-700'
        },
        {
            id: '#REQ-041',
            title: 'Video Profil Laboratorium Sains',
            desc: 'Shooting fasilitas lab terbaru untuk website',
            pemohon: 'Andi Wijaya',
            dept: 'Fakultas MIPA',
            initials: 'AW',
            initialBg: 'bg-gray-200 text-gray-700',
            type: 'Video',
            dateDay: '02',
            dateMonth: 'Nov 2023',
            isLate: false,
            status: 'Berjalan',
            statusDot: 'bg-gray-400',
            statusBg: 'bg-gray-100 text-gray-700'
        },
        {
            id: '#REQ-040',
            title: 'Dokumentasi Seminar Internasional',
            desc: 'Foto sesi pleno dan workshop',
            pemohon: 'Siti Rahmawati',
            dept: 'Humas Universitas',
            initials: 'SP',
            initialBg: 'bg-gray-600 text-white',
            type: 'Photography',
            dateDay: '20',
            dateMonth: 'Okt 2023',
            isLate: false,
            status: 'Review',
            statusDot: 'bg-red-500',
            statusBg: 'bg-gray-100 text-gray-700'
        },
        {
            id: '#REQ-039',
            title: 'Redesain Logo BEM',
            desc: 'Pembaruan identitas visual organisasi mahas',
            pemohon: 'Budi Santoso',
            dept: 'BEM Universitas',
            initials: 'BM',
            initialBg: 'bg-gray-200 text-gray-700',
            type: 'Graphic Design',
            dateDay: '15',
            dateMonth: 'Okt 2023',
            isLate: false,
            status: 'Selesai',
            isDone: true,
            statusBg: 'bg-gray-200 text-gray-700'
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Manajemen Permintaan | SIMACO" />

            {/* Bagian sidebar */}
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
                    <Link href="/asset" className="flex items-center gap-3 text-[#5A413D]  hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Aset
                    </Link>
                    <Link href="/permintaan" className="flex items-center gap-3 bg-[#570000] text-white px-4 py-3 rounded-lg font-medium shadow-sm mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                        Manajemen Permintaan
                    </Link>
                    <Link href="/manajemen-konten" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        Manajemen Konten
                    </Link>
                </nav>
            </aside>

            {/* bagian seluruh kanan */}
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

                {/*    bagian utama */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">

                    {/* bagian headernya */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h1 className="text-[32px] font-bold text-[#1A1C1D] leading-none tracking-tight">Penerimaan Permintaan</h1>
                        </div>
                        <p className="text-[#5A413D] text-[16px] ml-4.5 max-w-xl">
                            Kelola dan tinjau semua permintaan aset branding yang diajukan oleh unit kerja dan fakultas.
                        </p>
                    </div>

                    {/* card statusnya */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* card total permintaan */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-[#5A413D] uppercase tracking-wider mb-2">TOTAL PERMINTAAN</h3>
                                <p className="text-3xl font-bold text-gray-900 mb-3">142</p>
                                <p className="text-sm font-bold text-[#5A413D] flex items-center gap-1.5">
                                    {/* ikon panah naik */}                                 
                                    <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    +12% dari bulan lalu
                                </p>
                            </div>
                            {/* ikon keranjang */}
                            <div className="w-12 h-12 rounded-full bg-[#F4F4F4] flex items-center justify-center text-gray-700">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg>
                            </div>
                        </div>

                        {/* card tindakan*/}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-[#5A413D] uppercase tracking-wider mb-2">PERLU TINDAKAN</h3>
                                <p className="text-3xl font-bold text-[#BA1A1A] mb-3">24</p>
                                <p className="text-sm font-bold text-[#BA1A1A] flex items-center gap-1.5">
                                    {/* ikon peringatan */}
                                    <svg className="w-4 h-4 text-[#BA1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    8 Permintaan Status Baru
                                </p>
                            </div>
                            {/* ikon peringatan juga ini */}
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                        </div>

                        {/* card deadline */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-[#5A413D] uppercase tracking-wider mb-2">MENDEKATI TENGGAT</h3>
                                <p className="text-3xl font-bold text-gray-900 mb-3">15</p>
                                <p className="text-sm font-medium text-[#5A413D] flex items-center gap-1.5">
                                    {/* ikon jam */}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Tenggat dalam 48 jam
                                </p>
                            </div>
                            {/* icon jam juga */}
                            <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center text-gray-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* tabel isian permintaan  */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                        {/* tabel bagian atasnya ada filter sama pencarian */}  
                        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white">
                            {/* untuk filter status berbentuk pill */}
                            <div className="flex flex-wrap gap-2">
                                <button className="bg-[#570000] text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm">Semua</button>
                                <button className="bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D] px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>Baru
                                </button>
                                <button className="bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D] px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>Berjalan
                                </button>
                                <button className="bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D] px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>Review
                                </button>
                                <button className="bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D] px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>Selesai
                                </button>
                            </div>

                            {/* ini buat pencariannya */}
                            <div className="relative w-full lg:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari permintaan..."
                                    className="w-full py-2 pl-9 pr-4 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#570000] text-gray-800 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* tabel utama */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F8F9FA] border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">ID</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider w-1/3">JUDUL PROYEK</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">PEMOHON</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">TIPE PROYEK</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider text-center">TENGGAT WAKTU</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">STATUS</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider text-center">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {tableData.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition">
                                          {/* buat kolom id, judul, pemohon, tipe, deadline, status, dan aksinya */}
                                            <td className="py-5 px-6 text-sm text-[#5A413D] font-medium">{row.id}</td>
                                            <td className="py-5 px-6">
                                                <p className="text-[15px] font-bold text-gray-900 leading-snug mb-1">{row.title}</p>
                                                <p className="text-[12px] text-gray-500 truncate">{row.desc}</p>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${row.initialBg}`}>
                                                        {row.initials}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 leading-snug">{row.pemohon}</p>
                                                        <p className="text-[11px] text-[#5A413D] mt-0.5">{row.dept}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-1.5 text-sm text-[#5A413D] font-medium">
                                                    {row.type === 'Graphic Design' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}
                                                    {row.type === 'Video' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                                                    {row.type === 'Photography' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                                    {row.type}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <div className={`flex flex-col items-center justify-center ${row.isLate ? 'text-red-600' : 'text-[#5A413D]'}`}>
                                                    <span className="text-base font-bold mb-0.5">{row.dateDay}</span>
                                                    <span className="flex items-center gap-1 text-[11px] font-medium">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        {row.dateMonth}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${row.statusBg}`}>
                                                    {row.isDone ? (
                                                        <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                    ) : (
                                                        <span className={`w-1.5 h-1.5 rounded-full ${row.statusDot}`}></span>
                                                    )}
                                                    {row.status}
                                                </span>
                                            </td>
                                            {/* ini button detail */}
<td className="py-5 px-6">
                                                <div className="flex items-center justify-center">
                                                    <Link 
                                                        href="/detail-permintaan" 
                                                        className="block text-gray-400 hover:text-[#5A413D] hover:bg-gray-100 p-1.5 rounded-md transition duration-200"
                                                    >
                                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                                            <circle cx="7.5" cy="12" r="1.5" fill="currentColor" />
                                                            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                                            <circle cx="16.5" cy="12" r="1.5" fill="currentColor" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* footter untuk paling bawah tabelnya */}
                        <div className="p-5 border-t border-gray-100 flex justify-between items-center bg-white">
                            <span className="text-sm text-gray-500 font-medium">Menampilkan 1-4 dari 142 permintaan</span>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-gray-800 transition">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#570000] text-white">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 transition">2</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 transition">3</button>
                                <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 transition">36</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-gray-800 hover:bg-gray-100 transition">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}