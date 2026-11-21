import React, { useState } from 'react';
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';


export default function EditTemplate({ template }) {
    const { t } = useLang();
    const { data, setData, put, processing, errors } = useForm({
        template_name: template?.template_name || '',
        template_type: template?.template_type || 'Tautan',
        template_url: template?.template_url || '',
        description: template?.description || ''
    });

    const charCount = (data.description || "").length;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (template && template.id) {
            put(`/admin/template/${template.id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title={`${t('Edit Tautan')} | SIMACO`} />

                {/* konten utama */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1400px]">
                    
                    {/* breadcrumb */}
                    <Link href="/admin/asset" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#570000] transition font-medium mb-6"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>{t('Kembali ke Aset')}</Link>

                    {/* header untuk pagenya */}
                    <div className="mb-8">
                        <h1 className="text-[32px] font-bold text-[#1A1C1D] leading-tight mb-2">
                            {t('Edit Tautan')}
                        </h1>
                        <p className="text-[#5A413D] text-[16px]">
                            {t('Edit detail tautan eksternal atau sumber daya penting di repositori SIMACO.')}
                        </p>
                    </div>

                    {/* card form buat edit */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        {/* buat desain atas form yg garis merah */}
                        <div className="h-2 w-full bg-[#570000]"></div>
                        
                        <div className="p-8 md:p-10 flex flex-col gap-8">
                            
                            {/* input buat nama tautan baru */}
                            <div className="w-full md:w-1/2">
                                <label className="block text-[16px] font-bold text-gray-900 mb-2.5">
                                    {t('Nama Tautan')} <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A413D]">
                                        {/* ikon di nama tautan */}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7c0-1.1.9-2 2-2h7.5l6 7-6 7H8a2 2 0 01-2-2V7z" />
                                        </svg>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="template_name"
value={data.template_name}
onChange={e => setData("template_name", e.target.value)}
                                        placeholder={t('Contoh: Twibbon Instagram')}
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[16px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#570000] focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            {/* input buat alamat url baru */}
                            <div className="w-full">
                                <label className="block text-[16px] font-bold text-gray-900 mb-2.5">
                                    {t('Alamat URL')} <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mb-2">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A413D]">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    </div>
                                    <input 
                                        type="url" 
                                        name="template_url"
value={data.template_url}
onChange={e => setData("template_url", e.target.value)}
                                        placeholder="https://"
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[16px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#570000] focus:border-transparent transition"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">{t('Pastikan URL dimulai dengan http:// atau https://')}</p>
                            </div>

                            {/* input buat deskripsi singkat */}
                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2.5">
                                    <label className="block text-[16px] font-bold text-gray-900">
                                        {t('Deskripsi Singkat (Opsional)')}
                                    </label>
                                    <span className={`text-xs ${charCount >= 200 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                                        {charCount}/200
                                    </span>
                                </div>
                                <textarea 
                                    name="description"
value={data.description}
onChange={e => setData("description", e.target.value)}
                                    rows="4"
                                    placeholder={t('Tambahkan konteks atau petunjuk penggunaan...')}
                                    className="w-full p-4 bg-white border border-gray-300 rounded-lg text-[16px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#570000] focus:border-transparent transition resize-y"
                                ></textarea>
                            </div>

                            {/* tombol batal dan simpan */}
                            <div className="flex items-center justify-end gap-4 mt-4">
                                <Link 
                                    href="/admin/asset" 
                                    className="text-sm font-bold text-[#570000] hover:bg-red-50 px-5 py-2.5 rounded-lg transition"
                                >
                                    {t('Batal')}
                                </Link>
                                <button type="submit" disabled={processing} className="bg-[#570000] hover:bg-[#400000] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition shadow-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    {t('Simpan Tautan')}
                                </button>
                            </div>

                        </div>
                    </form>
                </main>

        </AdminLayout>
    );
}