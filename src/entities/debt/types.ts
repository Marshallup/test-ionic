import { Debt, DebtType } from "@/shared/api/store/debt";
import { People } from "@/shared/api/store/people";

export type DebtPeopleInfo = Omit<Debt, "people"> & {
  people: People;
};

export type DebtsPeopleInfo = DebtPeopleInfo[];

export type DebtsByType = Record<DebtType, DebtsPeopleInfo>;

export interface DebtItemBase {
  id: number;
  type?: DebtType;
  debts: DebtsPeopleInfo | DebtsByType;
}

export interface DebtItemSingleType extends DebtItemBase {
  type: DebtType;
  debts: DebtsPeopleInfo;
}

export interface DebtItemPairType extends DebtItemBase {
  type?: undefined;
  debts: DebtsByType;
}

export type DebtItem = DebtItemSingleType | DebtItemPairType;

export type DebtItems = DebtItem[];
