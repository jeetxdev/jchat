export type AvatarColor = "blue" | "amber" | "green" | "red";

export interface Contact {
  id: string;
  name: string;
  initials: string;
  color: AvatarColor;
  phone: string;
  role: string;
  about: string;
  online?: boolean;
}

export interface Message {
  id: string;
  authorId: string | "me";
  text?: string;
  image?: { caption: string; heartCount: number };
  time: string;
  read?: boolean;
}

export interface Chat {
  id: string;
  kind: "dm" | "group";
  name: string;
  initials: string;
  color: AvatarColor;
  time: string;
  preview: string;
  previewAuthor?: string;
  unread?: number;
  contactId?: string;
  memberIds?: string[];
  memberCount?: number;
  adminIds?: string[];
  description?: string;
  pinnedMessageId?: string;
  messages: Message[];
}
