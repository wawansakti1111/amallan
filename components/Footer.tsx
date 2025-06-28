import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-grid">
                <div className="footer-col footer-logo-col">
                    <Image src="/asset/Salinan dari Salinan dari Tambahkan judul (3).png" alt="Logo Amallan" width={200} height={50} className="footer-logo-new" />
                    <p>Gerakan Digitalisasi dan Kemandirian Pesantren.</p>
                    <div className="social-icons">
                        <Link href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></Link>
                        <Link href="https://www.instagram.com/amallan.id" target="_blank" aria-label="Instagram"><i className="fab fa-instagram"></i></Link>
                        <Link href="#" aria-label="Youtube"><i className="fab fa-youtube"></i></Link>
                        <Link href="https://wa.me/6285198835192" target="_blank" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></Link>
                    </div>
                </div>
                
                <div className="footer-col">
                    <h3>Kontak Kami</h3>
                    <div className="footer-contact-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>Jl. HM Suwignyo Gg. Margodadirejo 1 No.12A, Kota Pontianak, Kalbar</p>
                    </div>
                    <div className="footer-contact-item">
                        <i className="fas fa-phone-alt"></i>
                        <p>0821 5939 2448</p>
                    </div>
                    <div className="footer-contact-item">
                        <i className="fas fa-envelope"></i>
                        <Link href="mailto:amallanindonesia@gmail.com">amallanindonesia@gmail.com</Link>
                    </div>
                </div>

                <div className="footer-col">
                    <h3>Jam Operasional</h3>
                    <div className="jam-operasional-item">
                        <p>Senin - Jumat : 08:00 - 17:00</p>
                    </div>
                    <div className="jam-operasional-item">
                        <p>Sabtu : 09:00 - 15:00</p>
                    </div>
                    <div className="jam-operasional-item">
                        <p>Minggu : Tutup</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 | amallan.id Hak Cipta Dilindungi.</p>
            </div>
        </footer>
    );
}