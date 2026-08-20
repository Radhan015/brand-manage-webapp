import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex font-sans bg-[#F9F9F9]">
            <Head title="Register | SIMACO" />
            <div className="hidden lg:flex lg:w-[35%] relative bg-white">
                <img src="/images/Login/TULT.jpg" alt="Telkom University Building" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#4A0B0B] opacity-80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c0404] via-transparent to-transparent opacity-90"></div>
                <div className="relative z-10 flex flex-col justify-end p-12 lg:p-16 w-full h-full text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">Tingkatkan<br />Identitas Institusi</h1>
                    <p className="text-[#FFB4A8] text-[19px] max-w-md mb-8 leading-relaxed">Menyederhanakan distribusi dan konsistensi aset merek untuk Fakultas Informatika.</p>
                </div>
            </div>

            <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-8 sm:p-12">
                <div className="w-full max-w-[400px]">
                    <div className="mb-5">
                        <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-20 w-auto object-contain mb-1" />
                        <h2 className="text-[33px] font-bold text-[#1A1C1D] mb-1">Daftar Akun</h2>
                        <p className="text-[#5A413D] text-[18px]">Fakultas Informatika, Telkom University</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-[15px] font-bold text-[#1A1C1D] mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Masukkan nama"
                                className="w-full py-3 px-4 border border-[#E2BFB9] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6B1111]"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-[15px] font-bold text-[#1A1C1D] mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="Masukkan email"
                                className="w-full py-3 px-4 border border-[#E2BFB9] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6B1111]"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-[15px] font-bold text-[#1A1C1D] mb-1">Nomor Telepon (WA)</label>
                            <input
                                type="text"
                                value={data.phone_number}
                                onChange={e => setData('phone_number', e.target.value)}
                                placeholder="Contoh: 08123456789"
                                className="w-full py-3 px-4 border border-[#E2BFB9] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6B1111]"
                            />
                            {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                        </div>

                        <div>
                            <label className="block text-[15px] font-bold text-[#1A1C1D] mb-1">Kata Sandi</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className="w-full py-3 px-4 pr-11 border border-[#E2BFB9] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6B1111]"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-[15px] font-bold text-[#1A1C1D] mb-1">Konfirmasi Kata Sandi</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    placeholder="Ketik ulang password"
                                    className="w-full py-3 px-4 border border-[#E2BFB9] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6B1111]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center items-center py-3 px-4 mt-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-[#570000] hover:bg-[#400404]"
                        >
                            Daftar Sekarang
                        </button>
                    </form>

                    <div className="mt-5 text-center">
                        <p className="text-[15px] text-[#5A413D]">
                            Sudah punya akun? <Link href="/login" className="font-bold text-[#570000] hover:underline">Masuk </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}