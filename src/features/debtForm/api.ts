import {
  DebtCreate,
  debtStoreModel,
  DebtStores,
} from "@/shared/api/store/debt";

export const createDebtAsync = async (debt: DebtCreate): Promise<DebtStores> =>
  debtStoreModel.addDebt(debt);
