import React from 'react';
import { getInitials } from "../../utils";
import { Head, Link } from '@inertiajs/react';

import { useState } from 'react';

export default function Permintaan({ auth, requests = [] }) {
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const today = new Date();
    
    // Perlu Tindakan: New Request
    const actionNeededRequests = requests.filter(r => r.status === 'new_request');
    const actionNeededCount = actionNeededRequests.length;

    // Mendekati Tenggat (48 jam)
    const upcomingDeadlines = requests
        .filter(r => (r.deadline || r.content?.deadline || r.event_start_date) && r.status !== 'completed' && r.status !== 'rejected')
        .map(r => {
            const d = new Date(r.deadline || r.content?.deadline || r.event_start_date);
            const diffHours = (d - today) / (1000 * 60 * 60);
            return { ...r, diffHours };
        })
        .filter(r => r.diffHours >= 0 && r.diffHours <= 48)
        .sort((a, b) => a.diffHours - b.diffHours);
    
    const deadlineCount = upcomingDeadlines.length;
    let deadlineText = "Tidak ada permintaan dalam kurun waktu 48 jam";
    if (deadlineCount > 0) {
        deadlineText = `Tenggat terdekat sisa ${Math.round(upcomingDeadlines[0].diffHours)} jam lagi`;
    }

    // Filter logic
    const filteredRequests = requests.filter(r => {
        if (filterStatus !== 'Semua') {
            if (filterStatus === 'Baru' && r.status !== 'new_request') return false;
            if (filterStatus === 'Berjalan' && r.status !== 'in_progress') return false;
            if (filterStatus === 'Selesai' && r.status !== 'completed') return false;
        }
        if (searchQuery) {
            const search = searchQuery.toLowerCase();
            return (r.event_name?.toLowerCase().includes(search) || 
                    r.user?.name?.toLowerCase().includes(search) || 
                    `req-${r.id}`.includes(search));
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Manajemen Permintaan | SIMACO" />

            {/* Bagian sidebar */}
            <aside className="w-64 bg-[#FCFCFC] border-r border-gray-200 fixed h-full z-20 flex flex-col pt-6">
                <div className="px-8 mb-10">
                    <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-24 w-auto object-contain" />
                </div>

                <div className="px-6 mb-2">
                    <p className="text-[10px] font-bold text-[#5A413D] uppercase tracking-widest">Utama</p>
                </div>

                <nav className="flex flex-col gap-1 px-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        Ringkasan Dashboard
                    </Link>
                    <Link href="/admin/asset" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Aset
                    </Link>
                    <Link href="/admin/permintaan" className="flex items-center gap-3 bg-[#570000] text-white px-4 py-3 rounded-lg font-medium shadow-sm mt-1">
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
                <p className="text-[14px] font-bold text-[#1A1C1D] leading-none">{auth?.user?.name || "Admin"}</p>
                <p className="text-[10px] font-bold text-[#5A413D] mt-1 tracking-wider uppercase">{auth?.user?.email || "admin@simaco.com"}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#570000] flex items-center justify-center text-white shadow-sm cursor-pointer">
                <span className="font-bold text-xs">{getInitials(auth?.user?.name)}</span>
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
                                <p className="text-3xl font-bold text-gray-900 mb-3">{requests.length}</p>
                                <p className="text-sm font-bold text-[#5A413D] flex items-center gap-1.5">
                                    {/* ikon panah naik */}                                 
                                    <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    Terkini
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
                                <p className="text-3xl font-bold text-[#BA1A1A] mb-3">{actionNeededCount}</p>
                                <p className="text-sm font-bold text-[#BA1A1A] flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-[#BA1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    {actionNeededCount} Permintaan Status Baru
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
                                <p className="text-3xl font-bold text-gray-900 mb-3">{deadlineCount}</p>
                                <p className="text-sm font-medium text-[#5A413D] flex items-center gap-1.5">
                                    {/* ikon jam */}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {deadlineText}
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
                                <button onClick={() => { setFilterStatus('Semua'); setCurrentPage(1); }} className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${filterStatus === 'Semua' ? 'bg-[#570000] text-white' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}>Semua</button>
                                <button onClick={() => { setFilterStatus('Baru'); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${filterStatus === 'Baru' ? 'bg-red-100 text-red-800' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}><span className="w-2 h-2 rounded-full bg-red-500"></span>Baru</button>
                                <button onClick={() => { setFilterStatus('Berjalan'); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${filterStatus === 'Berjalan' ? 'bg-blue-100 text-blue-800' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}><span className="w-2 h-2 rounded-full bg-blue-500"></span>Berjalan</button>
                                <button onClick={() => { setFilterStatus('Selesai'); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${filterStatus === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}><span className="w-2 h-2 rounded-full bg-green-500"></span>Selesai</button>
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
                                    value={searchQuery} 
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
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
                                    {(() => {
                                        const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage));
                                        const currentData = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                                        
                                        if (currentData.length === 0) {
                                            return <tr><td colSpan="7" className="py-4 px-6 text-center text-sm text-gray-500">Belum ada data</td></tr>;
                                        }
                                        
                                        return currentData.map((row, idx) => {
                                        const initials = getInitials(row.user?.name);
                                        const dateVal = row.deadline || row.event_start_date;
                                        const dateObj = dateVal ? new Date(dateVal) : null;
                                        const dateDay = dateObj && !isNaN(dateObj) ? dateObj.getDate() : '-';
                                        const dateMonth = dateObj && !isNaN(dateObj) ? dateObj.toLocaleString('id-ID', { month: 'short', year: 'numeric' }) : '-';
                                        
                                        return (
                                        <tr key={idx} className="hover:bg-gray-50 transition">
                                            <td className="py-5 px-6 text-sm text-[#5A413D] font-medium">#REQ-{row.id}</td>
                                            <td className="py-5 px-6">
                                                <p className="text-[15px] font-bold text-gray-900 leading-snug mb-1">{row.event_name}</p>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 bg-[#8B0000] text-white`}>
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 leading-snug">{row.user?.name || 'Unknown'}</p>
                                                        <p className="text-[11px] text-[#5A413D] mt-0.5">{row.user?.email || '-'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-1.5 text-sm text-[#5A413D] font-medium">
                                                    {row.project_type === 'Graphic Design' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}
                                                    {row.project_type === 'Video' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                                                    {row.project_type === 'Photography' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                                    {row.project_type || 'Unknown'}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <div className={`flex flex-col items-center justify-center text-[#5A413D]`}>
                                                    <span className="text-base font-bold mb-0.5">{dateDay}</span>
                                                    <span className="flex items-center gap-1 text-[11px] font-medium">
                                                        {dateMonth}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                {row.status === 'new_request' && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Baru
                                                    </span>
                                                )}
                                                {row.status === 'in_progress' && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Berjalan
                                                    </span>
                                                )}
                                                {row.status === 'completed' && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Selesai
                                                    </span>
                                                )}
                                                {!['new_request', 'in_progress', 'completed'].includes(row.status) && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>{row.status}
                                                    </span>
                                                )}
                                            </td>
                                            {/* ini button detail */}
                                            <td className="py-5 px-6">
                                                <div className="flex items-center justify-center">
                                                    <Link href={`/admin/detail-permintaan/${row.id}`} className="text-gray-400 hover:text-[#570000] p-1.5 rounded-full hover:bg-red-50 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        );
                                        });
                                    })()}
                                </tbody>
                            </table>
                        </div>

                        {/* footter untuk paling bawah tabelnya */}
                        {(() => {
                            const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage));
                            const startItem = filteredRequests.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1;
                            const endItem = Math.min(currentPage * itemsPerPage, filteredRequests.length);

                            return (
                                <div className="p-5 border-t border-gray-100 flex justify-between items-center bg-white">
                                    <span className="text-sm text-gray-500 font-medium">Menampilkan {startItem}-{endItem} dari {filteredRequests.length} permintaan</span>
                                    {totalPages > 1 && (
                                        <div className="flex items-center gap-1.5 text-sm font-semibold">
                                            <button 
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-gray-800 disabled:opacity-30 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            
                                            {Array.from({length: totalPages}, (_, i) => i + 1).map(pageNum => (
                                                <button 
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-8 h-8 flex items-center justify-center rounded transition ${currentPage === pageNum ? 'bg-[#570000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                                >
                                                    {pageNum}
                                                </button>
                                            ))}
                                            
                                            <button 
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="w-8 h-8 flex items-center justify-center rounded text-gray-800 hover:bg-gray-100 disabled:opacity-30 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                    </div>
                </main>
            </div>
        </div>
    );
}