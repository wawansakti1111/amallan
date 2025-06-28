import Image from 'next/image';

export default function TemalSection() {
    return (
        <section id="kenalan-temal" className="section-padding">
            <h2 className="section-heading">Kenalan dengan Temal</h2>
            <p className="section-description">Maskot Amallan yang selalu siap menemani perjalanan kebaikan</p>
            <div className="temal-container">
                <div className="temal-text-content">
                    <h3>Temal, Teman Beramal</h3>
                    <p>Temal adalah maskot Amallan yang mewakili semangat berbagi dan kolaborasi. Dengan senyum ramah dan tangan terbuka, Temal selalu siap mengajak semua kalangan untuk bergabung dalam gerakan kebaikan.</p>
                    <p>Temal hadir sebagai simbol bahwa beramal dan berbuat baik itu menyenangkan, terutama ketika dilakukan bersama-sama sebagai sebuah komunitas.</p>
                    <div className="temal-tags">
                        <div className="temal-tag">
                            <i className="fas fa-check-circle"></i> Ramah
                        </div>
                        <div className="temal-tag">
                            <i className="fas fa-check-circle"></i> Inspiratif
                        </div>
                        <div className="temal-tag">
                            <i className="fas fa-check-circle"></i> Kolaboratif
                        </div>
                    </div>
                </div>
                <div className="temal-image-container">
                    <Image src="/asset/kenalan_temal_maskot.png" alt="Maskot Amallan bernama Temal" width={400} height={400} />
                </div>
            </div>
        </section>
    );
}