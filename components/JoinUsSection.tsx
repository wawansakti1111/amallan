import Image from 'next/image';
import Link from 'next/link';

export default function JoinUsSection() {
    return (
        <section id="bergabung-gerakan" className="section-padding">
            <h2 className="section-heading">Bergabung dengan Gerakan Kebaikan</h2>
            <p className="section-description">Ada banyak cara untuk berkontribusi dalam gerakan digitalisasi dan kemandirian pesantren</p>
            <div className="gerakan-card-grid">
                <div className="gerakan-card">
                    <div className="gerakan-icon-container">
                        <Image src="/asset/icon_donasi.png" alt="Ikon Donasi" width={40} height={40} />
                    </div>
                    <h3>Donasi</h3>
                    <p>Dukung program-program Amallan melalui donasi untuk membantu lebih banyak pesantren mencapai kemandirian.</p>
                    <Link href="#donasi-page" className="gerakan-button">Donasi Sekarang</Link>
                </div>
                <div className="gerakan-card">
                    <div className="gerakan-icon-container">
                        <Image src="/asset/icon_kolaborasi.png" alt="Ikon Kolaborasi" width={40} height={40} />
                    </div>
                    <h3>Kolaborasi</h3>
                    <p>Ajak organisasi atau perusahaan Anda untuk berkolaborasi dalam program pemberdayaan pesantren.</p>
                    <Link href="#kolaborasi-page" className="gerakan-button">Ajukan Kolaborasi</Link>
                </div>
                <div className="gerakan-card">
                    <div className="gerakan-icon-container">
                        <Image src="/asset/icon_relawan.png" alt="Ikon Jadi Relawan" width={40} height={40} />
                    </div>
                    <h3>Jadi Relawan</h3>
                    <p>Kontribusikan waktu, tenaga, dan keahlian Anda untuk membantu pesantren berkembang.</p>
                    <Link href="#relawan-page" className="gerakan-button">Gabung Sekarang</Link>
                </div>
            </div>
            <div className="hubungi-kami-container">
                <Link href="#contact" className="button-hubungi-kami-putih">Hubungi Kami</Link>
            </div>
        </section>
    );
}