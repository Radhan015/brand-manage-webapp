import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { useLang } from '@/i18n';

// PRD R18: bell with unread count and the 10 latest notifications (shared by HandleInertiaRequests for admins and staff).
// Renders nothing for other users.
export default function NotificationBell() {
    const { notifications } = usePage().props;
    const { t, intl } = useLang();
    const [open, setOpen] = useState(false);
    if (!notifications) return null;
    const { unread, items } = notifications;

    const ago = (iso) => {
        const seconds = (new Date(iso) - Date.now()) / 1000;
        const rtf = new Intl.RelativeTimeFormat(intl, { numeric: 'auto' });
        for (const [unit, size] of [['day', 86400], ['hour', 3600], ['minute', 60]]) {
            if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
        }
        return rtf.format(0, 'minute');
    };

    return (
        <div className="relative" onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                aria-label={unread > 0 ? t('Notifikasi (:n belum dibaca)', { n: unread }) : t('Notifikasi')}
                className="relative p-1 text-gray-700 hover:text-gray-900 transition"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                        {unread > 9 ? '9+' : unread}
                    </span>
                )}
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
                    <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <p className="font-bold text-sm text-gray-900">{t('Notifikasi')}</p>
                            {unread > 0 && (
                                <button type="button" onClick={() => router.post('/notifications/read-all', {}, { preserveScroll: true })} className="text-xs font-semibold text-[#570000] hover:underline">
                                    {t('Tandai semua dibaca')}
                                </button>
                            )}
                        </div>
                        {items.length === 0 ? (
                            <p className="px-4 py-8 text-sm text-gray-500 text-center">{t('Belum ada notifikasi.')}</p>
                        ) : (
                            <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                                {items.map(n => (
                                    <li key={n.id}>
                                        <button
                                            type="button"
                                            onClick={() => router.post(`/notifications/${n.id}`)}
                                            className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 ${n.read_at ? '' : 'bg-red-50/60'}`}
                                        >
                                            <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.read_at ? 'bg-gray-200' : 'bg-red-600'}`} />
                                            <span className="min-w-0">
                                                <span className="block text-sm text-gray-900 break-words"><b>{n.data.kind === 'assigned' ? t('Tugas baru untuk Anda') : t('Request baru')}:</b> {n.data.event_name}</span>
                                                <span className="block text-xs text-gray-500 mt-0.5">{n.data.requester} · {ago(n.created_at)}</span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
