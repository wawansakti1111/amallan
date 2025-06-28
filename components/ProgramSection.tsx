import Image from 'next/image';

export default function ProgramSection() {
    return (
        <section id="program-utama" className="section-padding">
            <h2 className="section-heading">Program Utama</h2>
            <p className="section-description">Empat pilar program kami untuk mendukung kemandirian pesantren di era digital</p>
            <div className="program-card-grid">
                <div className="program-card">
                    <div className="icon-circle">
                        <Image src="/asset/icon3.png" alt="Digitalisasi Manajemen Pesantren Icon Komputer" width={60} height={60} />
                    </div>
                    <h3>Digitalisasi Manajemen Pesantren</h3>
                    <p>Sistem manajemen digital untuk administrasi, keuangan, dan akademik pesantren yang terintegrasi.</p>
                </div>
                <div className="program-card">
                    <div className="icon-circle">
                        <Image src="/asset/icon2.png" alt="Pendampingan Unit Usaha Produktif Icon Dollar" width={60} height={60} />
                    </div>
                    <h3>Pendampingan Unit Usaha Produktif</h3>
                    <p>Membantu pesantren mengembangkan unit usaha yang berkelanjutan untuk mendukung kemandirian ekonomi.</p>
                </div>
                <div className="program-card">
                    <div className="icon-circle">
                        <Image src="/asset/icon 4.png" alt="Pelatihan SDM Pesantren Icon Buku" width={60} height={60} />
                    </div>
                    <h3>Pelatihan SDM Pesantren</h3>
                    <p>Program peningkatan kapasitas ustadz, santri, dan pengelola pesantren dalam bidang teknologi dan kewirausahaan.</p>
                </div>
                <div className="program-card">
                    <div className="icon-circle">
                        <Image src="/asset/icon 1.png" alt="Platform Donasi & Crowdfunding Icon Hati" width={60} height={60} />
                    </div>
                    <h3>Platform Donasi & Crowdfunding</h3>
                    <p>Menghubungkan pesantren dengan donatur dan pendukung melalui platform digital yang transparan dan akuntabel.</p>
                </div>
            </div>
        </section>
    );
}