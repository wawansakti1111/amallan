'use client'; // Client Component karena ada interaktivitas (buka/tutup modal)

import { useState, useEffect } from 'react';

export default function PrivacyModal() {
    const [isVisible, setIsVisible] = useState(false);

    // Fungsi untuk menampilkan modal privasi
    const showPrivacyModal = () => {
        setIsVisible(true);
        // Mungkin tambahkan class ke body untuk mencegah scroll
        document.body.classList.add('menu-open');
    };

    // Fungsi untuk menyembunyikan modal privasi
    const hidePrivacyModal = () => {
        setIsVisible(false);
        // Hapus class dari body
        document.body.classList.remove('menu-open');
    };

    // Event listener untuk menutup modal ketika mengklik di luar kontennya
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const modalContent = document.querySelector('.chatbot-modal-content'); // Menggunakan kelas yang sama
            if (modalContent && !modalContent.contains(event.target as Node) && isVisible) {
                hidePrivacyModal();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isVisible]);

    // Untuk memastikan modal bisa dibuka secara eksternal (misal dari footer)
    // Anda bisa mengekspos fungsi ini ke window atau menggunakan Context API
    // Untuk sederhana, kita akan anggap ini hanya dibuka dari internal komponen ini atau di page.tsx
    // Jika ada link di footer yang mengarah ke #privacy-policy, Anda bisa menangkapnya di Header.tsx
    // atau di useEffect di RootLayout untuk membuka modal ini.

    return (
        <div id="privacy-modal" className={`chatbot-modal ${isVisible ? 'is-visible' : ''}`} onClick={(e) => {
            // Ini untuk menangkap klik pada overlay hitam, bukan konten modal
            if (e.target === e.currentTarget) hidePrivacyModal();
        }}>
            <div className="chatbot-modal-content" style={{ maxWidth: '600px', height: 'auto', maxHeight: '90vh' }}>
                <button className="chatbot-close-button" onClick={hidePrivacyModal}>&times;</button>
                <div style={{ padding: '30px', color: 'var(--general-text-dark)' }}>
                    <h3 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.8em', marginBottom: '20px', color: 'var(--general-text-dark)' }}>Kebijakan Privasi</h3>
                    <p style={{ marginBottom: '15px' }}>Kebijakan Privasi ini menjelaskan bagaimana Amallan.id mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan ketika menggunakan platform kami.</p>
                    
                    <h4 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.2em', marginTop: '20px', marginBottom: '10px', color: 'var(--general-text-dark)' }}>Informasi yang Kami Kumpulkan</h4>
                    <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '15px' }}>
                        <li>Nama dan informasi kontak pondok pesantren</li>
                        <li>Data terkait operasional pesantren</li>
                        <li>Informasi untuk kebutuhan layanan teknologi kami</li>
                    </ul>
                    
                    <h4 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.2em', marginTop: '20px', marginBottom: '10px', color: 'var(--general-text-dark)' }}>Penggunaan Informasi</h4>
                    <p style={{ marginBottom: '15px' }}>Kami menggunakan informasi yang kami kumpulkan untuk:</p>
                    <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '15px' }}>
                        <li>Menyediakan dan meningkatkan layanan kami</li>
                        <li>Memberikan dukungan teknis</li>
                        <li>Mengembangkan fitur baru yang relevan</li>
                        <li>Komunikasi terkait layanan</li>
                    </ul>
                    
                    <h4 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.2em', marginTop: '20px', marginBottom: '10px', color: 'var(--general-text-dark)' }}>Keamanan Data</h4>
                    <p style={{ marginBottom: '20px' }}>Kami berkomitmen untuk melindungi data pesantren dengan standar keamanan tinggi sesuai prinsip syariah dan regulasi yang berlaku.</p>
                    
                    <button onClick={hidePrivacyModal} style={{ backgroundColor: 'var(--amallan-dark-green)', color: 'white', padding: '10px 20px', borderRadius: '25px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Tutup</button>
                </div>
            </div>
        </div>
    );
}