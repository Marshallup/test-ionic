import { store } from "@/shared/api";
import { Debt, Debts } from "./types";

export const DEBTS_STORAGE_KEY = "debts";

export const getAllDebts = async () =>
  (store.get(DEBTS_STORAGE_KEY) as Promise<Debts>) || [];

export const setDebts = async (debts: Debts) => {
  return store.set(DEBTS_STORAGE_KEY, debts);
};

export const addDebt = async (debt: Debt) => {
  const debts = (await getAllDebts()) || [];

  return setDebts([...debts, debt]);
};

export const removeDebt = async (id: Debt["id"]) => {
  const debts = await getAllDebts();

  return setDebts(debts.filter((debt) => debt.id !== id));
};
