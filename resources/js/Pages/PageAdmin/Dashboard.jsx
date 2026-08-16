import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
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
                    <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-25 w-auto" />
                </div>

                <div className="px-6 mb-2">
                    <p className="text-[10px] font-bold text-[#5A413D] uppercase tracking-widest">Utama</p>
                </div>

                <nav className="flex flex-col gap-1 px-4">
                    <Link href="/dashboard" className="flex items-center gap-3 bg-[#570000] text-white px-4 py-3 rounded-lg font-medium shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        Ringkasan Dashboard
                    </Link>
                    <Link href="/asset" className="flex items-center gap-3 text-[#5A413D]  hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Aset
                    </Link>
                    <Link href="/permintaan" className="flex items-center gap-3 text-[#5A413D]  hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
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

            {/* bagian utama */}
            <main className="ml-64 w-full p-8 md:p-12 relative overflow-hidden bg-[#F8F9FA] min-h-screen">
                <img
                    src="/images/Dashboard/Vector.png"
                    alt="Background Decor"
                    className="absolute top-0 right-0 h-full w-auto object-cover object-right pointer-events-none z-0"
                />

                <div className="max-w-5xl relative z-10">

                    {/* buat header nya */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-3 tracking-tight">
                            Selamat pagi, <span className="text-[#570000]">Admin.</span>
                        </h1>
                        <p className="text-[#5A413D] text-[15px] leading-relaxed max-w-2xl">
                            Berikut adalah ringkasan aktivitas aset brand harian Anda. Anda memiliki <span className="font-bold text-[#1A1C1D]">24 permintaan aktif</span> yang memerlukan perhatian Anda.
                        </p>
                    </div>

                    {/* bagian kalender untuk diliput */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h2 className="text-xl font-bold text-[#1A1C1D]">Kalender Liput</h2>
                        </div>

                        <div className="space-y-4">
                            {kalenderData.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg border border-[#E2BFB9] flex items-stretch overflow-hidden shadow-sm hover:shadow-md transition">

                                    {/*  kiri tanggal */}
                                    <div className="w-20 bg-white flex flex-col items-center justify-center border-l-4 border-l-[#570000] shrink-0">
                                        <span className="text-xs font-bold text-[#570000]">{item.date}</span>
                                        <span className="text-xl font-black text-[#570000] leading-none mt-1">{item.day}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-px h-14 bg-[#E2BFB9]"></div>
                                    </div>

                                    {/* isiannya */}
                                    <div className="p-4 pl-5 flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-[#1A1C1D] mb-1.5 text-[15px]">{item.title}</h3>
                                        <div className="flex items-center gap-4 text-xs text-[#5A413D] mb-2.5">
                                            {/* ikon untuk jamnya */}
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-[#5A413D]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z" /></svg>
                                                {item.time}
                                            </span>
                                            {/* icon untuk lokasi */}
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-[#5A413D]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.589 2 4 5.589 4 10c0 5.281 7.234 11.516 7.613 11.84.113.097.256.16.4.16s.287-.063.4-.16C12.766 21.516 20 15.281 20 10c0-4.411-3.589-8-8-8zm0 11c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" /></svg>
                                                {item.location}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {item.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-[#EEEEEE] text-[#5A413D] text-[11px] font-medium px-2 py-0.5 rounded">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-px h-14 bg-[#E2BFB9]"></div>
                                    </div>

                                    {/* buat avatar di kanan*/}
                                    <div className="px-5 flex items-center gap-2 shrink-0">
                                        <div className="flex -space-x-1.5">
                                            {item.avatars.map((av, idx) => (
                                                <div key={idx} className="w-7 h-7 rounded-full bg-[#E3E3E3] border-[1.5px] border-white flex items-center justify-center text-[9px] font-extrabold text-gray-900">{av}</div>
                                            ))}
                                        </div>
                                        {/* ini tag */}
                                        <span className="text-xs font-black text-gray-900 ml-1">{item.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-sm font-bold text-[#570000] hover:underline cursor-pointer inline-flex items-center gap-1">
                            Lihat Semua <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
                                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                                </div>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-5xl font-black text-gray-900">24</span>
                                    <span className="text-sm font-semibold text-red-500">Perlu Tindakan</span>
                                </div>
                                <div className="flex gap-1 h-1.5 w-full">
                                    <div className="w-1/3 bg-[#BA1A1A] rounded-l-full"></div>
                                    <div className="w-1/3 bg-[#BA1A1A]"></div>
                                    <div className="w-1/3 bg-gray-200 rounded-r-full"></div>
                                </div>
                            </div>

                            {/* card tenggat waktu dari konten*/}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xs font-bold text-[#5A413D] uppercase tracking-wider">Tenggat Waktu Mendatang</h3>
                                        {/* ini ikon tnggat*/}
                                        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-gray-900">8</span>
                                        <span className="text-sm font-semibold text-gray-500">Next 7 days</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-6 border-t border-gray-100 pt-3">
                                    <span>Mon</span><span>Wed</span><span>Fri</span>
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
                            {todoData.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg border border-[#E2BFB9] flex items-stretch overflow-hidden shadow-sm hover:shadow-md transition">

                                    {/* untuk tanggal */}
                                    <div className="w-20 bg-white flex flex-col items-center justify-center border-l-4 border-l-[#570000] shrink-0">
                                        <span className="text-xs font-bold text-[#570000]">{item.date}</span>
                                        <span className="text-xl font-black text-[#570000] leading-none mt-1">{item.day}</span>
                                    </div>
                                    <div className="w-px bg-[#E2BFB9] my-4"></div>

                                    {/* bagian tengah nya */}
                                    <div className="p-4 pl-5 flex-1 flex flex-col justify-center py-5">
                                        <h3 className="font-bold text-gray-900 mb-2 text-[15px]">{item.title}</h3>

                                        {/* mapping buat sub task*/}
                                        <div className="space-y-2 mb-3">
                                            {item.task ? (
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <div className="w-3.5 h-3.5 rounded-full border border-[#D4A3A3]"></div>
                                                    <span>{item.task}</span>
                                                </div>
                                            ) : (
                                                item.tasks.map((t, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                        {t.isDone ? (
                                                            /* ini kalo udah selesai / atau yg lagi dikerjain idk ntar tanya irvan/bagus */
                                                            <div className="w-3.5 h-3.5 rounded-full border border-[#570000] flex items-center justify-center">
                                                                <div className="w-1.5 h-1.5 bg-[#570000] rounded-full"></div>
                                                            </div>
                                                        ) : (
                                                            /* ini kalo belom selesai / atau yg harus dikerjain idk */
                                                            <div className="w-3.5 h-3.5 rounded-full border border-[#D4A3A3]"></div>
                                                        )}
                                                        <span>{t.name}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-gray-600 mb-2.5">
                                            {/* icon jamnya */}
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-[#593F3B]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z" /></svg>
                                                {item.time}
                                            </span>
                                            {/* kalo yg ini ikon lokasi */}
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-[#593F3B]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.589 2 4 5.589 4 10c0 5.281 7.234 11.516 7.613 11.84.113.097.256.16.4.16s.287-.063.4-.16C12.766 21.516 20 15.281 20 10c0-4.411-3.589-8-8-8zm0 11c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" /></svg>
                                                {item.location}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {item.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-[#EEEEEE] text-[#593F3B] text-[11px] font-medium px-2 py-0.5 rounded">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    {/* garis yg kanan*/}
                                    <div className="w-px bg-[#E2BFB9] my-4"></div>

                                    {/* bagian kanan avatar */}
                                    <div className="px-5 flex items-center gap-2 shrink-0">
                                        <div className="flex -space-x-1.5">
                                            {item.avatars.map((av, idx) => (
                                                <div key={idx} className="w-7 h-7 rounded-full bg-[#E3E3E3] border-[1.5px] border-white flex items-center justify-center text-[9px] font-extrabold text-gray-900">{av}</div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-gray-900 ml-1">{item.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-sm font-bold text-[#570000] hover:underline cursor-pointer inline-flex items-center gap-1">
                            Lihat Semua <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                    </section>

                    {/* bagian daftar permintaan */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                <h2 className="text-xl font-bold text-[#1A1C1D]">Daftar permintaan Konten</h2>
                            </div>
                            <Link href="/permintaan" className="text-sm font-bold text-[#570000] hover:underline cursor-pointer inline-flex items-center gap-1">
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
                                    {permintaanData.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition">
                                            {/* row buat id */}
                                            <td className="py-4 px-6 text-sm font-bold text-[#5A413D]">{row.id}</td>
                                            {/* row buat judul proyek */}
                                            <td className="py-4 px-6 text-sm font-bold text-[#1A1C1D]">{row.title}</td>
                                            {/* row buat pemohon */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${row.initials === 'DR' ? 'bg-[#8B0000]' : 'bg-gray-300 text-gray-700'}`}>
                                                        {row.initials}
                                                    </div>
                                                    {/* nama pemohon */}
                                                    <span className="text-sm text-[#1A1C1D]">{row.name}</span>
                                                </div>
                                            </td>
                                            {/* row buat tipe proyek */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-sm text-[#5A413D]">
                                                    {/* ini ikon untuk tipe proyek keknya nggak perlu dah  */}
                                                    {row.type === 'Video' ? (
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    )}
                                                    {row.type}
                                                </div>
                                            </td>
                                            {/* row statusnya */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${row.statusColor}`}>
                                                    {row.icon === 'check' ? (
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                    ) : (
                                                        <span className={`w-1.5 h-1.5 rounded-full ${row.dot}`}></span>
                                                    )}
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}