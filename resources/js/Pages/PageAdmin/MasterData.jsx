import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

const inputClass = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-[#570000] focus:border-[#570000]";

// One table for either project types or platforms: add, rename, (de)activate. No delete on purpose (old requests reference these rows).
function MasterTable({ title, hint, kind, rows, withDescription }) {
    const { t } = useLang();
    const add = useForm({ name: '', description: '' });
    const [edit, setEdit] = useState(null); // { id, name, description }
    const [editError, setEditError] = useState(null);
    const url = `/admin/master-data/${kind}`;

    const submitAdd = (e) => {
        e.preventDefault();
        add.transform(d => ({ ...d, is_active: true }));
        add.post(url, { preserveScroll: true, onSuccess: () => add.reset() });
    };

    const save = (row, changes, onSuccess) => router.put(`${url}/${row.id}`,
        { name: row.name, description: row.description ?? '', is_active: row.is_active, ...changes },
        { preserveScroll: true, onSuccess, onError: (e) => setEditError(e.name) });

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-8">
            <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-[#5A413D]">{hint}</p>
                <form onSubmit={submitAdd} className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-start">
                    <div className="flex-1">
                        <input aria-label={t('Nama :item baru', { item: title })} placeholder={t('Nama baru...')} required maxLength={100} value={add.data.name} onChange={e => add.setData('name', e.target.value)} className={`${inputClass} w-full`} />
                        {add.errors.name && <p className="text-red-500 text-xs mt-1">{add.errors.name}</p>}
                    </div>
                    {withDescription && (
                        <input aria-label={t('Deskripsi :item baru', { item: title })} placeholder={t('Deskripsi (opsional)')} maxLength={500} value={add.data.description} onChange={e => add.setData('description', e.target.value)} className={`${inputClass} flex-1`} />
                    )}
                    <button type="submit" disabled={add.processing} className="px-4 py-2 bg-[#570000] hover:bg-[#400000] text-white rounded-lg text-sm font-semibold disabled:opacity-50">{t('Tambah')}</button>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase tracking-wider text-[#5A413D] bg-gray-50">
                        <tr>
                            <th className="px-5 py-3">{t('Nama')}</th>
                            {withDescription && <th className="px-5 py-3">{t('Deskripsi')}</th>}
                            <th className="px-5 py-3">{t('Status')}</th>
                            <th className="px-5 py-3 text-right">{t('Aksi')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => edit?.id === row.id ? (
                            <tr key={row.id} className="border-t border-gray-100 bg-red-50/40">
                                <td className="px-5 py-3">
                                    <input aria-label={t('Ubah nama')} required maxLength={100} value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} className={`${inputClass} w-full`} />
                                    {editError && <p className="text-red-500 text-xs mt-1">{editError}</p>}
                                </td>
                                {withDescription && (
                                    <td className="px-5 py-3">
                                        <input aria-label={t('Ubah deskripsi')} maxLength={500} value={edit.description ?? ''} onChange={e => setEdit({ ...edit, description: e.target.value })} className={`${inputClass} w-full`} />
                                    </td>
                                )}
                                <td className="px-5 py-3 text-gray-500">{row.is_active ? t('Aktif') : t('Nonaktif')}</td>
                                <td className="px-5 py-3 text-right whitespace-nowrap">
                                    <button type="button" onClick={() => save(row, { name: edit.name, description: edit.description ?? '' }, () => setEdit(null))} className="px-3 py-1.5 bg-[#570000] text-white rounded-lg text-xs font-semibold mr-2">{t('Simpan')}</button>
                                    <button type="button" onClick={() => setEdit(null)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-xs font-semibold">{t('Batal')}</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={row.id} className="border-t border-gray-100">
                                <td className="px-5 py-3 font-medium text-gray-900">{row.name}</td>
                                {withDescription && <td className="px-5 py-3 text-gray-600">{row.description || '-'}</td>}
                                <td className="px-5 py-3">
                                    <button
                                        type="button"
                                        aria-label={`${t('Ubah status')} ${row.name}`}
                                        onClick={() => save(row, { is_active: !row.is_active })}
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${row.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
                                    >
                                        {row.is_active ? t('Aktif') : t('Nonaktif')}
                                    </button>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <button type="button" onClick={() => { setEdit({ id: row.id, name: row.name, description: row.description }); setEditError(null); }} className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-700">{t('Ubah')}</button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan={withDescription ? 4 : 3} className="px-5 py-8 text-center text-gray-500">{t('Belum ada data.')}</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function MasterData({ auth, flash, projectTypes = [], platforms = [] }) {
    const { t } = useLang();
    return (
        <AdminLayout>
            <Head title={`${t('Tipe Proyek & Platform')} | SIMACO`} />

                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h1 className="text-[32px] font-bold text-[#1A1C1D] leading-none tracking-tight">{t('Tipe Proyek & Platform')}</h1>
                        </div>
                        <p className="text-[#5A413D] text-[16px] ml-4.5 max-w-xl">
                            {t('Pilihan yang muncul di form request. Data yang dinonaktifkan tidak muncul lagi di form, tapi request lama tetap menampilkannya.')}
                        </p>
                    </div>

                    {flash?.success && <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-800 text-sm">{flash.success}</div>}

                    <MasterTable
                        title={t('Tipe Proyek')}
                        hint={t('Jenis pekerjaan yang bisa diminta pemohon, misalnya Video atau Graphic Design.')}
                        kind="project-types"
                        rows={projectTypes}
                        withDescription
                    />
                    <MasterTable
                        title={t('Platform')}
                        hint={t('Tempat konten akan dipublikasikan, misalnya Instagram atau Website FIF.')}
                        kind="platforms"
                        rows={platforms}
                    />
                </main>

        </AdminLayout>
    );
}
