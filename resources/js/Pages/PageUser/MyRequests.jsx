import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function MyRequests({ requests }) {
    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-800">
            <Head title="Dashboard Request | SIMACO" />
            
            {/* Header/Navbar Area */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-10 w-auto" />
                        </Link>
                        <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
                        <h1 className="text-xl font-bold text-[#800000] hidden sm:block">Dashboard Request</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition">Beranda</Link>
                        <Link href={route('logout')} method="post" as="button" className="text-sm font-semibold text-red-500 hover:text-red-700 transition">Log Out</Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight mb-2">Permintaan Saya</h2>
                        <p className="text-[#5A413D] text-[16px]">Pantau status dan kelola semua pengajuan konten Anda di sini.</p>
                    </div>
                    <Link href="/request-form" className="inline-flex items-center gap-2 bg-[#800000] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-900 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        Buat Permintaan Baru
                    </Link>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                    {requests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Permintaan</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mb-6">Anda belum pernah mengajukan permintaan konten. Klik tombol di atas untuk mulai membuat request pertama Anda.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-[#F8F9FA] border-b border-gray-100">
                                    <tr>
                                        <th className="py-5 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">NAMA ACARA</th>
                                        <th className="py-5 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">TANGGAL PENGAJUAN</th>
                                        <th className="py-5 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider">STATUS</th>
                                        <th className="py-5 px-6 text-xs font-bold text-[#5A413D] uppercase tracking-wider text-right">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {requests.map((req) => (
                                        <tr key={req.id} className="hover:bg-red-50/30 transition group">
                                            <td className="py-5 px-6">
                                                <p className="text-[16px] font-bold text-gray-900 leading-snug">{req.event_name}</p>
                                                <p className="text-[13px] text-gray-500 mt-0.5">{req.project_type || 'General'}</p>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-2 text-[14px] text-gray-600 font-medium">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {new Date(req.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold ${
                                                    req.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    req.status === 'rejected' ? 'bg-red-50 text-red-700' :
                                                    req.status === 'new_request' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        req.status === 'completed' ? 'bg-green-500' :
                                                        req.status === 'rejected' ? 'bg-red-500' :
                                                        req.status === 'new_request' ? 'bg-red-500' :
                                                        'bg-blue-500'
                                                    }`}></span>
                                                    {req.status === 'new_request' ? 'Baru' : 
                                                     req.status === 'in_progress' ? 'Berjalan' : 
                                                     req.status === 'completed' ? 'Selesai' : 
                                                     req.status === 'rejected' ? 'Ditolak' : req.status}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-right">
                                                <Link href={`/my-requests/${req.id}`} className="inline-flex items-center justify-center bg-gray-50 hover:bg-[#800000] text-gray-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition border border-gray-200 hover:border-transparent">
                                                    Lihat Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
