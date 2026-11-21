import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLang, LangSwitch } from '@/i18n';
import NotificationBell from '@/Components/NotificationBell';

export default function RequestDetail({ req }) {
    const { t, intl } = useLang();
    // Filter out system notes if they exist
    const userNotes = req.additional_notes 
        ? req.additional_notes.split('---')[0].trim() 
        : '';
    // Old requests kept the platform inside the notes text
    const platformMatch = req.additional_notes?.match(/\[Platform Upload: (.*?)\]/);
    const platformUpload = req.platforms?.length ? req.platforms.map(p => p.name).join(', ') : (platformMatch ? platformMatch[1] : "-");
    const fmt = (d) => d ? new Date(d).toLocaleDateString(intl, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-';
    const range = (a, b) => !a ? '-' : (!b || a === b ? fmt(a) : `${fmt(a)} – ${fmt(b)}`);


    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-800 pb-12">
            <Head title={`${t('Detail Permintaan')} #${req.id} | SIMACO`} />
            
            {/* Header Area */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/my-requests" className="flex items-center gap-2 text-gray-500 hover:text-[#800000] font-semibold transition">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('Kembali')}
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <LangSwitch />
                        <NotificationBell />
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 mt-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-8 gap-4">
                        <div>
                            <span className="text-sm font-bold text-[#800000] mb-2 block tracking-wider uppercase">{t('Detail Permintaan')}</span>
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
                            {req.status === 'new_request' ? t('Baru') : 
                             req.status === 'in_progress' ? t('Berjalan') : 
                             req.status === 'completed' ? t('Selesai') : 
                             req.status === 'rejected' ? t('Ditolak') : req.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Kiri - Informasi Utama */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('Tipe Proyek')}</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.project_type?.name || '-'}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('Jenis Konten')}</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.content_type === 'single' ? t('Sekali Tayang') : (req.content_type === 'series' ? t('Konten Series') : '-')}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('Nama Serial Konten')}</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.serial_name || '-'}{req.theme_category_group ? ` (${req.theme_category_group})` : ''}
                                </p>
                            </div>
                            {req.content_type === 'series' && (
                                <div>
                                    <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('Periode Tayang Series')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                        {range(req.series_start_date, req.series_end_date)}
                                    </p>
                                </div>
                            )}
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('PIC (Penanggung Jawab)')}</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {req.content?.pic?.name || t('Belum Ditugaskan')}
                                </p>
                            </div>
                        </div>

                        {/* Kanan - Waktu & Tenggat */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('Tanggal Acara')}</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {range(req.event_start_date, req.event_end_date)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('Tenggat Waktu Konten')}</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {fmt(req.content_deadline)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-2">{t('Platform Tujuan')}</h3>
                                <p className="text-[16px] text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    {platformUpload}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 border-t border-gray-100 pt-8">
                        <div>
                            <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">{t('Deskripsi Kebutuhan')}</h3>
                            <div className="bg-[#F8F9FA] p-5 rounded-lg text-[15px] text-gray-800 leading-relaxed border border-gray-100 whitespace-pre-wrap">
                                {req.description || t('Tidak ada deskripsi')}
                            </div>
                        </div>

                        {userNotes && (
                            <div>
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">{t('Catatan Tambahan')}</h3>
                                <div className="bg-[#F8F9FA] p-5 rounded-lg text-[15px] text-gray-800 leading-relaxed border border-gray-100 whitespace-pre-wrap">
                                    {userNotes}
                                </div>
                            </div>
                        )}

                        {req.status === 'completed' && req.content?.output_url && (
                            <div>
                                <h3 className="text-[12px] font-bold text-green-700 uppercase tracking-wider mb-3">{t('Tautan Hasil / Output Pekerjaan')}</h3>
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
                                <h3 className="text-[12px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">{t('Materi / Referensi')}</h3>
                                <div className="space-y-3">
                                    {req.assets.map(asset => (
                                        <div key={asset.id} className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-[15px] text-gray-800 whitespace-pre-wrap leading-relaxed">
                                            {asset.asset_type === 'upload' ? (
                                                <a href={`/assets/${asset.id}/file`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-800 font-bold hover:underline break-all">
                                                    📎 {asset.asset_name}
                                                </a>
                                            ) : (asset.drive_url || '').split(/(\s+)/).map((word, i) => {
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
                                <h3 className="text-[12px] font-bold text-red-800 uppercase tracking-wider mb-2">{t('Feedback dari Tim Branding')}</h3>
                                <p className="text-[15px] text-red-900 leading-relaxed whitespace-pre-wrap">{req.review_feedback}</p>
                            </div>
                        )}

                        {req.status === 'rejected' && req.reject_reason && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-5">
                                <h3 className="text-[12px] font-bold text-red-800 uppercase tracking-wider mb-2">{t('Alasan Penolakan')}</h3>
                                <p className="text-[15px] text-red-900 leading-relaxed whitespace-pre-wrap">{req.reject_reason}</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
            <p className="text-center text-xs text-gray-400 py-6">Developed by KP Branding Team 2026</p>
        </div>
    );
}
