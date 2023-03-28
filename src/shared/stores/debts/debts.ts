import { ref, unref } from "vue";
import { DebtCreate, DebtStores } from "@/shared/api/store/debt";
import { defineStore } from "pinia";
import { loadDebtsAsync } from "@/widgets/debtList";
import { createDebtAsync } from "@/features/debtForm/api";

export const DEBTS_STORE_KEY = "debts";

export const useDebtStore = defineStore(DEBTS_STORE_KEY, () => {
  const debts = ref<DebtStores>([]);
  const debtsLoaded = ref(false);

  function setDebtStores(newDebts: DebtStores) {
    debts.value = newDebts;
  }

  async function getDebtsAsync(forceLoad = false) {
    if (!unref(debtsLoaded) || forceLoad) {
      debtsLoaded.value = true;
      debts.value = await loadDebtsAsync();
    }
  }

  async function createDebtStoreAsync(debt: DebtCreate) {
    setDebtStores(await createDebtAsync(debt));

    return unref(debts);
  }

  return {
    debts,
    getDebtsAsync,
    setDebtStores,
    createDebtStoreAsync,
  };
});
