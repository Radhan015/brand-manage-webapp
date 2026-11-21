import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

export default function Asset({ auth, flash, templatesData = [], kontenData = [] }) {
    const { t } = useLang();
    const [deleteId, setDeleteId] = useState(null);

    // --- DATA DUMMY MANAJEMEN TEMPLATE ---
    

    // --- DATA DUMMY MANAJEMEN ASSET PER KONTEN ---
    

    return (
        <AdminLayout>
            <Head title={`${t('Manajemen Aset')} | SIMACO`} />

                {/* main kontennya */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1400px] mx-auto">
                    
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-sm">{flash.success}</span>
                        </div>
                    )}

                    {/* bagian manajemen template*/}
                    <section className="mb-14">
                        {/* buat header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                    <h2 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">{t('Manajemen Template')}</h2>
                                </div>
                                <p className="text-[#5A413D] text-[16px] ml-4.5">{t('Kelola daftar tautan eksternal dan sumber daya penting untuk pengguna.')}</p>
                            </div>
                            <Link
                                href="/admin/tambah-tautan"
                                className="bg-[#570000] hover:bg-[#400000] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                {t('Tambah Tautan Baru')}
                            </Link>
                        </div>

                        {/* list untuk isian templatenya */}
                        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                            <div className="flex flex-col divide-y divide-gray-100">
                                {templatesData.length === 0 ? <div className="p-4 text-sm text-gray-500 text-center bg-white rounded-lg border border-gray-200 mb-4">{t('Belum ada data')}</div> : templatesData.map((item) => (
                                    <div key={item.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition group">
                                        <div>
                                            {/* buat nama template nya */}
                                            <h3 className="text-[18px] font-medium text-gray-900 mb-1.5">{(item.template_name || item.content_name)}</h3>
                                            {/* buat linknya biar bisa diklik */}
                                            <a href={`https://${(item.template_url || '#')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[16px] text-[#800000] hover:underline font-medium">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                                                {(item.template_url || '#')}
                                            </a>
                                        </div>
                                        {/* style ikon hapus dan edit biar kek ngilang tapi kalo jelek bisa diapus  */}
                                       {/* <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition duration-200">*/}
                                       <div>
                                        
                                    <div className="flex items-center gap-3">
                                        {/* tombol dan ikon edit */}
                                    <Link href={`/admin/edit-template/${item.id}`} className="text-[#991B1B] hover:text-[#570000] p-1.5 hover:bg-red-50 rounded-md transition">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </Link>

                                    {/* tombol dan ikon delete */}
                                    <button onClick={() => setDeleteId(item.id)} className="text-[#991B1B] hover:text-[#570000] p-1.5 hover:bg-red-50 rounded-md transition">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* bagian manajemen aset per konten terdaftar */}
                    <section className="mb-14">
                        {/* header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                    <h2 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">{t('Manajemen Aset per Konten Terdaftar')}</h2>
                                </div>
                                <p className="text-[#5A413D] text-[16px] ml-4.5">{t('Kelola daftar tautan eksternal dan sumber daya penting per konten.')}</p>
                            </div>
                            <Link
                                href="/admin/tambah-tautan"
                                className="bg-[#570000] hover:bg-[#400000] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                {t('Tambah Tautan Baru')}
                            </Link>
                        </div>

                        {/* List Konten */}
                        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                            <div className="flex flex-col divide-y divide-gray-100">
                                {kontenData.length === 0 ? <div className="p-4 text-sm text-gray-500 text-center bg-white rounded-lg border border-gray-200 mb-4">{t('Belum ada data')}</div> : kontenData.map((item) => (
                                    <Link href={`/admin/detail-permintaan/${item.request_id}`} key={item.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition group cursor-pointer">
                                        <h3 className="text-base font-medium text-gray-900">{(item.template_name || item.content_name)}</h3>
                                        <div className="text-gray-400 group-hover:text-gray-800 transition transform group-hover:translate-x-1">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                </main>


            {/* Modal Konfirmasi Hapus */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100 transform transition-all scale-100 opacity-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{t('Hapus link?')}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6 pl-13">{t('Apakah anda yakin ingin menghapus link ini? Tindakan ini tidak dapat dibatalkan.')}</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition">{t('Tidak')}</button>
                            <button onClick={() => { router.delete(`/admin/template/${deleteId}`); setDeleteId(null); }} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition">{t('Ya, hapus')}</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}