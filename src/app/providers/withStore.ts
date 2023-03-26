import { store } from "@/shared/api";

export async function createStore() {
  return store.create();
}
