import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { getInitials } from '@/utils';
import { useLang, LangSwitch } from '@/i18n';
import NotificationBell from '@/Components/NotificationBell';

const icon = (d, strokeWidth = 1.5) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className="w-5 h-5 shrink-0">
        {[].concat(d).map(p => <path key={p} strokeLinecap="round" strokeLinejoin="round" d={p} />)}
    </svg>
);

// `match`: URL prefixes that highlight the item (sub-pages included)
const NAV = [
    { href: '/admin/dashboard', label: 'Ringkasan Dashboard', icon: icon('M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z', 2) },
    { href: '/admin/kalender', label: 'Kalender', icon: icon('M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5') },
    { href: '/admin/asset', match: ['/admin/asset', '/admin/tambah-tautan', '/admin/edit-template'], label: 'Aset', icon: icon('M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z') },
    { href: '/admin/permintaan', match: ['/admin/permintaan', '/admin/detail-permintaan'], label: 'Manajemen Permintaan', icon: icon('M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z') },
    { href: '/admin/manajemen-konten', label: 'Manajemen Penugasan', icon: icon('M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125') },
    { href: '/admin/master-staf', label: 'Master Data Staf', icon: icon('M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z') },
    { href: '/admin/master-data', label: 'Tipe Proyek & Platform', icon: icon(['M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z', 'M6 6h.008v.008H6V6z']) },
];

// Sidebar + header shared by every admin page. Below lg the sidebar is a CSS-only drawer (checkbox #admin-nav).
export default function AdminLayout({ children }) {
    const { url, props: { auth } } = usePage();
    const { t } = useLang();
    const path = url.split('?')[0];
    const isActive = (item) => (item.match || [item.href]).some(prefix => path.startsWith(prefix));

    // Desktop only: hide the sidebar for a full-width page; remembered across pages (the layout remounts on every visit)
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem('simaco_sidebar') === 'collapsed');
    const toggleSidebar = () => setCollapsed(c => {
        localStorage.setItem('simaco_sidebar', c ? 'open' : 'collapsed');
        return !c;
    });

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <input type="checkbox" id="admin-nav" className="peer sr-only" aria-label={t('Tampilkan menu')} />
            <aside className={`w-64 bg-[#FCFCFC] border-r border-gray-200 fixed h-full z-40 flex flex-col pt-6 overflow-y-auto -translate-x-full peer-checked:translate-x-0 ${collapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'} transition-transform`}>
                <div className="px-8 mb-10">
                    <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-24 w-auto object-contain" />
                    <img src="/images/Homepage/logo-fakultas-informatika.png" alt="Logo Fakultas Informatika" className="block w-full h-auto object-contain mt-3" />
                </div>

                <div className="px-6 mb-2">
                    <p className="text-[10px] font-bold text-[#5A413D] uppercase tracking-widest">{t('Utama')}</p>
                </div>

                <nav className="flex flex-col gap-1 px-4">
                    {NAV.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive(item) ? 'page' : undefined}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium mt-1 ${isActive(item) ? 'bg-[#570000] text-white shadow-sm' : 'text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 transition'}`}
                        >
                            {item.icon}
                            {t(item.label)}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto px-4 mb-6">
                    <Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 text-[#5A413D] hover:bg-red-50 hover:text-red-700 px-4 py-3 rounded-lg font-bold transition w-full">
                        {icon('M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75', 2)}
                        {t('Keluar')}
                    </Link>
                </div>
                <p className="px-6 pb-4 text-[11px] text-gray-400">Developed by KP Branding Team 2026</p>
            </aside>
            <label htmlFor="admin-nav" aria-label={t('Tutup menu')} className="fixed inset-0 z-30 bg-black/40 hidden peer-checked:block lg:hidden" />

            <div className={`flex-1 flex flex-col min-w-0 relative min-h-screen transition-[margin] ${collapsed ? 'lg:ml-0' : 'lg:ml-64'}`}>
                <header className="h-20 bg-white/50 backdrop-blur-md flex justify-end items-center px-4 sm:px-12 relative z-20">
                    <div className="mr-auto -ml-2">
                        <label htmlFor="admin-nav" aria-label={t('Buka menu')} className="lg:hidden inline-flex cursor-pointer p-2 rounded-lg hover:bg-gray-100 text-[#570000]">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </label>
                        <button
                            type="button"
                            onClick={toggleSidebar}
                            aria-expanded={!collapsed}
                            aria-label={collapsed ? t('Tampilkan sidebar') : t('Sembunyikan sidebar')}
                            title={collapsed ? t('Tampilkan sidebar') : t('Sembunyikan sidebar')}
                            className="hidden lg:inline-flex p-2 rounded-lg hover:bg-gray-100 text-[#570000]"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <rect x="3.75" y="4.5" width="16.5" height="15" rx="2" />
                                <path strokeLinecap="round" d="M9 4.5v15" />
                                <path strokeLinecap="round" strokeLinejoin="round" d={collapsed ? 'M13 10l2 2-2 2' : 'M15 10l-2 2 2 2'} />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <LangSwitch />
                        <NotificationBell />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-[14px] font-bold text-[#1A1C1D] leading-none">{auth?.user?.name || "Admin"}</p>
                                <p className="text-[10px] font-bold text-[#5A413D] mt-1 tracking-wider uppercase">{auth?.user?.email}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#570000] flex items-center justify-center text-white shadow-sm cursor-pointer">
                                <span className="font-bold text-xs">{getInitials(auth?.user?.name)}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </div>
    );
}
