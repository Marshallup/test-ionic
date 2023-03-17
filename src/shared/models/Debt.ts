import { People } from "./People";

export type DebtType = "took" | "borrowed";

export interface Debt {
  id: number;
  type: DebtType;
  people: People;
  count: number;
}

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
