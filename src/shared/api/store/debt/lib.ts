import dayjs from "dayjs";
import { DEBT_TYPES } from "./enums";
import { v4 as uuidv4 } from "uuid";
import {
  Debt,
  DebtPairStore,
  Debts,
  DebtsByType,
  DebtStore,
  DebtStores,
  DebtType,
} from "./types";

export const getDebtIdx = (
  debts: DebtStores,
  date: string,
  type: DebtType,
  withPair = false
) => {
  const compareFormat = "DD.MM.YYYY";
  const dateCompare = dayjs(date).format(compareFormat);

  const debtSingleIdx = debts.findIndex(
    (debt) =>
      dayjs(debt.dateStart).format(compareFormat) === dateCompare &&
      debt.type === type
  );

  if (debtSingleIdx === -1 && withPair) {
    return debts.findIndex(
      (debt) =>
        dayjs(debt.dateStart).format(compareFormat) === dateCompare &&
        !debt.type &&
        debt.debts[type]
    );
  }

  return debtSingleIdx;
};

export const getDebtOppositeIdx = (debt: Debt, debts: DebtStores) => {
  const oppositeDebtType =
    debt.type === DEBT_TYPES.borrowed ? DEBT_TYPES.took : DEBT_TYPES.borrowed;

  return {
    idx: getDebtIdx(debts, debt.startDate, oppositeDebtType),
    type: oppositeDebtType,
  };
};

export const setDebtsinExists = (
  debt: DebtStore,
  newDebt: Debt,
  idxDebt: number,
  debts: DebtStores
) => {
  const cloneDebt = { ...debt };

  if (cloneDebt.type) {
    cloneDebt.debts.push({ ...newDebt });
  } else if (!cloneDebt.type) {
    cloneDebt.debts[newDebt.type] = [...cloneDebt.debts[newDebt.type], newDebt];
  }

  return debts.map((item, idx) => {
    if (idx === idxDebt) {
      return cloneDebt;
    }

    return item;
  });
};

export const setDebtsOpposite = (
  newDebt: Debt,
  idxDebt: number,
  debts: DebtStores,
  type: DEBT_TYPES,
  debtStore: DebtStore
): DebtStores => {
  if (!debtStore) {
    return [
      ...debts,
      {
        id: uuidv4(),
        dateStart: newDebt.startDate,
        type: newDebt.type,
        debts: [newDebt],
      },
    ];
  } else {
    const newOppositeDebt: DebtPairStore = {
      id: debtStore.id,
      dateStart: debtStore.dateStart,
      debts: {
        [type]: [...(debtStore.debts as Debts)],
        [newDebt.type]: [newDebt],
      } as DebtsByType,
    };

    return debts.map((item, idx) => {
      if (idx === idxDebt) {
        return newOppositeDebt;
      }

      return item;
    });
  }
};
