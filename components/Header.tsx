'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        // Pastikan document.body ada sebelum mengakses classList
        if (typeof document !== 'undefined') {
            document.body.classList.toggle('menu-open', !isMobileMenuOpen);
        }
    };

    // Fungsi handleAnchorClick dengan tipe Event yang eksplisit
    const handleAnchorClick = (e: MouseEvent) => { // Perbaikan di sini: Tambahkan tipe MouseEvent
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Pastikan header ada sebelum mengakses offsetHeight
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 10;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        }
    };

    // Smooth scroll logic for in-page navigation
    useEffect(() => {
        // Pastikan window dan document ada sebelum mengaksesnya
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return; // Keluar jika tidak di lingkungan browser
        }

        const anchors = document.querySelectorAll('a[href^="#"]');
        
        // Pastikan anchors adalah HTMLAnchorElement
        anchors.forEach(anchorNode => { // Ubah nama variabel untuk menghindari kebingungan
            const anchor = anchorNode as HTMLAnchorElement; // Type assertion
            anchor.addEventListener('click', handleAnchorClick);
        });

        return () => { // Ini adalah fungsi cleanup
            anchors.forEach(anchorNode => {
                const anchor = anchorNode as HTMLAnchorElement; // Type assertion
                anchor.removeEventListener('click', handleAnchorClick);
            });
        };
    }, [isMobileMenuOpen]);

    return (
        <header>
            <Link href="#hero">
                <Image src="/asset/Salinan dari Salinan dari Tambahkan judul (3).png" alt="Logo Amallan" width={100} height={25} className="header-logo-new" />
            </Link>
            <nav className="main-nav">
                <ul>
                    <li><Link href="#hero">Beranda</Link></li>
                    <li><Link href="#about-amallan">Tentang</Link></li>
                    <li><Link href="#program-utama">Program</Link></li>
                    <li><Link href="#dampak-nyata">Dampak</Link></li>
                    <li><Link href="#bergabung-gerakan">Bergabung</Link></li>
                    <li><Link href="#contact">Kontak</Link></li>
                </ul>
            </nav>
            <Link href="#contact" className="button-hubungi">Hubungi Kami</Link>
            <button className="mobile-menu-toggle" aria-label="Toggle mobile menu" onClick={toggleMobileMenu}>
                <i className="fas fa-bars"></i>
            </button>

            {/* Mobile menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} id="mobile-menu">
                <button className="close-btn" onClick={toggleMobileMenu}>&times;</button>
                <ul>
                    <li><Link href="#hero" onClick={toggleMobileMenu}>Beranda</Link></li>
                    <li><Link href="#about-amallan" onClick={toggleMobileMenu}>Tentang</Link></li>
                    <li><Link href="#program-utama" onClick={toggleMobileMenu}>Program</Link></li>
                    <li><Link href="#how-it-works" onClick={toggleMobileMenu}>Cara Kerja</Link></li>
                    <li><Link href="#dampak-nyata" onClick={toggleMobileMenu}>Dampak Nyata</Link></li>
                    <li><Link href="#contact" onClick={toggleMobileMenu}>Kontak</Link></li>
                    <li>
                        <Link href="#contact" className="button-hubungi" style={{ display: 'block', textAlign: 'center', margin: '20px auto', width: 'calc(100% - 50px)' }}>
                            Hubungi Kami
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}