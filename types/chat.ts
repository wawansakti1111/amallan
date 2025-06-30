// types/chat.ts
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Anda bisa tambahkan interface Message di sini juga jika ingin
// export interface DisplayMessage extends ChatMessage {
//   id: number;
// }