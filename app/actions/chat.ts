// app/actions/chat.ts
"use server";

import { ChatMessage } from '@/types/chat'; // <-- Impor dari sini

export async function sendMessageToDeepSeek(messages: ChatMessage[]): Promise<string> {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

  if (!DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API Key not found. Please set DEEPSEEK_API_KEY in your environment variables.");
  }

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Atau model DeepSeek lainnya
        messages: messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DeepSeek API Error:", errorData);
      throw new Error(`DeepSeek API request failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Error communicating with DeepSeek API:", error);
    return "Maaf, terjadi kesalahan saat menghubungi DeepSeek AI.";
  }
}