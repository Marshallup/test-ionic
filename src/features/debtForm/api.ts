import { DebtCreate, debtStoreModel } from "@/shared/api/store/debt";

export const createDebtAsync = async (debt: DebtCreate) =>
  debtStoreModel.addDebt(debt);
