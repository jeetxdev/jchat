import type { WallpaperId } from "@jchat/shared";

interface Wallpaper {
  id: WallpaperId;
  label: string;
}

export const DEFAULT_WALLPAPER_ID: WallpaperId = "plain";

export const WALLPAPERS: readonly Wallpaper[] = [
  { id: "plain", label: "Plain" },
  { id: "mint", label: "Mint" },
  { id: "sand", label: "Sand" },
  { id: "blush", label: "Blush" },
  { id: "slate", label: "Slate" },
  { id: "doodle", label: "Doodle" },
];

export function getWallpaperLabel(id: WallpaperId): string {
  return WALLPAPERS.find((wallpaper) => wallpaper.id === id)?.label ?? id;
}
