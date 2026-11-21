import React from 'react';
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

export default function TambahTautan() {
    const { t } = useLang();
    const { data, setData, post, processing } = useForm({
        template_name: "",
        template_type: "Tautan",
        template_url: "",
        description: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/template");
    };

    return (
        <AdminLayout>
            <Head title={`${t('Tambah Tautan Baru')} | SIMACO`} />

                {/* main konten*/}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1400px]">

                    {/* breadcrumb */}
                    <Link href="/admin/asset" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#570000] transition font-medium mb-6"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>{t('Kembali ke Aset')}</Link>

                    {/* header dari pagenya */}
                    <div className="mb-10">
                        <h1 className="text-[32px] font-bold text-gray-900 mb-2 tracking-tight">{t('Tambah Tautan Baru')}</h1>
                        <p className="text-[#5A413D] text-[16px]">{t('Masukkan detail tautan eksternal atau sumber daya penting baru ke dalam repositori SIMACO.')}</p>
                    </div>

                    {/* form card untuk tautan */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 border-t-[6px] border-t-[#570000] p-8 md:p-10 relative overflow-hidden">
                        <form onSubmit={submit} className="relative z-10 space-y-7">

                            {/* input namanya */}
                            <div>
                                <label className="block text-[16px] font-bold text-gray-900 mb-2">
                                    {t('Nama Tautan')} <span className="text-[#BA1A1A]">*</span>
                                </label>
                                <div className="relative md:w-1/2">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A413D]">
                                        {/* ikon di nama tautan */}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7c0-1.1.9-2 2-2h7.5l6 7-6 7H8a2 2 0 01-2-2V7z" />
                                        </svg>
                                    </div>
                                    <input type="text" required value={data.template_name} onChange={e => setData("template_name", e.target.value)} placeholder={t('Contoh: Twibbon Instagram')}
                                        className="w-full py-2.5 pl-11 pr-4 border border-gray-300 rounded-lg text-[18px] focus:outline-none focus:ring-1 focus:ring-[#570000] focus:border-[#570000] placeholder-gray-400 text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* input alamat urlnya */}
                            <div>
                                <label className="block text-[16px] font-bold text-gray-900 mb-2">
                                    {t('Alamat URL')} <span className="text-[#BA1A1A]">*</span>
                                </label>
                                <div className="relative">
                                    {/* ikon di url */}
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A413D]">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    </div>
                                    <input type="url" required value={data.template_url} onChange={e => setData("template_url", e.target.value)} placeholder="https://"
                                        className="w-full py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg text-[18px] focus:outline-none focus:ring-1 focus:ring-[#570000] focus:border-[#570000] placeholder-gray-400 text-gray-800"
                                    />
                                </div>
                                <p className="text-[14px] text-[#5A413D] mt-2">{t('Pastikan URL dimulai dengan http:// atau https://')}</p>
                            </div>

                            {/* input buat deskripsi konten */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <label className="block text-[16px] font-bold text-gray-900">
                                        {t('Deskripsi Singkat (Opsional)')}
                                    </label>
                                    <span className="text-[13px] text-[#5A413D] font-medium">{data.description.length}/200</span>
                                </div>
                                <textarea rows="4" maxLength="200" value={data.description} onChange={e => setData("description", e.target.value)} placeholder={t('Tambahkan konteks atau petunjuk penggunaan...')}
                                    className="w-full p-4 border border-gray-300 rounded-lg text-[18px] focus:outline-none focus:ring-1 focus:ring-[#570000] focus:border-[#570000] placeholder-gray-400 text-gray-800 resize-none"
                                ></textarea>
                            </div>

                            {/* button batal ama simpan */}
                            <div className="flex items-center justify-end gap-6 pt-4">
                                <Link
                                    href="/admin/asset"
                                    className="text-[#570000] font-bold text-sm hover:underline transition"
                                >
                                    {t('Batal')}
                                </Link>
                                <button type="submit" disabled={processing} className="bg-[#570000] hover:bg-[#400000] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm flex items-center gap-2 disabled:opacity-50"
                                >
                                    {/* ikon save nya yg bentuknya floppy disk*/}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h9.5L19 7.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v5h8V3" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    </svg>
                                    {t('Simpan Tautan')}
                                </button>
                            </div>

                        </form>
                    </div>

                </main>

        </AdminLayout>
    );
}