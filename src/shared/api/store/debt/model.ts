import { store } from "@/shared/api";
import { v4 as uuidv4 } from "uuid";
import {
  getDebtIdx,
  getDebtOppositeIdx,
  setDebtsinExists,
  setDebtsOpposite,
} from "./lib";
import { Debt, DebtCreate, DebtStores } from "./types";

export const DEBTS_STORAGE_KEY = "debts";

export const getAllDebts = async () =>
  (store.get(DEBTS_STORAGE_KEY) as Promise<DebtStores>).then(
    (data) => data || []
  );

export const setDebts = async (debts: DebtStores) => {
  return store.set(DEBTS_STORAGE_KEY, debts);
};

export const addDebt = async (debt: DebtCreate) => {
  const debts = (await getAllDebts()) || [];
  const idx = getDebtIdx(debts, debt.startDate, debt.type, true);
  const debtStore = debts[idx];

  const newDebt: Debt = {
    ...debt,
    id: uuidv4(),
    createdAt: new Date().toString(),
  };

  if (!debtStore) {
    const { idx: idxOpposite, type: oppositeType } = getDebtOppositeIdx(
      newDebt,
      debts
    );
    const debtStoreOpposite = debts[idxOpposite];

    return setDebts(
      setDebtsOpposite(
        newDebt,
        idxOpposite,
        debts,
        oppositeType,
        debtStoreOpposite
      )
    );
  }

  return setDebts(setDebtsinExists(debtStore, newDebt, idx, debts));
};

export const removeDebt = async (id: Debt["id"]) => {
  const debts = await getAllDebts();

  return setDebts(debts.filter((debt) => debt.id !== id));
};
