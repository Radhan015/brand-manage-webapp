import React, { useState } from 'react';
import { getInitials } from "../../utils";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

export default function DetailPermintaan({ requestData, users }) {
    const { t, intl } = useLang();
    const formatDateId = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString(intl, { day: "numeric", month: "long", year: "numeric" });
    };

    const userNotes = requestData?.additional_notes 
        ? requestData.additional_notes.split('---')[0].trim() 
        : '';
    // Old requests kept the platform inside the notes text
    const platformMatch = requestData?.additional_notes?.match(/\[Platform Upload: (.*?)\]/);
    const platformUpload = requestData?.platforms?.length ? requestData.platforms.map(p => p.name).join(', ') : (platformMatch ? platformMatch[1] : "-");
    const dateRange = (a, b) => !a ? "-" : (!b || a === b ? formatDateId(a) : `${formatDateId(a)} – ${formatDateId(b)}`);

    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [outputUrl, setOutputUrl] = useState("");

    const { data, setData, post, processing } = useForm({
        pic_id: "",
        deadline: requestData?.content_deadline?.slice(0, 10) || "",
        coverage_date: ""
    });

    const handleAssign = (e) => {
        e.preventDefault();
        post(`/admin/request/${requestData?.id}/assign`, {
            preserveScroll: true,
            onSuccess: () => setShowAssignModal(false)
        });
    };

    const handleComplete = (e) => {
        e.preventDefault();
        router.post(`/admin/request/${requestData?.id}/status`, { 
            status: "completed", 
            output_url: outputUrl 
        }, {
            preserveScroll: true,
            onSuccess: () => setShowConfirmModal(false)
        });
    };
    const [isApproved, setIsApproved] = useState(false);
    const isCompleted = requestData?.status === "completed";
    const isInProgress = requestData?.status === "in_progress";
    const isRejected = requestData?.status === "rejected";
    const statusText = isCompleted ? t('Selesai') : (isInProgress ? t('Berjalan') : (isRejected ? t('Ditolak') : t('Baru')));
    const [selectedStaff, setSelectedStaff] = useState("");
    const staffList = ['Andi Wijaya', 'Budi Santoso', 'Siti Rahmawati', 'Rina Saraswati'];

    return (
        <AdminLayout>
            <Head title={`${t('Detail Permintaan')} | SIMACO`} />

                {/* main kontennya */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">
                    
                    {/* button kembali ke page permintaan */}
                    <Link href="/admin/permintaan" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#570000] transition font-medium mb-6 ml-4">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        {t('Kembali ke Daftar Permintaan')}
                    </Link>

                    {/* bagian status dan judul */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <div className="w-1 h-8 md:h-10 bg-[#800000] rounded-sm"></div>
                            <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A1C1D] leading-tight tracking-tight">
                                {requestData?.event_name || t('Tidak ada judul')}
                            </h1>
                            {/* status permintaannya */}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold border shadow-sm mt-1 ml-1 ${isCompleted ? 'bg-green-100 text-green-700 border-green-200' : (isInProgress ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-700 border-red-100')}`}>
                                <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : (isInProgress ? 'bg-blue-500' : 'bg-red-500')}`}></span>
                                {statusText}
                            </span>
                        </div>
                        <p className="text-[#5A413D] text-[18px] ml-4 md:ml-5">
                            {t('ID Permintaan')}: REQ-{requestData?.id} | {t('Disubmit pada')}: {formatDateId(requestData?.created_at)}
                        </p>
                    </div>

                    {/* buat 2 kolom */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        
                        {/* yang kiri informasi umum */}
                        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                <svg className="w-5 h-5 text-[#570000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h2 className="text-[24px] font-bold text-gray-900">{t('Informasi Umum')}</h2>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">{t('Pemohon')}</h3>
                                <div className="flex items-center gap-3">
                                    {/* profile foto pemohonnya */} 
                                    <div className="w-10 h-10 rounded-full bg-[#570000] flex items-center justify-center text-xs font-bold text-white shrink-0">
                                          {getInitials(requestData?.user?.name || "AD")}
                                      </div>
                                    <div>
                                        <p className="text-[16px] font-bold text-gray-900 leading-snug">{requestData?.user?.name || t('Tidak diketahui')}</p>
                                        <p className="text-[16px] text-[#5A413D] mt-0.5">{requestData?.user?.email || ""}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-gray-100 pt-5">
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Nomor Handphone')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.user?.phone_number || "-"}</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Tanggal Acara')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{dateRange(requestData?.event_start_date, requestData?.event_end_date)}</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Tenggat Waktu Konten')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{formatDateId(requestData?.content_deadline)}</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Platform Tujuan')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{platformUpload}</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Nama Serial Konten')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.serial_name || "-"}{requestData?.theme_category_group ? ` (${requestData.theme_category_group})` : ""}</p>
                                </div>
                                {requestData?.content_type === 'series' && (
                                    <div className="col-span-2">
                                        <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Periode Tayang Series')}</h3>
                                        <p className="text-[16px] text-gray-800 font-medium">{dateRange(requestData?.series_start_date, requestData?.series_end_date)}</p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Jenis Konten')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.content_type === 'single' ? t('Sekali Tayang') : (requestData?.content_type === 'series' ? t('Konten Series') : '-')}</p>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">{t('Tipe Proyek')}</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.project_type?.name || "-"}</p>
                                </div>
                            </div>
                        </div>


                        {/* bagian kanan detail konten sama kebutuhanya */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* card detail konten sama kebutuhanya */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                    <svg className="w-5 h-5 text-[#570000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <h2 className="text-lg font-bold text-gray-900">{t('Detail Konten & Kebutuhan')}</h2>
                                </div>

                                {/* deskripsi kerjaan */}
                                <div className="mb-8">
                                    <h3 className="text-[16px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">{t('Deskripsi Pekerjaan')}</h3>
                                    <div className="bg-[#F8F9FA] p-5 rounded-lg text-[16px] text-[#1A1C1D] leading-relaxed">
                                        {requestData?.description || "-"}
                                    </div>
                                </div>

                                {/* catatan tambahan */}
                                {userNotes && (
                                    <div className="mb-8">
                                        <h3 className="text-[16px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">{t('Catatan Tambahan')}</h3>
                                        <div className="bg-[#F8F9FA] p-5 rounded-lg text-[16px] text-[#1A1C1D] leading-relaxed border border-gray-100 whitespace-pre-wrap">
                                            {userNotes}
                                        </div>
                                    </div>
                                )}
                                {requestData?.assets && requestData.assets.length > 0 && (
                                    <div>
                                        <h3 className="text-[16px] font-bold text-[#1A1C1D] uppercase tracking-wider mb-3">{t('Materi / Referensi')}</h3>
                                        <div className="space-y-3">
                                            {requestData.assets.map(asset => (
                                                <div key={asset.id} className="bg-gray-50 p-4 rounded-lg text-[15px] text-[#1A1C1D] leading-relaxed border border-gray-100 whitespace-pre-wrap">
                                                    {asset.asset_type === 'upload' ? (
                                                        <a href={`/assets/${asset.id}/file`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#570000] font-bold hover:underline break-all">
                                                            📎 {asset.asset_name}
                                                        </a>
                                                    ) : (asset.drive_url || '').split(/(\s+)/).map((word, i) => {
                                                        if (word.match(/^https?:\/\//i) || word.match(/^www\./i)) {
                                                            const href = word.startsWith('http') ? word : `https://${word}`;
                                                            return (
                                                                <a key={i} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-red-50 text-[#570000] px-2.5 py-0.5 rounded-md font-bold hover:bg-red-100 transition break-all border border-red-100 mx-0.5">
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
                            </div>

                            {/* card tambahan buat admin kalo blom di acc */}
                            {!isApproved && (
                                <div className="bg-[#EBEBEB] rounded-xl p-6 md:p-8">
                                    <h2 className="text-[24px] font-bold text-[#1A1C1D] mb-2">
                                        {requestData?.status === "rejected" || requestData?.status === "completed" ? t('Status Permintaan') : t('Tindakan Admin')}
                                    </h2>
                                    <p className="text-[#5A413D] text-[16px] mb-6">
                                        {requestData?.status === "new_request" 
                                            ? t('Silakan tinjau detail permintaan di atas. Anda dapat menyetujui, menolak, atau menugaskan pekerjaan ini kepada staf desain terkait.')
                                            : requestData?.status === "rejected"
                                            ? t('Permintaan ini telah Anda tolak. Tidak ada tindakan lebih lanjut yang diperlukan.')
                                            : requestData?.status === "completed"
                                            ? t('Pekerjaan ini telah selesai dan URL hasil telah dikirimkan ke pemohon.')
                                            : t('Pekerjaan sedang diproses. Jika sudah selesai, silakan masukkan URL hasil pekerjaan (Drive/Link) di bawah ini lalu tandai sebagai selesai.')}
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        
                                        {/* button buat acc / Tandai Selesai */}
                                        {requestData?.status === "in_progress" && (
                                            <div className="col-span-1 md:col-span-3 flex flex-col sm:flex-row items-center gap-3 w-full">
                                                <input
                                                    type="url"
                                                    placeholder={t('Masukkan URL Output (Drive/Link)')}
                                                    value={outputUrl}
                                                    onChange={(e) => setOutputUrl(e.target.value)}
                                                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-[#570000] focus:border-[#570000] w-full flex-1"
                                                />
                                                <button
                                                    onClick={() => setShowConfirmModal(true)}
                                                    disabled={!outputUrl}
                                                    className="bg-[#570000] hover:bg-[#400000] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-50 min-h-[44px] w-full sm:w-auto shrink-0"
                                                >
                                                    {t('Tandai Selesai')}
                                                </button>
                                            </div>
                                        )}
                                        {requestData?.status === "new_request" && (
                                            <div className="col-span-1 md:col-span-3 grid grid-cols-2 gap-4 w-full">
                                                <button 
                                                    onClick={() => setShowRejectModal(true)}
                                                    className="border border-red-600 text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg text-sm font-semibold transition flex flex-col items-center justify-center gap-1.5 shadow-sm min-h-[70px] w-full"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                    <span className="text-center leading-tight">{t('Tolak')}</span>
                                                </button>
                                                <button 
                                                    onClick={() => setShowAssignModal(true)} 
                                                    className="bg-[#570000] hover:bg-[#400000] text-white px-4 py-3 rounded-lg text-sm font-semibold transition flex flex-col items-center justify-center gap-1.5 shadow-sm min-h-[70px] w-full"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                    <span className="text-center leading-tight">{t('Terima &')}<br/>{t('Beri Tugas')}</span>
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>


            {showAssignModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">{t('Beri Tugas ke Staf')}</h3>
                            <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleAssign} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('Pilih PIC / Staf')} <span className="text-red-500">*</span></label>
                                    <select required value={data.pic_id} onChange={e => setData("pic_id", e.target.value)} className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:ring-[#570000] focus:border-[#570000]">
                                        <option value="">-- {t('Pilih Staf')} --</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('Deadline Pengerjaan')} <span className="text-red-500">*</span></label>
                                    <input type="date" required value={data.deadline} onChange={e => setData("deadline", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-[#570000] focus:border-[#570000] text-gray-700" />
                                    <p className="text-xs text-gray-500 mt-1">{t('Terisi otomatis dari tenggat konten pemohon. Boleh diubah.')}</p>
                                </div>
                                {requestData?.project_type?.name?.toLowerCase().includes('liput') && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('Jadwal Liputan')} <span className="text-red-500">*</span></label>
                                        <input type="date" required value={data.coverage_date || ''} onChange={e => setData("coverage_date", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-[#570000] focus:border-[#570000] text-gray-700" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAssignModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition">{t('Batal')}</button>
                                <button type="submit" disabled={processing} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#570000] hover:bg-[#400000] rounded-lg shadow-sm transition disabled:opacity-50">{t('Tugaskan Sekarang')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('Selesaikan tugas?')}</h3>
                            <p className="text-sm text-gray-500 mb-6">{t('Tugas ini akan ditandai sebagai selesai dan URL output akan dikirimkan ke pemohon.')}</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={handleComplete} className="w-full bg-[#570000] hover:bg-[#400000] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition">{t('Ya, selesaikan')}</button>
                                <button onClick={() => setShowConfirmModal(false)} className="w-full text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition">{t('Batal')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showRejectModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('Tolak permintaan?')}</h3>
                            <p className="text-sm text-gray-500 mb-4">{t('Permintaan ini akan ditolak dan dikembalikan ke pemohon.')}</p>
                            <textarea 
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4" 
                                placeholder={t('Alasan penolakan (opsional)')} 
                                id="reject_reason"
                            ></textarea>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => {
                                        const reason = document.getElementById('reject_reason').value;
                                        setShowRejectModal(false);
                                        router.post(`/admin/request/${requestData?.id}/status`, { status: "rejected", reject_reason: reason });
                                    }} 
                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                                >
                                    {t('Ya, tolak')}
                                </button>
                                <button onClick={() => setShowRejectModal(false)} className="w-full text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition">{t('Batal')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}