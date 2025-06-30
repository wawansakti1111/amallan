// page.tsx
"use client";

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProgramSection from '@/components/ProgramSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import DampakSection from '@/components/DampakSection';
import TemalSection from '@/components/TemalSection';
import JoinUsSection from '@/components/JoinUsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer'; // Sudah termasuk footer Anda
import Chatbot from '@/components/Chatbot';
import PrivacyModal from '@/components/PrivacyModal';

export default function HomePage() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleOpenChatbot = () => {
        Swal.fire({
            title: 'Selamat Datang!',
            text: 'Siap untuk memulai obrolan dengan AI kami?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Mulai Obrolan',
            cancelButtonText: 'Nanti Dulu',
            customClass: {
                popup: 'rounded-lg shadow-xl',
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg',
                cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                setIsChatbotOpen(true);
            }
        });
    };

    const handleCloseChatbot = () => {
        setIsChatbotOpen(false);
    };

    return (
        <div className="relative min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <ProgramSection />
                <HowItWorksSection />
                <DampakSection />
                <TemalSection />
                <JoinUsSection />
                <ContactSection />
            </main>
            <Footer /> {/* Footer Anda */}
            <PrivacyModal />

            {/* Tombol untuk membuka chatbot, sekarang dengan bottom-40 */}
            {mounted && !isChatbotOpen && (
                <button
                    onClick={handleOpenChatbot}
                    // Nilai 'bottom-40' (sekitar 160px) dari bawah
                    // Anda mungkin perlu menyesuaikan nilai ini lebih lanjut (bottom-48, bottom-56, dll.)
                    // jika footer Anda sangat tinggi.
                    // --- BARIS YANG PERLU ANDA SESUAIKAN UNTUK MENGUBAH POSISI TOMBOL ---
                    className="fixed bottom-40 right-6 p-4 bg-green-600 text-white text-3xl font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 z-40"
                    aria-label="Open Chatbot"
                >
                    💬
                </button>
            )}

            {/* Wrapper untuk komponen Chatbot Anda, ditampilkan sebagai modal overlay */}
            {mounted && isChatbotOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md h-[80vh] flex flex-col">
                        <button
                            onClick={handleCloseChatbot}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
                            aria-label="Close Chatbot"
                        >
                            &times;
                        </button>
                        <Chatbot onClose={handleCloseChatbot} />
                    </div>
                </div>
            )}
        </div>
    );
}