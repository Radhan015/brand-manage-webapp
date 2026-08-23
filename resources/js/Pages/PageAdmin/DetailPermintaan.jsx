import React, { useState } from 'react';
import { getInitials } from "../../utils";
import { Head, Link, usePage, useForm, router } from "@inertiajs/react";

export default function DetailPermintaan({ requestData, users }) {
    const { auth } = usePage().props;
    const formatDateId = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    };


    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [outputUrl, setOutputUrl] = useState("");

    const { data, setData, post, processing } = useForm({
        pic_id: "",
        deadline: new Date().toISOString().split('T')[0],
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
    const statusText = isCompleted ? "Selesai" : (isInProgress ? "Berjalan" : "Pending");
    const [selectedStaff, setSelectedStaff] = useState("");
    const staffList = ['Andi Wijaya', 'Budi Santoso', 'Siti Rahmawati', 'Rina Saraswati'];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Detail Permintaan | SIMACO" />

            {/* sidebar buat pagenya */}
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
                    <Link href={route("logout")} method="post" as="button" className="flex items-center gap-3 text-[#5A413D] hover:bg-red-50 hover:text-red-700 px-4 py-3 rounded-lg font-bold transition w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Logout
                    </Link>
                </div>
            </aside>

            {/* wrapper kanan */}
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

                {/* main kontennya */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1100px]">
                    
                    {/* button kembali ke page permintaan */}
                    <Link href="/admin/permintaan" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#570000] transition font-medium mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Daftar Permintaan
                    </Link>

                    {/* bagian status dan judul */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-2 flex-wrap">
                            <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A1C1D] leading-tight tracking-tight">
                                {requestData?.event_name || "Tidak Ada Judul"}
                            </h1>
                            {/* status permintaannya */}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold border shadow-sm mt-1 ${isCompleted ? 'bg-green-100 text-green-700 border-green-200' : (isInProgress ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-700 border-red-100')}`}>
                                <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : (isInProgress ? 'bg-blue-500' : 'bg-red-500')}`}></span>
                                {statusText}
                            </span>
                        </div>
                        <p className="text-[#5A413D] text-[18px]">
                            ID Permintaan: REQ-{requestData?.id} | Disubmit pada: {formatDateId(requestData?.created_at)}
                        </p>
                    </div>

                    {/* buat 2 kolom */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        
                        {/* yang kiri informasi umum */}
                        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                <svg className="w-5 h-5 text-[#570000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h2 className="text-[24px] font-bold text-gray-900">Informasi Umum</h2>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">PEMOHON</h3>
                                <div className="flex items-center gap-3">
                                    {/* profile foto pemohonnya */} 
                                    <div className="w-10 h-10 rounded-full bg-[#570000] flex items-center justify-center text-xs font-bold text-white shrink-0">
                                          {getInitials(requestData?.user?.name || "AD")}
                                      </div>
                                    <div>
                                        <p className="text-[16px] font-bold text-gray-900 leading-snug">{requestData?.user?.name || "Unknown"}</p>
                                        <p className="text-[16px] text-[#5A413D] mt-0.5">{requestData?.user?.email || ""}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-gray-100 pt-5">
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">NOMOR HANDPHONE</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.user?.phone_number || "-"}</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">TANGGAL ACARA</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{formatDateId(requestData?.event_start_date)}</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">NAMA SERIAL KONTEN</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.theme_category_group || "-"}</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">TIPE KONTEN</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.content_type || "-"}</p>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider mb-1.5">TIPE PROYEK</h3>
                                    <p className="text-[16px] text-gray-800 font-medium">{requestData?.project_type || "-"}</p>
                                </div>
                            </div>
                        </div>


                        {/* bagian kanan detail konten sama kebutuhanya */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* card detail konten sama kebutuhanya */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                    <svg className="w-5 h-5 text-[#570000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <h2 className="text-lg font-bold text-gray-900">Detail Konten & Kebutuhan</h2>
                                </div>

                                {/* deskripsi kerjaan */}
                                <div className="mb-8">
                                    <h3 className="text-[16px] font-bold text-[#5A413D] uppercase tracking-wider mb-3">DESKRIPSI PEKERJAAN</h3>
                                    <div className="bg-[#F8F9FA] p-5 rounded-lg text-[16px] text-[#1A1C1D] leading-relaxed">
                                        {requestData?.description || "-"}
                                    </div>
                                </div>



                                <div>
                                    <h3 className="text-[16px] font-bold text-[#1A1C1D]  uppercase tracking-wider mb-3">TAUTAN REFERENSI / GOOGLE DRIVE</h3>
                                    <a href="#" className="bg-gray-50 hover:bg-gray-100 transition border border-gray-100 text-[#570000] px-3.5 py-2 rounded-md text-[16px] flex items-center gap-2.5 w-fit font-medium">
                                        {/* ikon buat link */}
                                        <svg className="w-4 h-4 text-[#570000] " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        drive.google.com/drive/folders/1a2b3c4d5e...
                                        <svg className="w-3.5 h-3.5 text-[#991B1B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                </div>
                            </div>

                            {/* card tambahan buat admin kalo blom di acc */}
                            {!isApproved && (
                                <div className="bg-[#EBEBEB] rounded-xl p-6 md:p-8">
                                    <h2 className="text-[24px] font-bold text-[#1A1C1D] mb-2">Tindakan Admin</h2>
                                    <p className="text-[#5A413D] text-[16px] mb-6">
                                        {requestData?.status === "new_request" 
                                            ? "Silakan tinjau detail permintaan di atas. Anda dapat menyetujui, menolak, atau menugaskan pekerjaan ini kepada staf desain terkait."
                                            : "Pekerjaan sedang diproses. Jika sudah selesai, silakan masukkan URL hasil pekerjaan (Drive/Link) di bawah ini lalu tandai sebagai selesai."}
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        
                                        {/* button buat acc / Tandai Selesai */}
                                        {requestData?.status === "in_progress" && (
                                            <div className="col-span-1 md:col-span-3 flex flex-col sm:flex-row items-center gap-3 w-full">
                                                <input
                                                    type="url"
                                                    placeholder="Masukkan URL Output (Drive/Link)"
                                                    value={outputUrl}
                                                    onChange={(e) => setOutputUrl(e.target.value)}
                                                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-[#570000] focus:border-[#570000] w-full flex-1"
                                                />
                                                <button
                                                    onClick={() => setShowConfirmModal(true)}
                                                    disabled={!outputUrl}
                                                    className="bg-[#570000] hover:bg-[#400000] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-50 min-h-[44px] w-full sm:w-auto shrink-0"
                                                >
                                                    Tandai Selesai
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
                                                    <span className="text-center leading-tight">Tolak</span>
                                                </button>
                                                <button 
                                                    onClick={() => setShowAssignModal(true)} 
                                                    className="bg-[#570000] hover:bg-[#400000] text-white px-4 py-3 rounded-lg text-sm font-semibold transition flex flex-col items-center justify-center gap-1.5 shadow-sm min-h-[70px] w-full"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                    <span className="text-center leading-tight">Terima &<br/>Beri Tugas</span>
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {showAssignModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">Beri Tugas ke Staf</h3>
                            <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleAssign} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pilih PIC / Staf <span className="text-red-500">*</span></label>
                                    <select required value={data.pic_id} onChange={e => setData("pic_id", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-[#570000] focus:border-[#570000]">
                                        <option value="">-- Pilih Staf --</option>
                                        {users && users.filter(u => u.role === 'admin').map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {requestData?.project_type?.toLowerCase().includes('liput') && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jadwal Liputan <span className="text-red-500">*</span></label>
                                        <input type="date" required value={data.coverage_date || ''} onChange={e => setData("coverage_date", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-[#570000] focus:border-[#570000] text-gray-700" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAssignModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition">Batal</button>
                                <button type="submit" disabled={processing} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#570000] hover:bg-[#400000] rounded-lg shadow-sm transition disabled:opacity-50">Tugaskan Sekarang</button>
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Selesaikan Tugas?</h3>
                            <p className="text-sm text-gray-500 mb-6">Tugas ini akan ditandai sebagai selesai dan URL output akan dikirimkan ke pemohon.</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={handleComplete} className="w-full bg-[#570000] hover:bg-[#400000] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition">Ya, Selesaikan</button>
                                <button onClick={() => setShowConfirmModal(false)} className="w-full text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition">Batal</button>
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Tolak Permintaan?</h3>
                            <p className="text-sm text-gray-500 mb-6">Permintaan ini akan ditolak dan dikembalikan ke pemohon.</p>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => {
                                        setShowRejectModal(false);
                                        router.post(`/admin/request/${requestData?.id}/status`, { status: "rejected" });
                                    }} 
                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                                >
                                    Ya, Tolak
                                </button>
                                <button onClick={() => setShowRejectModal(false)} className="w-full text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition">Batal</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}