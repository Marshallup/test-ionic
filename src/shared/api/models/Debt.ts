import { People } from "./People";

export type DebtType = "took" | "borrowed";

export interface Debt {
  id: number;
  type: DebtType;
  people: People;
  sum: number;
  created_at: string;
  startDate: string;
  endDate: string;
}

export type DebtTemplate = Omit<Debt, "id" | "created_at">;

export type Debts = Debt[];

export type DebtsByType = Record<DebtType, Debts>;

export interface DebtsSingleType {
  id: number;
  type: DebtType;
  debts: Debts;
}

export interface DebtsCombineType {
  id: number;
  type: "combine";
  debts: DebtsByType;
}

export type DebtsItemsType = DebtsSingleType | DebtsCombineType;

export type DebtsDataItems = DebtsItemsType[];
