import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section id="hero">
            <div className="hero-content">
                <h1>Membangun Pesantren Mandiri Bersama Amallan</h1>
                <p>Mendampingi pondok pesantren di Indonesia menuju kemandirian melalui digitalisasi, pelatihan SDM, dan pendampingan unit usaha produktif.</p>
                <div className="hero-buttons">
                    <Link href="#contact" className="button white">Gabung Menjadi Sahabat Amal</Link>
                    <Link href="#contact" className="button green">Hubungi Kami</Link>
                </div>
            </div>
            <div className="hero-image-container">
                <Image src="/asset/maskot_amallan.png" alt="Ilustrasi Amallan" width={700} height={700} priority />
            </div>
        </section>
    );
}