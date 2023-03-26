import { store } from "@/shared/api";
import { v4 as uuidv4 } from "uuid";
import { DEBT_TYPES } from "./enums";
import { getDebtIdx } from "./lib";
import { Debt, DebtCreate, DebtPairStore, Debts, DebtStores } from "./types";

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
  const idx = getDebtIdx(debts, debt.startDate, debt.type);
  const debtStore = debts[idx];

  const newDebt = { ...debt, id: uuidv4(), createdAt: new Date().toString() };

  if (!debtStore) {
    const oppositeDebtType =
      debt.type === DEBT_TYPES.borrowed ? DEBT_TYPES.took : DEBT_TYPES.borrowed;
    const idxOpposite = getDebtIdx(debts, debt.startDate, oppositeDebtType);
    const debtStoreOpposite = debts[idxOpposite];

    if (!debtStoreOpposite) {
      return setDebts([
        ...debts,
        {
          id: uuidv4(),
          dateStart: newDebt.startDate,
          type: debt.type,
          debts: [newDebt],
        },
      ]);
    } else {
      const newOppositeDebt = {
        id: debtStoreOpposite.id,
        dateStart: debtStoreOpposite.dateStart,
        debts: {
          [oppositeDebtType]: [...(debtStoreOpposite.debts as Debts)],
          [debt.type]: [newDebt],
        },
      };

      debts[idxOpposite] = newOppositeDebt as DebtPairStore;

      console.log(
        "has opposite",
        idxOpposite,
        debtStoreOpposite.type,
        oppositeDebtType,
        newOppositeDebt,
        "www"
      );

      return setDebts(debts);
    }
  } else {
    if (debtStore.type) {
      debtStore.debts.push({ ...newDebt });
    } else if (!debtStore.type) {
      debtStore.debts[newDebt.type] = {
        ...debtStore.debts[newDebt.type],
        ...newDebt,
      };
    }

    debts[idx] = debtStore;

    return setDebts(debts);
  }
};

export const removeDebt = async (id: Debt["id"]) => {
  const debts = await getAllDebts();

  return setDebts(debts.filter((debt) => debt.id !== id));
};
