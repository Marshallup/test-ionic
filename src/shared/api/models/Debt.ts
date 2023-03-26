import { People } from "./People";

export enum DEBT_TYPES {
  took = "took",
  borrowed = "borrowed",
}

export type DebtType = `${DEBT_TYPES}`;

export interface Debt {
  id: number;
  type: DebtType;
  people: People["id"];
  sum: number;
  created_at: string;
  startDate: string;
  endDate: string;
}

export type DebtCreate = Omit<Debt, "id" | "created_at">;

export type Debts = Debt[];
