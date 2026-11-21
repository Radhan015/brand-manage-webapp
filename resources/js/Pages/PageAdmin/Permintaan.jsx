import React from 'react';
import { getInitials } from "../../utils";
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

import { useState } from 'react';

export default function Permintaan({ auth, requests = [] }) {
    const { t, intl } = useLang();
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
        .filter(r => (r.content_deadline || r.content?.deadline || r.event_start_date) && r.status !== 'completed' && r.status !== 'rejected')
        .map(r => {
            const d = new Date(r.content_deadline || r.content?.deadline || r.event_start_date);
            const diffHours = (d - today) / (1000 * 60 * 60);
            return { ...r, diffHours };
        })
        .filter(r => r.diffHours >= 0 && r.diffHours <= 48)
        .sort((a, b) => a.diffHours - b.diffHours);
    
    const deadlineCount = upcomingDeadlines.length;
    let deadlineText = t('Tidak ada permintaan dalam kurun waktu 48 jam');
    if (deadlineCount > 0) {
        deadlineText = t('Tenggat terdekat sisa :n jam lagi', { n: Math.round(upcomingDeadlines[0].diffHours) });
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
        <AdminLayout>
            <Head title={`${t('Manajemen Permintaan')} | SIMACO`} />

                {/*    bagian utama */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">

                    {/* bagian headernya */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h1 className="text-[32px] font-bold text-[#1A1C1D] leading-none tracking-tight">{t('Penerimaan Permintaan')}</h1>
                        </div>
                        <p className="text-[#5A413D] text-[16px] ml-4.5 max-w-xl">
                            {t('Kelola dan tinjau semua permintaan aset branding yang diajukan oleh unit kerja dan fakultas.')}
                        </p>
                    </div>

                    {/* card statusnya */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* card total permintaan */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-[#5A413D] uppercase tracking-wider mb-2">{t('Total Permintaan')}</h3>
                                <p className="text-3xl font-bold text-gray-900 mb-3">{requests.length}</p>
                                <p className="text-sm font-bold text-[#5A413D] flex items-center gap-1.5">
                                    {/* ikon panah naik */}                                 
                                    <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    {t('Terkini')}
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
                                <h3 className="text-sm font-semibold text-[#5A413D] uppercase tracking-wider mb-2">{t('Perlu Tindakan')}</h3>
                                <p className="text-3xl font-bold text-[#BA1A1A] mb-3">{actionNeededCount}</p>
                                <p className="text-sm font-bold text-[#BA1A1A] flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-[#BA1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    {t(':n permintaan berstatus baru', { n: actionNeededCount })}
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
                                <h3 className="text-sm font-semibold text-[#5A413D] uppercase tracking-wider mb-2">{t('Mendekati Tenggat')}</h3>
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
                                <button onClick={() => { setFilterStatus('Semua'); setCurrentPage(1); }} className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${filterStatus === 'Semua' ? 'bg-[#570000] text-white' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}>{t('Semua')}</button>
                                <button onClick={() => { setFilterStatus('Baru'); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${filterStatus === 'Baru' ? 'bg-red-100 text-red-800' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}><span className="w-2 h-2 rounded-full bg-red-500"></span>{t('Baru')}</button>
                                <button onClick={() => { setFilterStatus('Berjalan'); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${filterStatus === 'Berjalan' ? 'bg-blue-100 text-blue-800' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}><span className="w-2 h-2 rounded-full bg-blue-500"></span>{t('Berjalan')}</button>
                                <button onClick={() => { setFilterStatus('Selesai'); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${filterStatus === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-[#F4F4F4] hover:bg-gray-200 text-[#5A413D]'}`}><span className="w-2 h-2 rounded-full bg-green-500"></span>{t('Selesai')}</button>
                            </div>

                            {/* ini buat pencariannya */}
                            <div className="relative w-full lg:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder={t('Cari permintaan...')}
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
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider w-1/3">{t('Judul Proyek')}</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">{t('Pemohon')}</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">{t('Tipe Proyek')}</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider text-center">{t('Tenggat Waktu')}</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">{t('Status')}</th>
                                        <th className="py-4 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider text-center">{t('Aksi')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {(() => {
                                        const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage));
                                        const currentData = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                                        
                                        if (currentData.length === 0) {
                                            return <tr><td colSpan="7" className="py-4 px-6 text-center text-sm text-gray-500">{t('Belum ada data')}</td></tr>;
                                        }
                                        
                                        return currentData.map((row, idx) => {
                                        const initials = getInitials(row.user?.name);
                                        const dateVal = row.content_deadline || row.event_start_date;
                                        const dateObj = dateVal ? new Date(dateVal) : null;
                                        const dateDay = dateObj && !isNaN(dateObj) ? dateObj.getDate() : '-';
                                        const dateMonth = dateObj && !isNaN(dateObj) ? dateObj.toLocaleString(intl, { month: 'short', year: 'numeric' }) : '-';
                                        
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
                                                        <p className="text-sm font-bold text-gray-900 leading-snug">{row.user?.name || t('Tidak diketahui')}</p>
                                                        <p className="text-[11px] text-[#5A413D] mt-0.5">{row.user?.email || '-'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-1.5 text-sm text-[#5A413D] font-medium">
                                                    {row.project_type?.name === 'Graphic Design' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}
                                                    {row.project_type?.name === 'Video' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                                                    {row.project_type?.name === 'Photography' && <svg className="w-4 h-4 text-[#5A413D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                                    {row.project_type?.name || t('Tidak diketahui')}
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
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>{t('Baru')}
                                                    </span>
                                                )}
                                                {row.status === 'in_progress' && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{t('Berjalan')}
                                                    </span>
                                                )}
                                                {row.status === 'completed' && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{t('Selesai')}
                                                    </span>
                                                )}
                                                {!['new_request', 'in_progress', 'completed'].includes(row.status) && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>{row.status === 'rejected' ? t('Ditolak') : row.status}
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
                                    <span className="text-sm text-gray-500 font-medium">{t('Menampilkan :from-:to dari :total permintaan', { from: startItem, to: endItem, total: filteredRequests.length })}</span>
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

        </AdminLayout>
    );
}