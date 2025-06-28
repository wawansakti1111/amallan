"use client"
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProgramSection from '@/components/ProgramSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import DampakSection from '@/components/DampakSection';
import TemalSection from '@/components/TemalSection';
import JoinUsSection from '@/components/JoinUsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import PrivacyModal from '@/components/PrivacyModal'; // Mengimpor komponen PrivacyModal

export default function HomePage() {
    return (
        <>
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
            <Footer />
            <PrivacyModal /> Menambahkan PrivacyModal di sini
            <Chatbot />
        </>
    );
}