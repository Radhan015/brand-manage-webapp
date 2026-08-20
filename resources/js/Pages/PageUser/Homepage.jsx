import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Homepage({ auth }) {
    const [activeSection, setActiveSection] = useState('tentang');
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth'
            });
            setActiveSection(sectionId);
        }
    };
    // scroll efeknya
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['tentang', 'benefits', 'team', 'request', 'contact'];
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navLinks = [
        { id: 'tentang', label: 'Tentang' },
        { id: 'benefits', label: 'Benefits' },
        { id: 'team', label: 'Branding Team' },
        { id: 'request', label: 'Dashboard Request' },
        { id: 'contact', label: 'Contact Us' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">
            <Head title="Beranda | SIMACO" />
            <nav className="w-full bg-white shadow-sm py-4 px-8 flex justify-between items-center fixed top-0 z-50">
                <div className="flex items-center gap-2">
                    <a href="/">
                        <img
                            src="/images/Homepage/logoSimaco-removebg-preview.png"
                            alt="Logo SiMaCo"
                            className="h-12 w-auto object-contain"
                        />
                    </a>
                </div>

                <div className="hidden md:flex space-x-8 font-medium text-gray-600">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => scrollToSection(e, link.id)}
                            className={`transition pb-1 ${activeSection === link.id
                                    ? 'text-red-800 border-b-2 border-red-800'
                                    : 'hover:text-red-800'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {auth?.user ? (
                    <div className="relative group cursor-pointer">
                        <div className="text-right hidden sm:block pr-2">
                            <p className="text-sm font-bold text-gray-900">{auth.user.name}</p>
                            <p className="text-xs text-gray-500">{auth.user.email}</p>
                        </div>
                        
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-1 pb-1">
                            <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                Log Out
                            </Link>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="bg-[#800000] text-white px-6 py-2 rounded-md font-semibold hover:bg-red-900 transition"
                    >
                        Login
                    </Link>
                )}
            </nav>

            {/* ini Bagian Hero */}
            <section className="relative pt-24 h-screen flex items-center px-8 md:pl-24 lg:pl-32 bg-gray-50"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%), url("/images/Homepage/gambartult.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="max-w-2xl">
                    <h1 className="text-6xl font-bold leading-[1.1] mb-6 text-gray-900 tracking-tight">
                        Solusi Branding <br />
                        <span className="text-[#800000]">Profesional</span> untuk <br />
                        Fakultas Informatika
                    </h1>
                    <p className="text-[#5A413D] mb-8 text-lg leading-relaxed max-w-xl">
                        SIMACO menyederhanakan proses permintaan konten, memastikan konsistensi brand, dan mempercepat distribusi aset untuk seluruh kebutuhan akademik dan promosi Fakultas Informatika.
                    </p>
                    <Link href="/my-requests" className="inline-block bg-[#800000] text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-900 transition shadow-lg text-lg">
                        Dashboard Request
                    </Link>
                </div>
            </section>

            {/* Ini About/Tentang */}
            <section id="tentang" className="py-20 px-8 md:px-16 text-center bg-white">
                <h2 className="text-4xl font-bold mb-1 text-gray-900">Tentang SIMACO</h2>
                <div className="w-12 h-1 bg-[#800000] mx-auto mb-8"></div>
                <p className="max-w-4xl mx-auto text-[#5A413D] text-[17px] leading-relaxed mb-16">
                    Sistem Manajemen Content (SIMACO) adalah platform khusus yang dirancang untuk tim branding Fakultas Informatika Universitas Telkom. Kami menyediakan infrastruktur terpusat untuk mengelola permintaan konten kreatif, mendistribusikan aset desain, dan menyediakan template standar yang memastikan setiap komunikasi visual fakultas tetap konsisten, profesional, dan efektif.
                </p>

                {/* logo-logo di tentang */}
                <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
                    <a href="/">
                        <img src="/images/Homepage/LogoTelkom.png" alt="Logo Telkom" className="h-14 md:h-16 w-auto object-contain" />
                    </a>
                    <a href="/">
                        <img src="/images/Homepage/LogoSimaco-removebg-preview.png" alt="Logo SimaCo" className="h-20 md:h-24 w-auto object-contain" />
                    </a>
                    <a href="/">
                        <img src="/images/Homepage/logo-fakultas-informatika.png" alt="Logo Fakultas FIF" className="h-14 md:h-16 w-auto object-contain" />
                    </a>
                </div>
            </section>

            {/* ini bagian benefit */}
            <section id="benefits" className="py-20 px-8 md:px-16 bg-[#F4F4F5]">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2 text-gray-900">Mengapa Memilih Kami?</h2>
                    <p className="text-[#8C6B6B] font-medium">Keunggulan layanan manajemen konten SIMACO.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card konsistensi brand*/}
                    <div className="border border-red-200 bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-red-100 text-[#800000] flex items-center justify-center rounded-xl mb-6">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                {/* Kotak merah*/}
                                <rect x="3" y="5" width="18" height="14" rx="3" />
                                {/* Kotak satunya yg didalam :)*/}
                                <rect x="12" y="10.5" width="7" height="6" fill="#fee2e2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Konsistensi Brand</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Memastikan setiap materi konten mengikuti pedoman visual universitas yang ketat, menjaga integritas dan citra profesional fakultas.
                        </p>
                    </div>
                    {/* Card efisiensi kerja */}
                    <div className="border border-red-200 bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-red-100 text-[#800000] flex items-center justify-center rounded-xl mb-6">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                {/* Speedometernya*/}
                                <path d="M12 4.5a10 10 0 0 0-9.5 13.2 2 2 0 0 0 1.8 1.3h15.4a2 2 0 0 0 1.8-1.3A10 10 0 0 0 12 4.5z" />

                                {/*ini Jarum Speedometer*/}
                                <circle cx="12" cy="16.5" r="1.8" fill="#fee2e2" />
                                <polygon points="17.5,9 10.8,15.6 13.2,17.4" fill="#fee2e2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Efisiensi Kerja</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Alur kerja digital yang mempercepat proses pengajuan permintaan, revisi, hingga pengiriman aset akhir kepada pemohon.
                        </p>
                    </div>
                    {/* Card akses mudah */}
                    <div className="border border-red-200 bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-red-100 text-[#800000] flex items-center justify-center rounded-xl mb-6">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                {/* Awannye */}
                                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-2.89 0-5.4 1.64-6.65 4.04C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                                {/* Ikon Centang nya */}
                                <path d="M10.5 17l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4-6 6z" fill="#fee2e2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Akses Mudah</h3>
                        <p className="text-[#5A413D] text-sm leading-relaxed">
                            Repositori aset terpusat berbasis tautan yang memungkinkan staf dan dosen mengunduh materi promosi kapan saja dengan mudah.
                        </p>
                    </div>
                </div>
            </section>

            {/* bagian TEAM */}
            <section id="team" className="py-20 px-8 md:px-16 bg-white flex flex-col md:flex-row items-center gap-12 overflow-hidden">
                <div className="md:w-5/12 md:pl-20 lg:pl-32">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">Branding Team</h2>
                    <p className="text-[#5A413D] leading-relaxed text-xl max-w-md">
                        Profesional di balik manajemen brand Fakultas Informatika. Yang berdedikasi dalam membangun, mengelola, dan memperkuat identitas serta citra digital Fakultas Informatika.
                    </p>
                </div>
                <div className="md:w-7/12 relative flex justify-center items-end mt-12 md:mt-0">
                    {/* Foto Tim */}
                    <img src="/images/Homepage/branding-team.png" alt="Branding Team" className="w-full max-w-2xl h-auto object-contain drop-shadow-2xl scale-110 origin-bottom" />
                </div>
            </section>

            {/* CTA SECTION */}
            <section id="request" className="py-24 px-8 text-center relative bg-gray-100"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url("/images/Homepage/cta-bg.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="relative z-10 text-gray-900 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Request Liputan mu Sekarang!</h2>
                    <p className="mb-8 text-[#5A413D]">
                        SIMACO menyederhanakan proses permintaan konten, memastikan konsistensi brand, dan mempercepat distribusi aset untuk seluruh kebutuhan akademik dan promosi Fakultas Informatika.
                    </p>
                    <Link href="/my-requests" className="inline-block bg-[#800000] text-white px-8 py-3 rounded-md font-semibold hover:bg-red-900 transition shadow-lg">
                        Dashboard Request
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer id="contact" className="bg-[#EEEEEF] py-16 px-8 md:px-16 border-t border-gray-200">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
                    {/* Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-6">
                            <img src="/images/Homepage/logoSimaco-removebg-preview.png" alt="Logo SiMaCo" className="h-20 w-auto object-contain" />
                        </div>
                        <div className="space-y-4 text-sm text-gray-600">
                            <p className="flex items-start gap-2">
                                <img src="/images/Homepage/lokasi.png" alt="Lokasi" className="w-5 h-5 object-contain mt-1" />
                                <span>Tult lt.16, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Sukapura,<br />
                                    Kecamatan Bojongsoang, Kabupaten Bandung, Jawa Barat 40257</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <img src="/images/Homepage/telepon.png" alt="Telepon" className="w-5 h-5 object-contain" />
                                Yeyen Hamidah (+62 857-1194-5328)
                            </p>
                            <p className="flex items-center gap-2">
                                <img src="/images/Homepage/icon-instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                                @yeyenhamidah
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-16 justify-end">
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="font-semibold text-[#8B0000]">Home</a>
                            <a href="#tentang" className="text-gray-600 hover:text-red-800">Tentang</a>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <span className="font-semibold text-[#8B0000]">Layanan</span>
                            <Link href="/request-form" className="text-gray-600 hover:text-red-800">Request Konten</Link>
                            <Link href="/my-requests" className="text-gray-600 hover:text-red-800">Daftar Request Saya</Link>
                            <a href="#contact" className="text-gray-600 hover:text-red-800">Hubungi Kami</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}