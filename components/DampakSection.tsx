import Image from 'next/image';

export default function DampakSection() {
    return (
        <section id="dampak-nyata" className="section-padding">
            <h2 className="section-heading">Dampak Nyata</h2>
            <p className="section-description">Kisah sukses pesantren yang telah bermitra dengan Amallan</p>
            <div className="dampak-content">
                <div className="dampak-gallery">
                    <Image src="/asset/darulfikri1.png" alt="Pondok Pesantren Darul Fikri - Gerbang Utama" width={300} height={200} />
                    <Image src="/asset/darulfikri2.png" alt="Pondok Pesantren Darul Fikri - Area Persawahan" width={300} height={200} />
                    <Image src="/asset/darulfikri3.png" alt="Pondok Pesantren Darul Fikri - Kebun Anggur" width={300} height={200} />
                    <Image src="/asset/darulfikri4.png" alt="Pondok Pesantren Darul Fikri - Santri dan Bangunan" width={300} height={200} />
                </div>
                <div className="dampak-info-card">
                    <h3>Pondok Pesantren Darul Fikri</h3>
                    <p>Sebelum bermitra dengan Amallan, Pondok Pesantren Darul Fikri menghadapi tantangan dalam manajemen administrasi dan keuangan yang masih manual. Selain itu, potensi ekonomi pesantren belum terkelola dengan optimal.</p>
                    <p>Setelah 1 tahun bermitra dengan Amallan:</p>
                    <ul>
                        <li><i className="fas fa-check-circle"></i> Sistem administrasi dan keuangan terdigitalisasi, meningkatkan efisiensi 70%</li>
                        <li><i className="fas fa-check-circle"></i> Unit usaha produksi makanan ringan berkembang dan memasarkan produk secara online</li>
                        <li><i className="fas fa-check-circle"></i> 25 santri terlatih dalam keterampilan digital dan kewirausahaan</li>
                        <li><i className="fas fa-check-circle"></i> Pendapatan pesantren meningkat 40% dari unit usaha produktif</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}