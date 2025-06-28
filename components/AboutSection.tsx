import Image from 'next/image';

export default function AboutSection() {
    return (
        <section id="about-amallan" className="section-padding">
            <div className="about-content">
                <div className="about-image-container">
                    <Image src="/asset/maskot_amallan_about.png" alt="Maskot Amallan dan Santri" width={450} height={450} />
                </div>
                <div className="about-text-content">
                    <h2>Tentang Amallan</h2>
                    <p>Amallan adalah inisiatif sosial yang berfokus pada pendampingan pondok pesantren di Indonesia agar mandiri melalui digitalisasi, pelatihan SDM, dan pendampingan unit usaha produktif. Kami percaya bahwa pesantren adalah aset berharga bangsa yang perlu didukung dengan teknologi dan inovasi.</p>
                    
                    <p>Dengan semangat #TemanBeramal, kami mengajak seluruh elemen masyarakat untuk berkolaborasi membangun ekosistem pesantren yang mandiri, modern, namun tetap menjaga nilai-nilai keislaman yang luhur.</p>

                    <div className="info-box">
                        <div className="info-icon">
                            <i className="fas fa-info"></i>
                        </div>
                        <p><strong>Temal, Teman Beramal</strong> <br />Maskot kami yang mewakili semangat berbagi dan kolaborasi</p>
                    </div>
                </div>
            </div>
        </section>
    );
}