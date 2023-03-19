import { AppMode } from "../types";

export const APP_MODE: AppMode =
  process.env.VUE_APP_MODE === "undefined"
    ? undefined
    : process.env.VUE_APP_MODE;
