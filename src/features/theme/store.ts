import { GENERAL } from "@/consts";
import { Storage } from "@ionic/storage";

export type Theme = "white" | "black";

export const THEME_KEY = `${GENERAL.GLOBAL_APP_PREFIX}theme`;

export const store = new Storage();

export async function createStore() {
  await store.create();
}

export async function getTheme() {
  return store.get(THEME_KEY) as Promise<Theme | null>;
}

export async function setTheme(theme: Theme) {
  return store.set(THEME_KEY, theme);
}
