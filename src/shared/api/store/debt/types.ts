import { People } from "../people";
import { DEBT_TYPES } from "./enums";

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
