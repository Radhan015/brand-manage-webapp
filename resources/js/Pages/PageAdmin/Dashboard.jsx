import React from 'react';
import { getInitials } from "../../utils";
import {  Head, Link , usePage } from "@inertiajs/react";

export default function Dashboard({ requests = [], coverages = [] }) {

    const { auth } = usePage().props;
    // --- DATA DUMMY UNTUK KALENDER ---
    const kalenderData = [
        {
            id: 1, date: 'AUG', day: '16', title: 'Sidang Terbuka Dies Natalis',
            time: '08:00 - 12:00 WIB', location: 'Gedung Aula Utama Lt. 3',
            tags: ['Sehari'], avatars: ['BR', 'HR'], count: '5+'
        },
        {
            id: 2, date: 'AUG', day: '16', title: 'Tel-U Cup Catur',
            time: '07:00 - 10:00 WIB', location: 'Gd. Pelampong',
            tags: ['Lebih dari Sehari', 'Tel-U Cup 2026'], avatars: ['BR', 'HR'], count: '2+'
        },
        {
            id: 3, date: 'AUG', day: '17', title: 'Tel-U Cup Basket Putra',
            time: '07:00 - 10:00 WIB', location: 'Sports Center',
            tags: ['Lebih dari Sehari', 'Tel-U Cup 2026'], avatars: ['BR', 'HR'], count: '4+'
        },
    ];

    // --- DATA DUMMY UNTUK TO-DO LIST ---
    const todoData = [
        {
            id: 1, date: 'AUG', day: '13', title: 'Gathering Kopi Kenangan',
            task: 'Poster Gathering', isDone: false,
            time: '08:00 - 12:00 WIB', location: 'Kopi Kenangan Buah Batu',
            tags: ['Sehari'], avatars: ['BR', 'HR'], count: '5+'
        },
        {
            id: 2, date: 'AUG', day: '14', title: 'Tel-U Cup Padel',
            tasks: [{ name: 'Editing', isDone: false }, { name: 'Copywriting', isDone: true }],
            time: '07:00 - 10:00 WIB', location: 'Gd. Pelampong',
            tags: ['Lebih dari Sehari', 'Tel-U Cup 2026'], avatars: ['BR', 'CD'], count: '3+'
        },
        {
            id: 3, date: 'AUG', day: '14', title: 'Tel-U Cup Basket Putri',
            tasks: [{ name: 'Editing', isDone: false }, { name: 'Copywriting', isDone: true }],
            time: '07:00 - 10:00 WIB', location: 'Sports Center',
            tags: ['Lebih dari Sehari', 'Tel-U Cup 2026'], avatars: ['BR', 'CD'], count: '2+'
        },
    ];

    // --- DATA DUMMY UNTUK TABEL PERMINTAAN ---
    const permintaanData = [
        { id: '#REQ-042', title: 'Kampanye Penerimaan Mahasiswa Baru 2024', name: 'Dr. Rina Suryani', initials: 'DR', type: 'Graphic Design', status: 'Baru', statusColor: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
        { id: '#REQ-041', title: 'Video Profil Laboratorium Sains', name: 'Andi Wijaya', initials: 'AW', type: 'Video', status: 'Berjalan', statusColor: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' },
        { id: '#REQ-039', title: 'Redesain Logo BEM', name: 'Budi Santoso', initials: 'BM', type: 'Graphic Design', status: 'Selesai', statusColor: 'bg-gray-200 text-gray-800', dot: 'bg-gray-500', icon: 'check' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Dashboard | SIMACO" />

            {/* bagian sidebanya */}
            <aside className="w-64 bg-[#FCFCFC] border-r border-gray-200 fixed h-full z-20 flex flex-col pt-6">
                <div className="px-8 mb-10">
                    <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-24 w-auto object-contain" />
                </div>

                <div className="px-6 mb-2">
                    <p className="text-[10px] font-bold text-[#5A413D] uppercase tracking-widest">Utama</p>
                </div>

                <nav className="flex flex-col gap-1 px-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 bg-[#570000] text-white px-4 py-3 rounded-lg font-medium shadow-sm mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        Ringkasan Dashboard
                    </Link>
                    <Link href="/admin/asset" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Aset
                    </Link>
                    <Link href="/admin/permintaan" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                        Manajemen Permintaan
                    </Link>
                    <Link href="/admin/manajemen-konten" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                        Manajemen Penugasan
                    </Link>
                </nav>
                <div className="mt-auto px-4 mb-6">
                    <Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 text-[#5A413D] hover:bg-red-50 hover:text-red-700 px-4 py-3 rounded-lg font-bold transition w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Logout
                    </Link>
                </div>
            </aside>

            {/* bagian utama */}
            
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
                                <p className="text-[14px] font-bold text-[#1A1C1D] leading-none">{auth?.user?.name || "Admin User"}</p>
                                <p className="text-[10px] font-bold text-[#5A413D] mt-1 tracking-wider uppercase">{auth?.user?.email || "admin@simaco.com"}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#570000] flex items-center justify-center text-white shadow-sm cursor-pointer">
                                <span className="font-bold text-xs">{getInitials(auth?.user?.name)}</span>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="w-full p-8 md:p-12 relative overflow-hidden bg-[#F8F9FA] flex-1">
                <img
                    src="/images/Dashboard/Vector.png"
                    alt="Background Decor"
                    className="absolute top-0 right-0 h-full w-auto object-cover object-right pointer-events-none z-0"
                />

                <div className="max-w-5xl relative z-10">

                    {/* buat header nya */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-3 tracking-tight">
                            Selamat {(() => { const h = new Date().getHours(); return h < 11 ? 'pagi' : h < 15 ? 'siang' : h < 18 ? 'sore' : 'malam'; })()}, <span className="text-[#570000]">Admin.</span>
                        </h1>
                        <p className="text-[#5A413D] text-[15px] leading-relaxed max-w-2xl">
                            Berikut adalah ringkasan aktivitas aset brand harian Anda. Anda memiliki <span className="font-bold text-[#1A1C1D]">{requests.filter(r => r.status === 'new_request' || r.status === 'in_progress').length} permintaan aktif</span> yang memerlukan perhatian Admin nich :D
                        </p>
                    </div>

                    {/* bagian kalender untuk diliput */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h2 className="text-xl font-bold text-[#1A1C1D]">Kalender Liput</h2>
                        </div>

                        <div className="space-y-4">
                            {coverages.slice(0, 3).map((item) => {
    const dateObj = new Date(item.date);
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.getDate().toString().padStart(2, "0");
    return (
        <div key={item.id} className="bg-white rounded-lg border border-[#E2BFB9] flex items-stretch overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="w-20 bg-white flex flex-col items-center justify-center border-l-4 border-l-[#570000] shrink-0">
                <span className="text-xs font-bold text-[#570000]">{month}</span>
                <span className="text-xl font-black text-[#570000] leading-none mt-1">{day}</span>
            </div>
            <div className="flex items-center">
                <div className="w-px h-14 bg-[#E2BFB9]"></div>
            </div>
            <div className="p-4 pl-5 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-[#1A1C1D] mb-1.5 text-[15px]">{item.name || item.title || "Coverage"}</h3>
                <div className="flex items-center gap-4 text-xs text-[#5A413D] mb-2.5">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#5A413D]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z" /></svg>
                        {item.time || "-"}
                    </span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-px h-14 bg-[#E2BFB9]"></div>
            </div>
            <div className="px-5 flex items-center gap-2 shrink-0">
                <div className="flex -space-x-1.5">
                    <div className="w-7 h-7 rounded-full bg-[#E3E3E3] border-[1.5px] border-white flex items-center justify-center text-[9px] font-extrabold text-gray-900">
                        {getInitials(item.pic?.name || "AD")}
                    </div>
                </div>
            </div>
        </div>
    );
})}
                        </div>
                        
                    </section>

                    {/* bagian progres dari kontenya */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h2 className="text-xl font-bold text-[#1A1C1D]">Status Progress Konten</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* ini card permintaan aktif*/}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xs font-bold text-[#5A413D] uppercase tracking-wider">Permintaan Aktif</h3>
                                    {/* ini ikon permintaan aktif*/}
                                    <svg className="w-5 h-5 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                                </div>
                                {(() => {
                                    const count = requests.filter(r => r.status === 'new_request' || r.status === 'in_progress').length;
                                    const tColor = count < 10 ? 'text-[#2a5c2d]' : count < 20 ? 'text-[#b8860b]' : 'text-[#BA1A1A]';
                                    const bColor = count < 10 ? 'bg-[#2a5c2d]' : count < 20 ? 'bg-[#b8860b]' : 'bg-[#BA1A1A]';
                                    return (
                                        <>
                                            <div className="flex items-baseline gap-2 mb-6">
                                                <span className="text-5xl font-black text-gray-900">{count}</span>
                                                <span className={`text-sm font-semibold ${tColor}`}>Perlu Tindakan</span>
                                            </div>
                                            <div className="flex gap-1 h-1.5 w-full">
                                                <div className={`w-1/3 ${bColor} rounded-l-full`}></div>
                                                <div className={`w-1/3 ${count >= 10 ? bColor : 'bg-gray-200'}`}></div>
                                                <div className={`w-1/3 ${count >= 20 ? bColor : 'bg-gray-200'} rounded-r-full`}></div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* card tenggat waktu dari konten*/}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xs font-bold text-[#5A413D] uppercase tracking-wider">Sedang Dikerjakan</h3>
                                        {/* ini ikon tnggat*/}
                                        <svg className="w-5 h-5 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-gray-900">{requests.filter(r => r.status === 'in_progress').length}</span>
                                        <span className="text-sm font-semibold text-[#5A413D]">Proses Berjalan</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* bagian to-do-list */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h2 className="text-xl font-bold text-[#1A1C1D]">To-Do List</h2>
                        </div>

                        <div className="space-y-4">
                            {requests.filter(r => r.status === "in_progress").slice(0, 3).map((item) => {
    const dateObj = new Date(item.created_at || new Date());
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.getDate().toString().padStart(2, "0");
    return (
        <div key={item.id} className="bg-white rounded-lg border border-[#E2BFB9] flex items-stretch overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="w-20 bg-white flex flex-col items-center justify-center border-l-4 border-l-[#570000] shrink-0">
                <span className="text-xs font-bold text-[#570000]">{month}</span>
                <span className="text-xl font-black text-[#570000] leading-none mt-1">{day}</span>
            </div>
            <div className="w-px bg-[#E2BFB9] my-4"></div>
            <div className="p-4 pl-5 flex-1 flex flex-col justify-center py-5">
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">{item.event_name}</h3>
                <div className="flex items-center gap-2 mt-auto">
                    <span className="px-2.5 py-1 rounded bg-[#F8F9FA] text-[10px] font-bold text-gray-600 border border-gray-200">
                        PIC: {item.content?.pic?.name || item.pic?.name || auth?.user?.name || "Admin"}
                    </span>
                </div>
            </div>
            <div className="w-px bg-[#E2BFB9] my-4"></div>
            <div className="px-5 flex items-center gap-2 shrink-0">
                <div className="flex -space-x-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#E3E3E3] flex items-center justify-center text-xs font-bold text-gray-700 shrink-0">
                        {getInitials(item.content?.pic?.name || item.pic?.name || auth?.user?.name || "Admin")}
                    </div>
                </div>
            </div>
        </div>
    );
})}
                        </div>
                        
                    </section>

                    {/* bagian daftar permintaan */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                <h2 className="text-xl font-bold text-[#1A1C1D]">Daftar permintaan Konten</h2>
                            </div>
                            <Link href="/admin/permintaan" className="text-sm font-bold text-[#570000] hover:underline cursor-pointer inline-flex items-center gap-1">
                                Lihat Semua <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                        {/* tabel daftarnya*/}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-[#F8F9FA] border-b border-gray-200">
                                    <tr>
                                        <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Judul Proyek</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Pemohon</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Tipe Proyek</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {requests.slice(0, 10).map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition">
                                            <td className="py-4 px-6 text-sm font-bold text-[#5A413D]">#REQ-{row.id}</td>
                                            <td className="py-4 px-6 text-sm font-bold text-[#1A1C1D]">{row.event_name}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-gray-400">{getInitials(row.user?.name)}</div>
                                                    <span className="text-sm text-[#1A1C1D]">{row.user?.name || "Unknown"}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-sm text-[#5A413D]">
                                                    {row.project_type || "Unknown"}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {row.status === "new_request" && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Baru
                                                    </span>
                                                )}
                                                {row.status === "in_progress" && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Berjalan
                                                    </span>
                                                )}
                                                {row.status === "completed" && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Selesai
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main> </div> </div> ); }