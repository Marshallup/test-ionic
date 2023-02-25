import { themeStore } from "./";

export const DARK_CLASS = "dark";

// Use matchMedia to check the user preference
export const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

export const isDarkTheme = async () => {
  const themeNameStore = await themeStore.getTheme();

  if (themeNameStore) {
    return themeNameStore === "black";
  } else {
    return prefersDark.matches;
  }
};

// Add or remove the "dark" class based on if the media query matches
export async function toggleDarkTheme(shouldAdd: boolean) {
  await themeStore.setTheme(shouldAdd ? "black" : "white");
  document.body.classList.toggle(DARK_CLASS, shouldAdd);
}

export async function initTheme() {
  await themeStore.createStore();

  const theme = await themeStore.getTheme();

  if (theme) {
    toggleDarkTheme(theme === "black");
  } else {
    toggleDarkTheme(prefersDark.matches);
  }

  // Listen for changes to the prefers-color-scheme media query
  // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  prefersDark.addEventListener("change", () => {
    toggleDarkTheme(prefersDark.matches);
  });
}
