import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

const ROLE_LABEL = { user: 'User', staff: 'Staf', admin: 'Admin' };

export default function MasterStaf({ auth, flash, users = [] }) {
    const { t } = useLang();
    const [search, setSearch] = useState('');
    const [showAll, setShowAll] = useState(false);

    const q = search.toLowerCase();
    const rows = users.filter(u =>
        (showAll || u.role !== 'user') &&
        (!q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q))
    );

    const save = (u, changes) => router.put(`/admin/master-staf/${u.id}`, { role: u.role, is_active: u.is_active, ...changes }, { preserveScroll: true });

    return (
        <AdminLayout>
            <Head title={`${t('Master Data Staf')} | SIMACO`} />

                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                            <h1 className="text-[32px] font-bold text-[#1A1C1D] leading-none tracking-tight">{t('Master Data Staf')}</h1>
                        </div>
                        <p className="text-[#5A413D] text-[16px] ml-4.5 max-w-xl">
                            {t('Atur siapa yang menjadi staf atau admin. Hanya staf/admin yang aktif yang bisa dipilih sebagai PIC.')}
                        </p>
                    </div>

                    {flash?.success && <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-800 text-sm">{flash.success}</div>}
                    {flash?.error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-800 text-sm">{flash.error}</div>}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b border-gray-100">
                            <input
                                type="search"
                                placeholder={t('Cari nama atau email...')}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#570000] focus:border-[#570000]"
                            />
                            <label className="flex items-center gap-2 text-sm text-[#5A413D] cursor-pointer">
                                <input type="checkbox" checked={showAll} onChange={e => setShowAll(e.target.checked)} className="rounded text-[#570000] focus:ring-[#570000]" />
                                {t('Tampilkan juga user biasa (untuk dijadikan staf)')}
                            </label>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase tracking-wider text-[#5A413D] bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">{t('Nama')}</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">{t('Role')}</th>
                                        <th className="px-6 py-3">{t('Status')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map(u => {
                                        const isSelf = u.id === auth?.user?.id;
                                        return (
                                            <tr key={u.id} className="border-t border-gray-100">
                                                <td className="px-6 py-4 font-medium text-gray-900">{u.name}{isSelf && <span className="ml-2 text-xs text-gray-400">({t('Anda')})</span>}</td>
                                                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        aria-label={`${t('Role')} ${u.name}`}
                                                        value={u.role}
                                                        disabled={isSelf}
                                                        onChange={e => save(u, { role: e.target.value })}
                                                        className="border border-gray-300 rounded-lg pl-3 pr-9 py-1.5 text-sm focus:ring-[#570000] focus:border-[#570000] disabled:bg-gray-100"
                                                    >
                                                        {Object.entries(ROLE_LABEL).map(([value, label]) => <option key={value} value={value}>{t(label)}</option>)}
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        type="button"
                                                        disabled={isSelf}
                                                        onClick={() => save(u, { is_active: !u.is_active })}
                                                        className={`px-3 py-1 rounded-full text-xs font-bold disabled:opacity-60 ${u.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
                                                    >
                                                        {u.is_active ? t('Aktif') : t('Nonaktif')}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {rows.length === 0 && (
                                        <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-500">{t('Tidak ada data.')}</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

        </AdminLayout>
    );
}
