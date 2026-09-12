import type { Chat, Contact, WallpaperId } from "@jchat/shared";

export const contacts: Contact[] = [
  {
    id: "maya",
    name: "Maya Reyes",
    initials: "MR",
    color: "blue",
    phone: "+1 (415) 555-0147",
    role: "Product design · SF",
    about: "Designing the blue things. Coffee before 10, tea after.",
    online: true,
  },
  {
    id: "jordan",
    name: "Jordan Cole",
    initials: "JC",
    color: "amber",
    phone: "+1 (415) 555-0199",
    role: "Motion & sound",
    about: "Bleep bloop, making things move.",
  },
  {
    id: "amir",
    name: "Amir Khan",
    initials: "AK",
    color: "red",
    phone: "+1 (628) 555-0112",
    role: "Engineering",
    about: "Sounds good, see you then.",
  },
  {
    id: "bianca",
    name: "Bianca Costa",
    initials: "BC",
    color: "amber",
    phone: "+1 (650) 555-0164",
    role: "Marketing",
    about: "Always up for a launch.",
  },
];

export const chats: Chat[] = [
  {
    id: "chat-maya",
    kind: "dm",
    name: "Maya Reyes",
    initials: "MR",
    color: "blue",
    time: "9:12",
    preview: "Sent the deck, can you check slide 4?",
    unread: 2,
    contactId: "maya",
    pinnedMessageId: "m4",
    wallpaperId: "mint",
    messages: [
      {
        id: "m1",
        authorId: "maya",
        text: "Hey! Sent the deck over — can you check slide 4 before the 2pm?",
        time: "9:04",
      },
      { id: "m2", authorId: "me", text: "On it now", time: "9:05", read: true },
      {
        id: "m4",
        authorId: "maya",
        image: { caption: "Slide 4, the pricing table", heartCount: 2 },
        time: "9:07",
      },
      {
        id: "m5",
        authorId: "maya",
        text: "Looks great, love the blue accent on the total row",
        time: "9:09",
      },
    ],
  },
  {
    id: "chat-jordan",
    kind: "dm",
    name: "Jordan Cole",
    initials: "JC",
    color: "amber",
    time: "8:47",
    preview: "Voice message · 0:14",
    contactId: "jordan",
    messages: [{ id: "j1", authorId: "jordan", text: "Voice message · 0:14", time: "8:47" }],
  },
  {
    id: "chat-design-studio",
    kind: "group",
    name: "Design Studio",
    initials: "DS",
    color: "green",
    time: "Tue",
    preview: "shipping the blue version tonight",
    previewAuthor: "Priya",
    unread: 1,
    memberIds: ["maya", "amir", "jordan", "bianca"],
    memberCount: 12,
    adminIds: ["maya"],
    description: "Weekly sync + shared files for the blue version launch.",
    messages: [
      { id: "d1", authorId: "maya", text: "shipping the blue version tonight", time: "Tue" },
    ],
  },
  {
    id: "chat-amir",
    kind: "dm",
    name: "Amir Khan",
    initials: "AK",
    color: "red",
    time: "Mon",
    preview: "You: Sounds good, see you then",
    contactId: "amir",
    messages: [{ id: "a1", authorId: "amir", text: "Sounds good, see you then", time: "Mon" }],
  },
];

export const newContactSuggestions = ["amir", "bianca"];

export function getContact(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id);
}

export function getChat(id: string): Chat | undefined {
  return chats.find((c) => c.id === id);
}

export function getChatWallpapers(): Record<string, WallpaperId> {
  const overrides: Record<string, WallpaperId> = {};
  for (const chat of chats) {
    if (chat.wallpaperId) overrides[chat.id] = chat.wallpaperId;
  }
  return overrides;
}
