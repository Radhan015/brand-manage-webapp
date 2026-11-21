import React, { useState } from 'react';
import { getInitials } from "../../utils";
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

export default function ManajemenKonten({ auth, flash, projects = [], users = [], coverages = [] }) {
    const { t, intl } = useLang();
    // --- STATE DATA DUMMY TUGAS KONTEN (SUDAH DIKELOMPOKKAN) ---
    // Struktur diubah: 1 Judul Proyek bisa memiliki banyak tugas (tasks)

    // Daftar Staf yang tersedia untuk di-assign
    const staffList = users.filter(u => u.is_active);

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    // Fungsi untuk mengubah orang yang ditugaskan berdasarkan ID Proyek dan ID Tugas
    const handleAssign = (projectId, newAssignee) => {
        if (!newAssignee) return;
        router.post(`/admin/request/${projectId}/pic`, { pic_id: newAssignee }, { preserveScroll: true });
    };

    const [coverageModal, setCoverageModal] = useState({ show: false, id: null });
    const { data, setData, post, delete: destroy, processing, errors } = useForm({
        name: '',
        date: '',
        time: '',
        pic_id: ''
    });

    const openCoverageModal = (coverage = null) => {
        setData({
            name: coverage?.name || '',
            date: coverage?.date ? String(coverage.date).substring(0, 10) : '',
            time: coverage?.time ? String(coverage.time).substring(0, 5) : '',
            pic_id: coverage?.pic_id || ''
        });
        setCoverageModal({ show: true, id: coverage?.id || null });
    };

    const submitCoverage = (e) => {
        e.preventDefault();
        if (coverageModal.id) {
            post(`/admin/coverages/${coverageModal.id}`, {
                onSuccess: () => setCoverageModal({ show: false, id: null })
            });
        } else {
            post(`/admin/coverages`, {
                onSuccess: () => setCoverageModal({ show: false, id: null })
            });
        }
    };

    const [deleteId, setDeleteId] = useState(null);
    const deleteCoverage = (id) => {
        setDeleteId(id);
    };


    return (
        <AdminLayout>
            <Head title={`${t('Manajemen Penugasan')} | SIMACO`} />

                {/* main kontennya */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">
                    
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-sm">{flash.success}</span>
                        </div>
                    )}

                    {/* bagian manajemen penugasan kontennya */}
                    <section className="mb-14">
                        
                        {/* header manajemen penugasan kontennya */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                    <h2 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">{t('Manajemen Penugasan Konten')}</h2>
                                </div>
                                <p className="text-[#5A413D] text-[16px] ml-4.5">{t('Kelola dan delegasikan spesifikasi tugas ke staf berdasarkan proyek yang berjalan.')}</p>
                            </div>
                        </div>

                        {/* RENDER LIST PROYEK & TUGAS */}
                        <div className="space-y-4">
                            {projects.filter(p => p.status !== 'completed' && p.status !== 'rejected').length === 0 ? <div className="p-4 text-sm text-gray-500 text-center bg-white rounded-lg border border-gray-200">{t('Belum ada data')}</div> : projects.filter(p => p.status !== 'completed' && p.status !== 'rejected').map((project) => (
                                <div key={project.id} className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                                    <div className="p-6 grid grid-cols-12 gap-6 items-center hover:bg-gray-50 transition group">
                                        <div className="col-span-12 md:col-span-8">
                                            <h4 className="text-[18px] font-bold text-gray-900 mb-1.5">{project.event_name}</h4>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-semibold bg-[#F4F4F5] text-[#5A413D] border border-gray-200">
                                                {project.content_type === 'series' ? t('Konten Series') : project.content_type === 'single' ? t('Sekali Tayang') : t('Konten')}
                                            </span>
                                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{project.description}</p>
                                        </div>

                                        <div className="col-span-12 md:col-span-4 flex flex-col md:flex-row md:justify-end items-start md:items-center">
                                            <div className="flex flex-col gap-2 w-full md:w-64 shrink-0">
                                                <span className="text-[11px] font-bold text-[#5A413D] uppercase tracking-wider">{t('PIC Tugas')}</span>
                                                {project.status === 'new_request' ? (
                                                    <Link href={`/admin/detail-permintaan/${project.id}`} className="text-center w-full py-2 bg-[#F4F4F5] hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold transition">
                                                        {t('Belum Diterima (Review)')}
                                                    </Link>
                                                ) : (
                                                    <div className="relative w-full">
                                                        <select 
                                                            value={project.content?.pic_id || ""}
                                                            onChange={(e) => {
                                                                if(window.confirm(t('Ganti PIC tugas ini?'))) {
                                                                    handleAssign(project.id, e.target.value);
                                                                }
                                                            }}
                                                            className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#570000] transition shadow-sm appearance-none cursor-pointer"
                                                        >
                                                            <option value="" disabled>-- {t('Pilih Staf')} --</option>
                                                            {staffList.map((staff) => (<option key={staff.id} value={staff.id}>{staff.name}</option>))}
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </section>

                    {/* BAGIAN 2: MANAJEMEN JADWAL LIPUTAN */}
                    <section className="mb-14 border-t border-gray-200 pt-10">
                        {/* header manajemen jadwal liputan */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                    <h2 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">{t('Jadwal Liputan')}</h2>
                                </div>
                                <p className="text-[#5A413D] text-[16px] ml-4.5">{t('Atur tanggal dan nama acara liputan khusus untuk kalender dashboard.')}</p>
                            </div>
                        </div>

                        {/* RENDER LIST JADWAL LIPUTAN */}
                        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                            <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-[#800000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <h3 className="text-[20px] font-bold text-gray-900">{t('Daftar Jadwal Liputan')}</h3>
                                </div>
                                <button onClick={() => openCoverageModal()} className="bg-[#570000] hover:bg-[#400000] text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 shadow-sm">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                    {t('Tambah Jadwal')}
                                </button>
                            </div>
                            <div className="flex flex-col divide-y divide-gray-100">
                                {(!coverages || coverages.length === 0) ? <div className="p-8 text-center text-gray-500">{t('Belum ada jadwal liputan.')}</div> : coverages.map((cov) => (
                                    <div key={cov.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition group">
                                        <div className="flex flex-col gap-1.5">
                                            <h4 className="text-[18px] font-bold text-gray-900">{cov.name}</h4>
                                            <div className="flex items-center gap-4 text-[13px] text-[#5A413D] font-medium">
                                                <span className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {new Date(cov.date).toLocaleDateString(intl, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                                {cov.time && (
                                                    <span className="flex items-center gap-1.5">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        {String(cov.time).substring(0, 5)} WIB
                                                    </span>
                                                )}
                                                {cov.pic_id && users.find(u => u.id === cov.pic_id) && (
                                                    <span className="flex items-center gap-1.5 bg-[#F4F4F5] px-2 py-0.5 rounded-md border border-gray-200">
                                                        <div className="w-4 h-4 rounded-full bg-[#570000] flex items-center justify-center text-white text-[8px] font-bold">
                                                            {getInitials(users.find(u => u.id === cov.pic_id)?.name)}
                                                        </div>
                                                        PIC: {users.find(u => u.id === cov.pic_id)?.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => openCoverageModal(cov)} className="py-2 px-4 bg-[#F4F4F5] hover:bg-gray-200 border border-gray-300 text-gray-800 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm">
                                                {t('Ubah')}
                                            </button>
                                            <button onClick={() => deleteCoverage(cov.id)} className="py-2 px-4 bg-white hover:bg-red-50 border border-[#BA1A1A] text-[#BA1A1A] rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm">
                                                {t('Hapus')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </main>
                        
            {/* Modal Set Liputan */}
            {coverageModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('Atur Jadwal Liputan')}</h3>
                        
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                {t('Ada input yang belum sesuai. Mohon cek kembali.')}
                            </div>
                        )}

                        <form onSubmit={submitCoverage} className="flex flex-col gap-4">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Nama Acara / Judul Konten')}</label>
                                <input required type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('Tanggal Liputan')}</label>
                                    <input required type="date" value={data.date} onChange={e => setData('date', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('Jam (Waktu)')}</label>
                                    <input type="time" value={data.time} onChange={e => setData('time', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('PIC Liputan')}</label>
                                <select 
                                    value={data.pic_id}
                                    onChange={(e) => setData('pic_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 pr-10 text-sm appearance-none bg-white"
                                >
                                    <option value="">-- {t('Pilih Staf (Opsional)')} --</option>
                                    {staffList.map((staff) => (<option key={staff.id} value={staff.id}>{staff.name}</option>))}
                                </select>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button type="button" onClick={() => setCoverageModal({show: false, id: null})} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition">{t('Batal')}</button>
                                <button type="submit" disabled={processing} className="flex-1 px-4 py-2 bg-[#570000] hover:bg-[#400000] text-white rounded-lg font-semibold transition">{t('Simpan Jadwal')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        {deleteId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('Yakin ingin menghapus jadwal liputan ini?')}</h3>
                    <p className="text-sm text-gray-500 mb-6">{t('Data tidak dapat dikembalikan setelah dihapus.')}</p>
                    <div className="flex gap-3">
                        <button onClick={() => setDeleteId(null)} className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition">
                            {t('Batal')}
                        </button>
                        <button onClick={() => { router.delete(`/admin/coverages/${deleteId}`); setDeleteId(null); }} className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition">
                            {t('Ya, hapus')}
                        </button>
                    </div>
                </div>
            </div>
        )}
        </AdminLayout>
  );
}