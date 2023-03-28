<template>
  <div>
    <div v-if="!debtStores.length">Пусто! Добавьте данные.</div>
    <IonList v-else class="debt-list">
      <template v-for="debtItem in debtStores" :key="debtItem.id">
        <DebtItemSingle
          v-if="debtItem.type && Array.isArray(debtItem.debts)"
          :debts="debtItem.debts"
          :type="debtItem.type"
        />
        <DebtItemPair
          v-else-if="!debtItem.type && !Array.isArray(debtItem.debts)"
          :debts="debtItem.debts"
        />
      </template>
    </IonList>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonList } from "@ionic/vue";
import { DebtItemSingle } from "@/entities/debt/debtItemSingle";
import { DebtItemPair } from "@/entities/debt/debtItemPair";
import { DebtStores } from "@/shared/api/store/debt";
import { loadDebtsAsync } from "./api";

const debtStores = ref<DebtStores>([]);

async function getDebtsAsync() {
  debtStores.value = await loadDebtsAsync();
}

defineExpose({
  getDebtsAsync,
});
</script>

<style lang="scss" scoped>
.debt-list {
  padding: 10px;
}
</style>
