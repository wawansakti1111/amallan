// types/index.ts
export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}