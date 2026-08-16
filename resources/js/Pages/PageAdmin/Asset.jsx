import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Asset() {
    // --- DATA DUMMY MANAJEMEN TEMPLATE ---
    const templatesData = [
        { id: 1, title: 'Twibbon Instagram', link: 'link-twibbon-instagram.com' },
        { id: 2, title: 'Panduan Identitas Visual', link: 'simaco.ac.id/brand-guidelines' },
        { id: 3, title: 'Template Presentasi (PPT)', link: 'drive.google.com/templates-ppt' },
        { id: 4, title: 'Logo Universitas Resmi', link: 'drive.google.com/logo-universitas' },
    ];

    // --- DATA DUMMY MANAJEMEN ASSET PER KONTEN ---
    const kontenData = [
        { id: 1, title: 'Gathering Kopi Kenangan' },
        { id: 2, title: 'Tel-U Cup 2026' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Manajemen Aset | SIMACO" />

            {/* bagian sidebar */}
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

                    {/* Aset (Aktif) */}
                    <Link href="/asset" className="flex items-center gap-3 bg-[#570000] text-white px-4 py-3 rounded-lg font-medium shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Aset
                    </Link>

                    <Link href="/permintaan" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
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

            {/* bagian kanannya*/}
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
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1400px] mx-auto">

                    {/* bagian manajemen template*/}
                    <section className="mb-14">
                        {/* buat header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                    <h2 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">Manajemen Template</h2>
                                </div>
                                <p className="text-[#5A413D] text-[16px] ml-4.5">Kelola daftar tautan eksternal dan sumber daya penting untuk pengguna.</p>
                            </div>
                            <Link
                                href="/tambah-tautan"
                                className="bg-[#570000] hover:bg-[#400000] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                Tambah Tautan Baru
                            </Link>
                        </div>

                        {/* list untuk isian templatenya */}
                        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                            <div className="flex flex-col divide-y divide-gray-100">
                                {templatesData.map((item) => (
                                    <div key={item.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition group">
                                        <div>
                                            {/* buat nama template nya */}
                                            <h3 className="text-[18px] font-medium text-gray-900 mb-1.5">{item.title}</h3>
                                            {/* buat linknya biar bisa diklik */}
                                            <a href={`https://${item.link}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[16px] text-[#800000] hover:underline font-medium">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                                                {item.link}
                                            </a>
                                        </div>
                                        {/* style ikon hapus dan edit biar kek ngilang tapi kalo jelek bisa diapus  */}
                                       {/* <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition duration-200">*/}
                                       <div>
                                        
                                    <div className="flex items-center gap-3">
                                        {/* tombol dan ikon edit */}
                                    <Link href="/edit-template" className="text-[#991B1B] hover:text-[#570000] p-1.5 hover:bg-red-50 rounded-md transition">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </Link>

                                    {/* tombol dan ikon delete */}
                                    <button className="text-[#991B1B] hover:text-[#570000] p-1.5 hover:bg-red-50 rounded-md transition">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* bagian manajemen aset per konten terdaftar */}
                    <section className="mb-14">
                        {/* header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                    <h2 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">Manajemen Asset per Konten Terdaftar</h2>
                                </div>
                                <p className="text-[#5A413D] text-[16px] ml-4.5">Kelola daftar tautan eksternal dan sumber daya penting per konten.</p>
                            </div>
                            <Link
                                href="/tambah-tautan"
                                className="bg-[#570000] hover:bg-[#400000] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                Tambah Tautan Baru
                            </Link>
                        </div>

                        {/* List Konten */}
                        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                            <div className="flex flex-col divide-y divide-gray-100">
                                {kontenData.map((item) => (
                                    <Link href={`#detail-${item.id}`} key={item.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition group cursor-pointer">
                                        <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                                        <div className="text-gray-400 group-hover:text-gray-800 transition transform group-hover:translate-x-1">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}