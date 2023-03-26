import { themeModel, THEMES } from "@/shared/api/store/theme";
import { THEME_CLASSES } from "./enums";

// Use matchMedia to check the user preference
export const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

export const isDarkTheme = async () => {
  const themeNameStore = await themeModel.getThemeStore();

  if (themeNameStore) {
    return themeNameStore === THEMES.black;
  } else {
    return prefersDark.matches;
  }
};

// Add or remove the "dark" class based on if the media query matches
export async function toggleDarkTheme(shouldAdd: boolean) {
  await themeModel.setThemeStore(shouldAdd ? THEMES.black : THEMES.white);

  document.body.classList.toggle(THEME_CLASSES.dark, shouldAdd);
}

export async function initTheme() {
  const theme = await themeModel.getThemeStore();

  if (theme) {
    toggleDarkTheme(theme === THEMES.black);
  } else {
    toggleDarkTheme(prefersDark.matches);
  }

  // Listen for changes to the prefers-color-scheme media query
  // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  prefersDark.addEventListener("change", () => {
    toggleDarkTheme(prefersDark.matches);
  });
}
