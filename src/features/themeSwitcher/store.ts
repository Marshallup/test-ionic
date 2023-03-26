import { store } from "@/shared/api";
import { GLOBAL_APP_PREFIX } from "@/shared/config";
import { Theme } from "./types";

export const THEME_KEY = `${GLOBAL_APP_PREFIX}theme`;

export async function getThemeStore() {
  return store.get(THEME_KEY) as Promise<Theme | null>;
}

export async function setThemeStore(theme: Theme) {
  return store.set(THEME_KEY, theme);
}
