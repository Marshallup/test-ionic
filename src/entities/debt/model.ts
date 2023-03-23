import { DebtTemplate, DEBT_COLL } from "@/shared";
import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
} from "firebase/firestore";

export const addDebt = (db: Firestore, debt: DebtTemplate) => {
  return addDoc(collection(db, DEBT_COLL), {
    ...debt,
    created_at: serverTimestamp(),
  });
};
