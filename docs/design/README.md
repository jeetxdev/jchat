# Handoff: jchat Mobile & Web Messaging UI

## Overview
UI mockups for "jchat," a messaging app, covering mobile (iOS-style) and desktop web layouts: chat list, conversation thread, contact/group profiles, new-chat picker, settings, and voice call screens, each in light and dark variants.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look, layout, and copy, not production code to copy directly. Recreate these designs in the target codebase's existing environment (React, Vue, SwiftUI, native, etc.) using its established components and patterns. If no environment exists yet, choose the most appropriate framework and implement there.

## Target implementation
Implement in **React (JSX + functional components)**. If the target repo already has a component library, styling approach (CSS Modules / Tailwind / styled-components) and routing set up, follow those; otherwise scaffold with Vite + React, plain CSS Modules, and `lucide-react` for icons. One component per screen, shared primitives for Avatar, ChatRow, MessageBubble, IconButton, Pill, SectionLabel, TabBar.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and component states shown are final; recreate pixel-perfectly using the codebase's own component library where equivalents exist.

## Screens

All mobile screens are laid out in a 390×844 phone frame; desktop screens use a 1180×760 two/three-pane window.

### 01 — Chat list
- Header "Chats" (Fredoka 600, 26px), search + compose icon buttons (36×36, 12px radius, `#F1F4F8` / accent `#0B84FF`).
- Filter pills: "All" (active, `#0B84FF` fill, white text), "Unread · 3", "Groups" (inactive, `#F1F4F8` fill, `#334155` text), 999px radius, 12px/600 weight.
- Chat rows: 52×52 rounded-16 avatar (initials, Fredoka 600 16px, colored fill), name (15px bold) + timestamp (11px `#94A3B8`) on top row, preview text (13px `#64748B`, truncated) below, unread badge (20×20 circle, `#0B84FF`, white 11px bold).
- Bottom tab bar: Chats (active, `#0B84FF`), Status, Calls, Settings — Lucide-style stroke icons, 10px/600 labels.

### 02 — Conversation thread
- Header: back chevron, 38×38 avatar, name (Fredoka 600 15px) + "online" status (`#10B981` 11px), call/video icon buttons.
- Pinned-message bar: `#EAF3FF` background, pin icon, pinned text (`#0A6FD1` 600), counter.
- Message bubbles: incoming — white, `border-radius:18px 18px 18px 4px`, subtle shadow; outgoing — `#0B84FF` fill white text, `border-radius:18px 18px 4px 18px`; both 14px/1.4, max-width 76%. Image-attachment bubble includes thumbnail placeholder, caption, reaction pill.
- Composer: attach icon, pill text field (40px, `#F7F9FC`, 1px `#E2E8F0` border), send button (40×40, `#0B84FF`, 14px radius).

### 03 — Contact profile
- Centered avatar (100×100, radius 32, Fredoka 600 34px), name (Fredoka 600 20px), phone (13px `#64748B`), role pill (`#F1F4F8`).
- 4-up quick-action grid (Message/Call/Video/Mute): 16px-radius `#F1F4F8` tiles, `#0B84FF` icons, 10px/600 labels.
- About section (11px uppercase `#0A6FD1` label + 14px body), list rows (Media/links/docs, Block contact in `#EF4444`) with 1px `#E2E8F0` dividers.

### 04 — New chat picker
- Header "New chat" (Fredoka 600 20px) + "Cancel" (`#0B84FF` 14px).
- Search field placeholder (40px pill).
- "New group" / "New contact" rows: 44×44 `#EAF3FF` icon tile, `#0B84FF` 14px bold label.
- "CONTACTS ON JCHAT" section label (11px/700 uppercase `#94A3B8`), contact rows with 40×40 initial avatars.

### 05 — Group info
- Centered group avatar (88×88, radius 28), name, "Group · 12 members" meta.
- 3-up action grid (Mute/Search/Media).
- Description paragraph, "12 MEMBERS" label, member rows with Admin badge (`#EAF3FF` pill, `#0A6FD1` text).

### 06 — Settings
- "Settings" title (Fredoka 600 24px).
- Profile row (56×56 avatar + name/status).
- "ACCOUNT" section label, rows: Privacy, Chats, Notifications — each with 34×34 `#EAF3FF` icon tile.

### 07 — Call screen
- Dark theme (`#111827` bg, white text). Centered 120×120 avatar, name, "04:12 · voice call" meta.
- Control row: Mute/Speaker/Video (52×52, `#1F2937` tiles) + End call (52×52 red `#EF4444`, rotated handset icon).

### 08–09 — Dark-mode chat list & conversation
Same structure as 01/02 on a dark palette: bg `#0B1220`, surfaces `#1E293B`, borders `#33465F`, text `#F1F5F9`, muted text `#94A3B8`; accent `#0B84FF` unchanged.

### 10–15 — Desktop two/three-pane layouts
Same screens (list, conversation, contact profile, new chat, group info, settings, call) recomposed for desktop: fixed 320–360px sidebar, flexible center pane, optional 340px right-side detail panel. Call screen is full-bleed dark, centered content.

## Interactions & Behavior
- Static mockups; no wired interactions. Implied behavior: tapping a chat row opens the conversation thread; tapping avatar/name opens contact or group info; compose (+) opens new-chat picker; call icons open the call screen; settings rows navigate to sub-pages (e.g., Privacy detail shown in 14).
- Toggle switch shown in Settings → Privacy (Read receipts) implies an on/off control (`#0B84FF` track, white thumb).

## Design Tokens
**Colors**
- Accent (brand blue): `#0B84FF`; accent-dark text: `#0A6FD1`; accent-tint bg: `#EAF3FF`
- Neutrals (light): bg `#F7F9FC`, surface `#FFFFFF`, border `#E2E8F0` / `#EEF2F6`, text `#0F172A`, muted text `#64748B` / `#94A3B8`
- Neutrals (dark): bg `#0B1220`, surface `#1E293B`, border `#33465F` / `#1E293B`, text `#F1F5F9`, muted `#94A3B8`
- Status: online/success `#10B981`, warning/avatar `#F59E0B`, destructive `#EF4444`

**Typography**
- Headings: Fredoka, 500/600/700 weight
- Body/UI: Plus Jakarta Sans, 400–700 weight
- Scale used: 26px (page titles), 20–24px (screen headers), 15–16px (names/nav), 13–14px (body), 11–12px (meta/labels)

**Radius**: avatars 12–32px depending on size (roughly avatar-size/3.3), pills/buttons 999px, cards/tiles 12–20px, phone frame 34–44px.

**Shadows**: message bubble `0 1px 2px rgba(15,23,42,.06)`; phone frame `0 30px 60px rgba(15,23,42,.18)`; desktop window `0 20px 50px rgba(15,23,42,.1)`.

## Assets
- All avatars are colored initial tiles (no photography used).
- Icons are inline SVG in the Lucide style (stroke-based, 1.5–2.4px stroke width) — use the Lucide icon set (https://lucide.dev) in the real implementation rather than copying inline SVG paths.
- Two logo/icon mark variants also live in this project (`jchat-logo*.svg`, `jchat-icon*.svg`) in red, ink, gray, and blue colorways — not shown in these screen mockups but part of the same product's identity.

## Files
- `jchat Mockups v2.dc.html` — the 15-screen mockup set described above (source of truth for all layout/detail).
- `jchat-logo-blue.svg`, `jchat-logo-ink.svg`, `jchat-logo-gray.svg`, `jchat-logo.svg` — wordmark lockups.
- `jchat-icon-blue.svg`, `jchat-icon-ink.svg`, `jchat-icon-gray.svg`, `jchat-icon.svg` — icon-only marks.
