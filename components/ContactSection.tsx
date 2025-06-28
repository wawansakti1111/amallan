'use client'; // Client Component karena ada form submission

import { useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        Nama: '',
        Email: '',
        WhatsApp: '',
        Pesan: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formspreeUrl = "https://formspree.io/f/mblyaozw"; // URL Formspree Anda

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Pesan Terkirim!',
                    text: 'Terima kasih atas pesan Anda. Kami akan segera menghubungi Anda.',
                    confirmButtonColor: '#2E7D32',
                    confirmButtonText: 'OK'
                });
                form.reset();
                setFormData({ Nama: '', Email: '', WhatsApp: '', Pesan: '' }); // Reset state form
            } else {
                const data = await response.json();
                if (data.errors) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Mengirim Pesan!',
                        text: data.errors.map((error: any) => error.message).join(", "),
                        confirmButtonColor: '#FF0000',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Mengirim Pesan!',
                        text: 'Terjadi kesalahan saat mengirim pesan. Mohon coba lagi.',
                        confirmButtonColor: '#FF0000',
                        confirmButtonText: 'OK'
                    });
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal Mengirim Pesan!',
                text: 'Terjadi masalah jaringan atau koneksi. Mohon coba lagi.',
                confirmButtonColor: '#FF0000',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <section id="contact" className="contact-section-padding">
            <h2 className="contact-heading">Kontak & Sosial Media</h2>
            <p className="contact-subheading">Hubungi kami untuk informasi lebih lanjut atau kolaborasi</p>
            
            <div className="contact-content-new">
                <div className="contact-info-new">
                    <h3 className="contact-box-title">Hubungi Kami</h3>
                    <div className="contact-item-new">
                        <Image src="/asset/icon_email.png" alt="Email Icon" width={42} height={42} />
                        <div className="text-content">
                            <strong>Email</strong>
                            <p>amallanindonesia@gmail.com</p>
                        </div>
                    </div>
                    <div className="contact-item-new">
                        <Image src="/asset/icon_whatsapp.png" alt="WhatsApp Icon" width={42} height={42} />
                        <div className="text-content">
                            <strong>WhatsApp</strong>
                            <p>0821 5939 2448</p>
                        </div>
                    </div>
                    <div className="contact-item-new">
                        <Image src="/asset/icon_website.png" alt="Website Icon" width={42} height={42} />
                        <div className="text-content">
                            <strong>Website</strong>
                            <p>www.amallan.id</p>
                        </div>
                    </div>
                    <div className="contact-item-new">
                        <Image src="/asset/icon_alamat.png" alt="Alamat Icon" width={42} height={42} />
                        <div className="text-content">
                            <strong>Alamat</strong>
                            <p>Jl. HM Suwignyo Gg. Margodadirejo 1 No.12A, Kota Pontianak, Kalbar</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-new">
                    <h3 className="contact-box-title">Kirim Pesan</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name-new">Nama</label>
                            <input
                                type="text"
                                id="name-new"
                                name="Nama"
                                placeholder=""
                                required
                                value={formData.Nama}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-new">Email</label>
                            <input
                                type="email"
                                id="email-new"
                                name="Email"
                                placeholder=""
                                required
                                value={formData.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="wa-new">WA</label>
                            <input
                                type="tel"
                                id="wa-new"
                                name="WhatsApp"
                                placeholder=""
                                required
                                value={formData.WhatsApp}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message-new">Pesan</label>
                            <textarea
                                id="message-new"
                                name="Pesan"
                                rows={4}
                                placeholder=""
                                required
                                value={formData.Pesan}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit">Kirim Pesan</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}