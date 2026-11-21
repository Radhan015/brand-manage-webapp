import React from 'react';
import { router, usePage } from '@inertiajs/react';
import en from './lang/en';

// PRD R14 #4. The Indonesian text in the code is the key; lang/en.js maps it to English.
// A missing entry falls back to the Indonesian text, so the UI never shows an empty label.
const DICT = { en };
const INTL = { id: 'id-ID', en: 'en-US' };

export function useLang() {
    const locale = usePage().props.locale || 'id';
    const t = (text, vars) => {
        const s = DICT[locale]?.[text] ?? text;
        return vars ? s.replace(/:(\w+)/g, (m, k) => (k in vars ? vars[k] : m)) : s;
    };
    const setLocale = (l) => router.post(`/locale/${l}`, {}, { preserveScroll: true, preserveState: true });
    return { locale, t, setLocale, intl: INTL[locale] };
}

export function LangSwitch({ className = '' }) {
    const { locale, setLocale } = useLang();
    return (
        <div className={`inline-flex rounded-lg border border-gray-300 overflow-hidden text-xs font-semibold shrink-0 ${className}`} role="group" aria-label="Bahasa / Language">
            {['id', 'en'].map(l => (
                <button
                    key={l}
                    type="button"
                    onClick={() => l !== locale && setLocale(l)}
                    aria-pressed={locale === l}
                    className={`px-2.5 py-1 ${locale === l ? 'bg-[#570000] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
