import { ref, unref, computed } from "vue";
import {
  Debt,
  DebtCreate,
  DebtStores,
  DebtType,
} from "@/shared/api/store/debt";
import { defineStore } from "pinia";
import { loadDebtsAsync } from "@/widgets/debtList";
import { createDebtAsync } from "@/features/debtForm/api";
import { setActiveDebt } from "@/shared/api/store/debt/model";

export const DEBTS_STORE_KEY = "debts";

export const useDebtStore = defineStore(DEBTS_STORE_KEY, () => {
  const debts = ref<DebtStores>([]);

  const debtsTotal = computed(() => {
    const info: Record<DebtType, number> = {
      borrowed: 0,
      took: 0,
    };

    unref(debts).forEach((debtInfo) => {
      const { debts: debtsData } = debtInfo;

      if (!Array.isArray(debtsData) && !debtInfo.type) {
        Object.keys(debtsData).forEach((typeKey) => {
          const debtKeyType = typeKey as DebtType;

          info[debtKeyType] = debtsData[debtKeyType].reduce(
            (prev, cur) => prev + (cur.active ? cur.sum : 0),
            info[debtKeyType]
          );
        });
      } else if (Array.isArray(debtsData) && debtInfo.type) {
        info[debtInfo.type] = debtsData.reduce(
          (prev, cur) => prev + (cur.active ? cur.sum : 0),
          info[debtInfo.type]
        );
      }
    });

    return info;
  });
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

  async function setDebtActiveAsync(id: Debt["id"], active: Debt["active"]) {
    setDebtStores(await setActiveDebt(id, active));

    return unref(debts);
  }

  return {
    debts,
    debtsTotal,
    getDebtsAsync,
    setDebtStores,
    createDebtStoreAsync,
    setDebtActiveAsync,
  };
});
