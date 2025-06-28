import Image from 'next/image';

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="section-padding">
            <h2 className="section-heading">Bagaimana Amallan Bekerja</h2>
            <p className="section-description">Proses kami dalam mendampingi pesantren menuju kemandirian</p>
            <div className="step-card-grid">
                <div className="step-card">
                    <div className="step-number-circle">
                        <Image src="/asset/num1.png" alt="Langkah 1: Identifikasi Pesantren" width={60} height={60} />
                    </div>
                    <h3>Identifikasi Pesantren</h3>
                    <p>Memetakan kebutuhan dan potensi pesantren mitra untuk pengembangan program yang tepat sasaran.</p>
                </div>
                <div className="step-card">
                    <div className="step-number-circle">
                        <Image src="/asset/num2.png" alt="Langkah 2: Digitalisasi Sistem" width={60} height={60} />
                    </div>
                    <h3>Digitalisasi Sistem</h3>
                    <p>Implementasi sistem digital untuk manajemen pesantren yang efektif dan efisien.</p>
                </div>
                <div className="step-card">
                    <div className="step-number-circle">
                        <Image src="/asset/num3.png" alt="Langkah 3: Pemberdayaan Ekonomi" width={60} height={60} />
                    </div>
                    <h3>Pemberdayaan Ekonomi</h3>
                    <p>Pendampingan pengembangan unit usaha produktif dan pelatihan kewirausahaan.</p>
                </div>
                <div className="step-card">
                    <div className="step-number-circle">
                        <Image src="/asset/num4.png" alt="Langkah 4: Penggalangan Dukungan" width={60} height={60} />
                    </div>
                    <h3>Penggalangan Dukungan</h3>
                    <p>Menghubungkan pesantren dengan jaringan donatur dan pendukung untuk keberlanjutan program.</p>
                </div>
            </div>
        </section>
    );
}