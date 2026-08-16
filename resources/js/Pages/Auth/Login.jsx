import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Login() {
    // state buat pass mata
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex font-sans bg-[#F9F9F9]">
            <Head title="Log in | SIMACO" />
            {/* gambar kiri  */}
            <div className="hidden lg:flex lg:w-[35%] relative bg-white">
                <img
                    src="/images/Login/TULT.jpg"
                    alt="Telkom University Building"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* overlay merha */}
                <div className="absolute inset-0 bg-[#4A0B0B] opacity-80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c0404] via-transparent to-transparent opacity-90"></div>

                <div className="relative z-10 flex flex-col justify-end p-12 lg:p-16 w-full h-full text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
                        Tingkatkan<br />Identitas Institusi
                    </h1>
                    <p className="text-[#FFB4A8] text-[19px] max-w-md mb-8 leading-relaxed">
                        Menyederhanakan distribusi dan konsistensi aset merek untuk Fakultas Informatika.
                    </p>

                </div>
            </div>

            {/* form login kanan */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-8 sm:p-12">
                <div className="w-full max-w-[400px]">

                    {/* header formnya */}
                    <div className="mb-10">
                        <img
                            src="/images/Homepage/logoSimaco-removebg-preview.png"
                            alt="Logo SiMaCo"
                            className="h-20 w-auto object-contain mb-5"
                        />
                        <h2 className="text-[33px] font-bold text-[#1A1C1D] mb-2">
                            Selamat datang
                        </h2>
                        <p className="text-[#5A413D] text-[18px]">
                            Fakultas Informatika, Telkom University
                        </p>
                    </div>

                    {/* form inputnya */}
                    <form className="space-y-6">
                        <div>
                            {/* form email ama username */}
                            <label className="block text-[15px] font-bold text-[#1A1C1D] mb-2">
                                Email atau Username
                            </label>
                            <div className="relative flex items-center">
                                {/* ini ikon user */}
                                <div className="absolute left-4 text-[#E2BFB9]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Masukkan email atau username"
                                    className="w-full py-3 pl-11 pr-4 border border-[#E2BFB9] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6B1111] focus:border-[#6B1111] placeholder-gray-400 text-gray-800"
                                />
                            </div>
                        </div>

                        {/* input passnya */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[15px] font-bold text-[#1A1C1D]">
                                    Kata Sandi
                                </label>
                                <Link href="/forgot-password" className="text-[15px] font-bold text-[#570000] hover:underline">
                                    Lupa kata sandi?
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                {/* ini ikon gembok */}
                                <div className="absolute left-4 text-[#E2BFB9]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full py-3 pl-11 pr-11 border border-[#E2BFB9] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6B1111] focus:border-[#6B1111] placeholder-gray-400 text-gray-800 tracking-wider"
                                />
                                {/* ini buat ikon mata sandi */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
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
                        </div>

                        {/* checbox inget user */}
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                className="w-4 h-4 text-[#5A0404] border-gray-300 rounded focus:ring-[#5A0404]"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-[15px] text-[#5A413D]">
                                Ingat selama 30 hari
                            </label>
                        </div>

                        {/* tombol selesai/submitnya */}
                        <Link
                            href="/dashboard"
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#570000] hover:bg-[#400404] transition duration-200"
                        >
                            Selesai
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </form>

                    {/* footer link nya */}
                    <div className="mt-8 text-center space-y-12">
                        <p className="text-[15px] text-[#5A413D]">
                            Belum punya akun? <Link href="/register" className="font-bold text-[#570000] hover:underline">Daftar akun</Link>
                        </p>

                        <div className="flex justify-center items-center gap-1.5 text-[#5A413D]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            <span className="text-[13px] tracking-widest font-semibold uppercase text-[#5A413D]">Portal Akademik Aman</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}