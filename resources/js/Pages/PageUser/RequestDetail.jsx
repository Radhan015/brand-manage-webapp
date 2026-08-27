import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function RequestDetail({ req }) {
    // Filter out system notes if they exist
    const userNotes = req.additional_notes 
        ? req.additional_notes.split('---')[0].trim() 
        : '';

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-800 pb-12">
            <Head title={`Request Detail - #${req.id}`} />
            
            {/* Header Area */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/my-requests" className="flex items-center gap-2 text-gray-500 hover:text-[#800000] font-semibold transition">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 mt-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-8 gap-4">
                        <div>
                            <span className="text-sm font-bold text-[#800000] mb-2 block tracking-wider">DETAIL PERMINTAAN</span>
                            <h1 className="text-3xl font-bold text-gray-900">{req.event_name}</h1>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold ${
                            req.status === 'completed' ? 'bg-green-100 text-green-800' :
                            req.status === 'rejected' ? 'bg-red-50 text-red-700' :
                            req.status === 'new_request' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                            <span className={`w-2 h-2 rounded-full ${
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Kiri - Informasi Utama */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">TIPE PROYEK</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.project_type || '-'}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">TIPE KONTEN (DURASI)</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.content_type === 'sehari' ? 'Sehari' : (req.content_type === 'lebih_dari_sehari' ? 'Lebih dari sehari' : (req.content_type || '-'))}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">NAMA SERIAL KONTEN</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.theme_category_group || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Kanan - Waktu & Tenggat */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">TANGGAL ACARA</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.event_end_date ? new Date(req.event_end_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">TENGGAT WAKTU PENGERJAAN</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.event_start_date ? new Date(req.event_start_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 border-t border-gray-100 pt-8">
                        <div>
                            <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">DESKRIPSI KEBUTUHAN</h3>
                            <div className="bg-[#F8F9FA] p-5 rounded-lg text-[15px] text-gray-800 leading-relaxed border border-gray-100 whitespace-pre-wrap">
                                {req.description || 'Tidak ada deskripsi'}
                            </div>
                        </div>

                        {userNotes && (
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">CATATAN TAMBAHAN</h3>
                                <div className="bg-[#F8F9FA] p-5 rounded-lg text-[15px] text-gray-800 leading-relaxed border border-gray-100 whitespace-pre-wrap">
                                    {userNotes}
                                </div>
                            </div>
                        )}

                        {req.status === 'completed' && req.content?.output_url && (
                            <div>
                                <h3 className="text-[12px] font-bold text-green-700 uppercase tracking-wider mb-3">TAUTAN HASIL / OUTPUT PEKERJAAN</h3>
                                <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <a href={req.content.output_url} target="_blank" rel="noreferrer" className="text-green-700 font-bold hover:underline truncate">
                                        {req.content.output_url}
                                    </a>
                                </div>
                            </div>
                        )}

                        {req.assets && req.assets.length > 0 && (
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">TAUTAN MATERI / REFERENSI</h3>
                                <div className="space-y-3">
                                    {req.assets.map(asset => (
                                        <div key={asset.id} className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-[15px] text-gray-800 whitespace-pre-wrap leading-relaxed">
                                            {asset.drive_url.split(/(\s+)/).map((word, i) => {
                                                if (word.match(/^https?:\/\//i) || word.match(/^www\./i)) {
                                                    const href = word.startsWith('http') ? word : `https://${word}`;
                                                    return (
                                                        <a key={i} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md font-bold hover:bg-blue-200 transition break-all border border-blue-200 mx-0.5">
                                                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                            {word}
                                                        </a>
                                                    );
                                                }
                                                return <span key={i}>{word}</span>;
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {req.review_feedback && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-5">
                                <h3 className="text-[12px] font-bold text-red-800 uppercase tracking-wider mb-2">FEEDBACK DARI TIM BRANDING</h3>
                                <p className="text-[15px] text-red-900 leading-relaxed whitespace-pre-wrap">{req.review_feedback}</p>
                            </div>
                        )}

                        {req.status === 'rejected' && req.reject_reason && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-5">
                                <h3 className="text-[12px] font-bold text-red-800 uppercase tracking-wider mb-2">ALASAN PENOLAKAN</h3>
                                <p className="text-[15px] text-red-900 leading-relaxed whitespace-pre-wrap">{req.reject_reason}</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
