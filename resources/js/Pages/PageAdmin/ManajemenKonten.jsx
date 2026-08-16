import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ManajemenKonten() {
    // --- STATE DATA DUMMY TUGAS KONTEN (SUDAH DIKELOMPOKKAN) ---
    // Struktur diubah: 1 Judul Proyek bisa memiliki banyak tugas (tasks)
    const [projects, setProjects] = useState([
        {
            id: 'P1',
            title: 'Gathering Kopi Kenangan',
            tasks: [
                { id: 1, name: 'Desain Poster Utama', type: 'Graphic Design', assignee: 'Budi Santoso' },
                { id: 2, name: 'Copywriting Sosial Media', type: 'Copywriting', assignee: '' },
            ]
        },
        {
            id: 'P2',
            title: 'Tel-U Cup 2026',
            tasks: [
                { id: 3, name: 'Shooting Video Teaser', type: 'Video', assignee: 'Andi Wijaya' },
                { id: 4, name: 'Dokumentasi Hari H', type: 'Photography', assignee: 'Siti Rahmawati' }
            ]
        },
        {
            id: 'P3',
            title: 'Penerimaan Mahasiswa Baru 2024',
            tasks: [
                { id: 5, name: 'Template Presentasi Fakultas', type: 'Graphic Design', assignee: '' },
            ]
        }
    ]);

    // Daftar Staf yang tersedia untuk di-assign
    const staffList = ['Andi Wijaya', 'Budi Santoso', 'Siti Rahmawati', 'Rina Saraswati'];

    // Fungsi untuk mengubah orang yang ditugaskan berdasarkan ID Proyek dan ID Tugas
    const handleAssign = (projectId, taskId, newAssignee) => {
        setProjects(projects.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    tasks: project.tasks.map(task => 
                        task.id === taskId ? { ...task, assignee: newAssignee } : task
                    )
                };
            }
            return project;
        }));
    };

    // Helper untuk mengambil inisial nama (Misal: "Budi Santoso" -> "BS")
    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex text-gray-800">
            <Head title="Manajemen Konten | SIMACO" />

            {/* buat sidebarnya */}
            <aside className="w-64 bg-[#FCFCFC] border-r border-gray-200 fixed h-full z-20 flex flex-col pt-6">
                <div className="px-8 mb-10">
                    <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-25 w-auto" />
                </div>

                
                <div className="px-6 mb-2">
                    <p className="text-[10px] font-bold text-[#5A413D] uppercase tracking-widest">Utama</p>
                </div>

                <nav className="flex flex-col gap-1 px-4">
                    <Link href="/dashboard" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        Ringkasan Dashboard
                    </Link>
                    
                    <Link href="/asset" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Aset
                    </Link>
                    
                    <Link href="/permintaan" className="flex items-center gap-3 text-[#5A413D] hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                        Manajemen Permintaan
                    </Link>
                    <Link href="/manajemen-konten" className="flex items-center gap-3 bg-[#570000] text-white px-4 py-3 rounded-lg font-medium shadow-sm mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        Manajemen Konten
                    </Link>
                </nav>
            </aside>

            {/* wrapper kanan */}
            <div className="flex-1 flex flex-col ml-64 relative min-h-screen">
                
                {/* header yg diatas buat profile sama notifikasi */}
                <header className="h-20 bg-white/50 backdrop-blur-md flex justify-end items-center px-8 sm:px-12 relative z-10">
                    <div className="flex items-center gap-6">
                        {/* ikon lonceng */}
                        <button className="relative text-gray-700 hover:text-gray-900 transition">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
                        </button>

                        {/* info user atau admin */}
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-[14px] font-bold text-[#1A1C1D] leading-none">Admin User</p>
                                <p className="text-[10px] font-bold text-[#5A413D] mt-1 tracking-wider uppercase">SUPER ADMIN</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#570000] flex items-center justify-center text-white shadow-sm cursor-pointer">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                            </div>
                        </div>
                    </div>
                </header>

                {/* main kontennya */}
                <main className="p-8 md:p-12 relative z-10 w-full max-w-[1200px] mx-auto">
                    
                    {/* bagian manajemen penugasan kontennya */}
                    <section className="mb-14">
                        
                        {/* header manajemen penugasan kontennya */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-6 bg-[#800000] rounded-sm"></div>
                                    <h2 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">Manajemen Penugasan Konten</h2>
                                </div>
                                <p className="text-[#5A413D] text-[16px] ml-4.5">Kelola dan delegasikan spesifikasi tugas ke staf berdasarkan proyek yang berjalan.</p>
                            </div>
                        </div>

                        {/* RENDER LIST PROYEK & TUGAS */}
                        <div className="space-y-6">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                                    
                                    {/* header pengelompokkan nama acara */}
                                    <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-[#800000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                            <h3 className="text-[20px] font-bold text-gray-900">{project.title}</h3>
                                        </div>
                                        <span className="text-[14px] font-bold text-[#5A413D] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                                            {project.tasks.length} Tugas
                                        </span>
                                    </div>

                                    {/* sub-header tabel */}
                                    {project.tasks.length > 0 && (
                                        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-white">
                                            <div className="col-span-12 md:col-span-6 flex items-center text-[12px] font-bold text-[#5A413D] uppercase tracking-wider">
                                                Detail Tugas
                                            </div>
                                            <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row md:justify-end items-center gap-4 md:gap-8">
                                                <div className="w-48 text-left hidden md:block text-[12px] font-bold text-[#5A413D] uppercase tracking-wider">
                                                    Status Penugasan
                                                </div>
                                                <div className="w-52 text-left hidden md:block text-[12px] font-bold text-[#5A413D] uppercase tracking-wider">
                                                    Pilih Staf
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* list buat tugasnya */}
                                    <div className="flex flex-col divide-y divide-gray-100">
                                        {project.tasks.map((task) => (
                                            <div key={task.id} className="p-6 grid grid-cols-12 gap-6 items-center hover:bg-gray-50 transition group">
                                                
                                                {/* kiri nama tugas ama labelnya */}
                                                <div className="col-span-12 md:col-span-6">
                                                    <h4 className="text-[18px] font-bold text-gray-900 mb-1.5">{task.name}</h4>
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-semibold bg-[#F4F4F5] text-[#5A413D] border border-gray-200">
                                                        {task.type}
                                                    </span>
                                                </div>

                                                {/* kanan buat output avatar sama input assign dropdown */}
                                                {/* pembungkus luar disamakan dengan header */}
                                                <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row md:justify-end items-start md:items-center gap-4 md:gap-8">
                                                    
                                                    {/* output siapa yang ngerjain */}
                                                    <div className="flex items-center gap-3 w-full md:w-48 shrink-0">
                                                        {task.assignee ? (
                                                            <>
                                                                <div className="w-10 h-10 rounded-full bg-[#570000] flex items-center justify-center text-white text-[11px] font-bold shadow-sm shrink-0">
                                                                    {getInitials(task.assignee)}
                                                                </div>
                                                                <div className="flex flex-col overflow-hidden">
                                                                    <span className="text-[12px] text-[#5A413D] font-medium">Ditugaskan ke:</span>
                                                                    <span className="text-sm font-bold text-gray-900 truncate">{task.assignee}</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 w-max">
                                                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                                <span className="text-[13px] font-bold">Belum Di-Assign</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* input dropdown buat siapa yang dipilih buat ngerjain tugasnya*/}
                                                    <div className="relative w-full md:w-52 shrink-0">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                        </div>
                                                        <select 
                                                            value={task.assignee}
                                                            onChange={(e) => handleAssign(project.id, task.id, e.target.value)}
                                                            className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#570000] focus:border-transparent transition shadow-sm appearance-none cursor-pointer hover:bg-gray-50"
                                                        >
                                                            <option value="" enabled>-- Pilih Staf --</option>
                                                            {staffList.map((staff, idx) => (
                                                                <option key={idx} value={staff}>{staff}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </section>
                </main>
            </div>
        </div>
    );
}