import { People } from "../people";
import { DEBT_TYPES } from "./enums";

export type DebtType = `${DEBT_TYPES}`;

export interface Debt {
  id: string;
  type: DebtType;
  people: People["id"];
  sum: number;
  createdAt: string;
  startDate: string;
  endDate: string;
}

export type DebtCreate = Omit<Debt, "id" | "created_at">;

export type Debts = Debt[];

export type DebtsByType = Record<DebtType, Debts>;

export interface DebtStoreBase<T = Debts> {
  id: string;
  type?: DebtType;
  dateStart: string;
  debts: T;
}

export interface DebtSingleStore<T = Debts> extends DebtStoreBase<T> {
  type: DebtType;
}

export interface DebtPairStore<T = DebtsByType> extends DebtStoreBase<T> {
  type?: undefined;
}

export type DebtStore = DebtSingleStore | DebtPairStore;

export type DebtStores = DebtStore[];
