import { People } from "./People";

export type DebtType = "took" | "borrowed";

export interface Debt {
  id: number;
  type: DebtType;
  people: People;
  count: number;
}

export type Debts = Debt[];

export type DebtByTypes = Record<DebtType, Debts>;
