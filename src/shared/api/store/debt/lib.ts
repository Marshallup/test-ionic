import dayjs from "dayjs";
import { DebtStores, DebtType } from "./types";

export const getDebtIdx = (
  debts: DebtStores,
  date: string,
  type?: DebtType
) => {
  const compareFormat = "DD.MM.YYYY";
  const dateCompare = dayjs(date).format(compareFormat);

  return debts.findIndex(
    (debt) =>
      dayjs(debt.dateStart).format(compareFormat) === dateCompare &&
      (type !== undefined ? debt.type === type : true)
  );
};
