import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Homepage() {
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
        { id: 'request', label: 'Request' },
        { id: 'contact', label: 'Contact Us' },
    ];

    // state untuk mengontrol slide yang sedang aktif
    const [currentSlide, setCurrentSlide] = useState(0);

    // data untuk carousel tim branding beserta posisi labelnya
    const teamSlides = [
        {
            id: 1,
            image: "/images/Homepage/team-slide-1.png", 
            heightClass: "h-[150%] sm:h-[120%] md:h-[125%] lg:h-[130%]",
            labels: [
                { name: "Mochamad Febry Aridlo", role: "Sekpim FIF (Mentor Lapangan)", top: "70%", left: "25%" },
                { name: "Irma Palupi", role: "Kaur Sekpim FIF (Pembimbing)", top: "75%", left: "75%" }
            ]
        },
        {
            id: 2,
            image: "/images/Homepage/team-slide-2.png",
            heightClass: "h-[115%] sm:h-[120%] md:h-[125%] lg:h-[115%]",
            labels: [
                { name: "Ken Diva", role: "Koordinator Analytics", top: "75%", left: "20%" },
                { name: "Muhamad Harsya Sadin", role: "Koordinator Social Media", top: "85%", left: "50%" },
                { name: "Yeyen Hamidah", role: "PIC Branding Fakultas FIF", top: "70%", left: "80%" }
            ]
        },
        {
            id: 3,
            image: "/images/Homepage/team-slide-3.png",
            heightClass: "h-[150%] sm:h-[140%] md:h-[160%] lg:h-[160%]",
            labels: [
                { name: "Hasanul Fikri", role: "UI/UX Design Website", top: "82%", left: "30%" },
                { name: "M Naufal Ramadhan", role: "UI/UX Design Website", top: "70%", left: "70%" }
            ]
        },
        {
            id: 4,
            image: "/images/Homepage/team-slide-4.png",
            heightClass: "h-[200%] sm:h-[140%] md:h-[160%] lg:h-[180%]",
            bottomClass: "-bottom-20 md:-bottom-24 lg:-bottom-20",
            labels: [
                { name: "Novel Shiffa Octaviani", role: "Data Analytics", top: "75%", left: "35%" },
                { name: "Moh Fadly Ahmad Sehabudin", role: "Data Analytics", top: "80%", left: "75%" }
            ]
        },
        {
            id: 5,
            image: "/images/Homepage/team-slide-5.png",
            heightClass: "h-[200%] sm:h-[140%] md:h-[160%] lg:h-[190%]",
            labels: [
                { name: "Irvan Tegar Yunadi", role: "Media & Creative", top: "70%", left: "35%" },
                { name: "Bagus Hardiyanto", role: "Media & Creative", top: "60%", left: "65%" }
            ]
        }
    ];

    // efek untuk autoplay carousel (berpindah setiap 4 detik) bisa diubah juga kalo emang kecepetan
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % teamSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

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

                <Link
                    href="/login"
                    className="bg-[#800000] text-white px-6 py-2 rounded-md font-semibold hover:bg-red-900 transition"
                >
                    Login
                </Link>
            </nav>

            {/* ini bagian Hero */}
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
                    <a href="/request-form" className="inline-block bg-[#800000] text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-900 transition shadow-lg text-lg">
                        Request Sekarang
                    </a>
                </div>
            </section>

            {/* ini About/Tentang */}
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
                    {/* card konsistensi brand*/}
                    <div className="border border-red-200 bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-red-100 text-[#800000] flex items-center justify-center rounded-xl mb-6">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                {/* Kotak merah*/}
                                <rect x="3" y="5" width="18" height="14" rx="3" />
                                {/* kotak satunya yg didalam :)*/}
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
            <section id="team" className="py-10 md:py-12 px-8 md:px-16 bg-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                <div className="md:w-5/12 md:pl-20 lg:pl-32 z-20">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">Branding Team</h2>
                    <p className="text-[#5A413D] leading-relaxed text-lg max-w-md">
                        Profesional di balik manajemen brand Fakultas Informatika. Yang berdedikasi dalam membangun, mengelola, dan memperkuat identitas serta citra digital Fakultas Informatika.
                    </p>

                    {/* navigasi dot */}
                    <div className="flex gap-2 mt-8">
                        {teamSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2.5 rounded-full transition-all duration-5000 ${currentSlide === idx ? 'w-8 bg-[#570000]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* area gambar carouselnya */}
                <div className="md:w-7/12 relative flex justify-center items-end mt-10 md:mt-0 h-[350px] md:h-[400px] w-full z-10">
                    {teamSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-5000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            {/* gambar orang */}
                            <img
                                src={slide.image}
                                alt="Tim Branding"
                                className={`absolute ${slide.bottomClass ? slide.bottomClass : '-bottom-10 md:-bottom-12'} left-1/2 transform -translate-x-1/2 ${slide.heightClass ? slide.heightClass : 'h-[160%] sm:h-[170%] md:h-[185%] lg:h-[150%]'} w-auto max-w-none object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] origin-bottom`}
                            />

                            {/* label nama & jabatannya*/}
                            {slide.labels.map((label, labelIdx) => (
                                <div
                                    key={labelIdx}
                                    style={{ top: label.top, left: label.left }}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-md border-[1.5px] border-gray-800 rounded-md px-4 py-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] min-w-max z-30"
                                >
                                    <p className="text-[13px] md:text-[15px] font-bold text-gray-900 leading-tight mb-0.5">{label.name}</p>
                                    <p className="text-[11px] md:text-[13px] italic text-gray-700 leading-tight">{label.role}</p>
                                </div>
                            ))}
                        </div>
                    ))}
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
                    <Link href="/request-form" className="inline-block bg-[#800000] text-white px-8 py-3 rounded-md font-semibold hover:bg-red-900 transition shadow-lg">
                        Request Sekarang
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
                            <a href="#contact" className="text-gray-600 hover:text-red-800">Hubungi Kami</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}