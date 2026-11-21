import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/i18n';

const KINDS = {
    event: { label: 'Acara', className: 'bg-blue-100 text-blue-900 border-blue-300' },
    series: { label: 'Tayang series', className: 'bg-purple-100 text-purple-900 border-purple-300' },
    deadline: { label: 'Tenggat konten', className: 'bg-amber-100 text-amber-900 border-amber-300' },
    work: { label: 'Deadline pengerjaan', className: 'bg-red-100 text-red-900 border-red-300' },
    coverage: { label: 'Liputan', className: 'bg-green-100 text-green-900 border-green-300' },
};

const pad = (n) => String(n).padStart(2, '0');
const ymd = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`; // built from parts, so no time zone shift
const day = (s) => s ? String(s).slice(0, 10) : null;

function buildEvents(requests, coverages) {
    const list = [];
    const add = (kind, title, start, end, href, note) => start && list.push({ kind, title, start: day(start), end: day(end) || day(start), href, note });
    requests.forEach(r => {
        const href = `/admin/detail-permintaan/${r.id}`;
        add('event', r.event_name, r.event_start_date, r.event_end_date, href);
        if (r.content_type === 'series') add('series', r.event_name, r.series_start_date, r.series_end_date, href);
        add('deadline', r.event_name, r.content_deadline, null, href);
        add('work', r.event_name, r.content?.deadline, null, href);
        add('coverage', r.event_name, r.content?.coverage_date, null, href);
    });
    coverages.forEach(c => add('coverage', c.name, c.date, null, '/admin/manajemen-konten', [c.time?.slice(0, 5), c.pic?.name].filter(Boolean).join(' · ')));
    return list;
}

export default function Kalender({ auth, requests = [], coverages = [] }) {
    const now = new Date();
    const todayStr = ymd(now.getFullYear(), now.getMonth(), now.getDate());
    const [cursor, setCursor] = useState({ y: now.getFullYear(), m: now.getMonth() });
    const [selected, setSelected] = useState(todayStr);
    const { t, intl } = useLang();

    const events = useMemo(() => buildEvents(requests, coverages), [requests, coverages]);
    const on = (d) => events.filter(e => e.start <= d && d <= e.end);

    // Monday-first grid covering the whole month
    const offset = (new Date(cursor.y, cursor.m, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const cells = Array.from({ length: Math.ceil((offset + daysInMonth) / 7) * 7 }, (_, i) => {
        const d = i - offset + 1;
        return d >= 1 && d <= daysInMonth ? ymd(cursor.y, cursor.m, d) : null;
    });
    const weekdays = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(intl, { weekday: 'short' }).format(new Date(2024, 0, 1 + i))); // 1 Jan 2024 is a Monday
    const monthTitle = new Intl.DateTimeFormat(intl, { month: 'long', year: 'numeric' }).format(new Date(cursor.y, cursor.m, 1));
    const move = (delta) => setCursor(({ y, m }) => ({ y: m + delta < 0 ? y - 1 : m + delta > 11 ? y + 1 : y, m: (m + delta + 12) % 12 }));
    const selectedLabel = selected && new Intl.DateTimeFormat(intl, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(selected + 'T00:00'));

    return (
        <AdminLayout>
            <Head title={`${t('Kalender')} | SIMACO`} />

                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">
                    <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                <h1 className="text-[32px] font-bold text-[#1A1C1D] leading-none tracking-tight">{t('Kalender')}</h1>
                            </div>
                            <p className="text-[#5A413D] text-[16px] ml-4.5 max-w-xl">{t('Jadwal acara, periode tayang, tenggat, dan liputan dari semua permintaan aktif.')}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(KINDS).map(([key, k]) => (
                            <span key={key} className={`px-2 py-0.5 rounded border text-xs font-semibold ${k.className}`}>{t(k.label)}</span>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={() => move(-1)} aria-label={t('Bulan sebelumnya')} className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50 text-lg font-bold">‹</button>
                                <button type="button" onClick={() => move(1)} aria-label={t('Bulan berikutnya')} className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50 text-lg font-bold">›</button>
                                <button type="button" onClick={() => { setCursor({ y: now.getFullYear(), m: now.getMonth() }); setSelected(todayStr); }} className="px-3 h-9 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-semibold whitespace-nowrap">{t('Hari ini')}</button>
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 capitalize">{monthTitle}</h2>
                        </div>

                        <div className="grid grid-cols-7 text-center text-xs font-bold uppercase tracking-wider text-[#5A413D] bg-gray-50">
                            {weekdays.map(w => <div key={w} className="py-2">{w}</div>)}
                        </div>
                        <div className="grid grid-cols-7">
                            {cells.map((d, i) => {
                                if (!d) return <div key={i} className="min-h-[110px] border-t border-r border-gray-100 bg-gray-50/50" />;
                                const items = on(d);
                                return (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setSelected(d)}
                                        className={`min-h-[110px] border-t border-r border-gray-100 p-1.5 text-left align-top hover:bg-red-50/40 ${selected === d ? 'ring-2 ring-inset ring-[#570000]' : ''}`}
                                    >
                                        <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold ${d === todayStr ? 'bg-[#570000] text-white' : 'text-gray-700'}`}>{Number(d.slice(8))}</span>
                                        <div className="mt-1 space-y-0.5">
                                            {items.slice(0, 3).map((e, j) => (
                                                <div key={j} className={`truncate rounded border px-1 text-[11px] leading-5 ${KINDS[e.kind].className}`} title={`${t(KINDS[e.kind].label)}: ${e.title}`}>{e.title}</div>
                                            ))}
                                            {items.length > 3 && <div className="text-[11px] font-semibold text-[#570000] px-1">{t('+:n lagi', { n: items.length - 3 })}</div>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        {selected ? (
                            <>
                                <h3 className="font-bold text-gray-900 mb-3 capitalize">{selectedLabel}</h3>
                                {on(selected).length === 0 ? <p className="text-sm text-gray-500">{t('Tidak ada jadwal di tanggal ini.')}</p> : (
                                    <ul className="space-y-2">
                                        {on(selected).map((e, j) => (
                                            <li key={j}>
                                                <Link href={e.href} className="flex flex-wrap items-center gap-2 text-sm hover:underline">
                                                    <span className={`px-2 py-0.5 rounded border text-xs font-semibold ${KINDS[e.kind].className}`}>{t(KINDS[e.kind].label)}</span>
                                                    <span className="font-medium text-gray-900">{e.title}</span>
                                                    {e.start !== e.end && <span className="text-gray-500">({e.start} – {e.end})</span>}
                                                    {e.note && <span className="text-gray-500">{e.note}</span>}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : <p className="text-sm text-gray-500">{t('Klik tanggal untuk melihat semua jadwalnya.')}</p>}
                    </div>
                </main>

        </AdminLayout>
    );
}
