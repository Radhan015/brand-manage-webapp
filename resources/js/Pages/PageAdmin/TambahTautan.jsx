import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function TambahTautan() {
    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Tambah Tautan | SIMACO" />

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

            {/* Bagian kanan */}
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

                {/* main konten*/}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1400px]">

                    {/* breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-[#5A413D] mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        <span>Aset</span>
                        <svg className="w-3 h-3 text-[#5A413D] mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        <span>Manajemen Tautan</span>
                        <svg className="w-3 h-3 text-[#5A413D] mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        <span className="font-semibold text-gray-800">Tambah Baru</span>
                    </div>

                    {/* header dari pagenya */}
                    <div className="mb-10">
                        <h1 className="text-[32px] font-bold text-gray-900 mb-2 tracking-tight">Tambah Tautan Baru</h1>
                        <p className="text-[#5A413D] text-[16px]">Masukkan detail tautan eksternal atau sumber daya penting baru ke dalam repositori SIMACO.</p>
                    </div>

                    {/* form card untuk tautan */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 border-t-[6px] border-t-[#570000] p-8 md:p-10 relative overflow-hidden">
                        <form className="relative z-10 space-y-7">

                            {/* input namanya */}
                            <div>
                                <label className="block text-[16px] font-bold text-gray-900 mb-2">
                                    Nama Tautan <span className="text-[#BA1A1A]">*</span>
                                </label>
                                <div className="relative md:w-1/2">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A413D]">
                                        {/* ikon di nama tautan */}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7c0-1.1.9-2 2-2h7.5l6 7-6 7H8a2 2 0 01-2-2V7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Twibbon Instagram"
                                        className="w-full py-2.5 pl-11 pr-4 border border-gray-300 rounded-lg text-[18px] focus:outline-none focus:ring-1 focus:ring-[#570000] focus:border-[#570000] placeholder-gray-400 text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* input alamat urlnya */}
                            <div>
                                <label className="block text-[16px] font-bold text-gray-900 mb-2">
                                    Alamat URL <span className="text-[#BA1A1A]">*</span>
                                </label>
                                <div className="relative">
                                    {/* ikon di url */}
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A413D]">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="https://"
                                        className="w-full py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg text-[18px] focus:outline-none focus:ring-1 focus:ring-[#570000] focus:border-[#570000] placeholder-gray-400 text-gray-800"
                                    />
                                </div>
                                <p className="text-[14px] text-[#5A413D] mt-2">Pastikan URL dimulai dengan http:// atau https://</p>
                            </div>

                            {/* input buat deskripsi konten */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <label className="block text-[16px] font-bold text-gray-900">
                                        Deskripsi Singkat (Opsional)
                                    </label>
                                    <span className="text-[13px] text-[#5A413D] font-medium">0/200</span>
                                </div>
                                <textarea
                                    rows="4"
                                    placeholder="Tambahkan konteks atau petunjuk penggunaan..."
                                    className="w-full p-4 border border-gray-300 rounded-lg text-[18px] focus:outline-none focus:ring-1 focus:ring-[#570000] focus:border-[#570000] placeholder-gray-400 text-gray-800 resize-none"
                                ></textarea>
                            </div>

                            {/* button batal ama simpan */}
                            <div className="flex items-center justify-end gap-6 pt-4">
                                <Link
                                    href="/asset"
                                    className="text-[#570000] font-bold text-sm hover:underline transition"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"

                                    className="bg-[#570000] hover:bg-[#400000] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm flex items-center gap-2"
                                >
                                    {/* ikon save nya yg bentuknya floppy disk*/}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h9.5L19 7.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v5h8V3" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    </svg>
                                    Simpan Tautan
                                </button>
                            </div>

                        </form>
                    </div>

                </main>
            </div>
        </div>
    );
}