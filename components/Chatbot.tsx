"use client";

import { useState, useRef, useEffect } from 'react';
import { sendMessageToDeepSeek } from '@/app/actions/chat';
import { ChatMessage } from '@/types/chat';
import { nanoid } from 'nanoid'; // Impor nanoid untuk ID unik

// Anda bisa membuat interface terpisah untuk pesan yang ditampilkan di UI
// karena memiliki 'id' untuk key di React
interface DisplayMessage extends ChatMessage {
  id: string; // Ubah tipe id menjadi string untuk nanoid
}

// Definisikan props untuk komponen Chatbot
interface ChatbotProps {
  onClose: () => void; // Fungsi yang akan dipanggil saat chatbot ditutup
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Efek untuk menggulir ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fungsi untuk mengirim pesan
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Gunakan nanoid untuk ID unik, ini konsisten di klien
    const newUserMessage: DisplayMessage = { id: nanoid(), role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pastikan array ini hanya berisi objek dengan properti role dan content yang diperlukan API
      const apiMessages: ChatMessage[] = [
        { role: 'system', content: 'You are a helpful assistant.' },
        // Pastikan Anda tidak mengirim ID ke API eksternal jika tidak diperlukan
        ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: newUserMessage.content }
      ];

      // Panggil fungsi untuk mengirim pesan ke DeepSeek API
      const aiResponse = await sendMessageToDeepSeek(apiMessages);

      // Gunakan nanoid untuk ID unik
      const newAiMessage: DisplayMessage = { id: nanoid(), role: 'assistant', content: aiResponse };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: DisplayMessage = { id: nanoid(), role: 'assistant', content: "Maaf, terjadi kesalahan saat memproses permintaan Anda." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Kontainer utama chatbot, kini dengan tinggi dan lebar yang dikelola oleh parent (app/page.tsx)
    // dan overflow-y-auto untuk pesan.
    <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Area tampilan pesan */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id} // Menggunakan ID unik untuk key
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {/* Indikator loading */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 rounded-lg bg-white text-gray-800 animate-pulse">
              AI is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Referensi untuk menggulir */}
      </div>

      {/* Form input pesan */}
      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan Anda..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Kirim
        </button>
      </form>
    </div>
  );
}