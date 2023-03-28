<template>
  <div>
    <div v-if="!debts.length">Пусто! Добавьте данные.</div>
    <IonList v-else class="debt-list">
      <template v-for="debtItem in debts" :key="debtItem.id">
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
import { onMounted } from "vue";
import { IonList } from "@ionic/vue";
import { storeToRefs } from "pinia";
import { DebtItemSingle } from "@/entities/debt/debtItemSingle";
import { DebtItemPair } from "@/entities/debt/debtItemPair";
import { useDebtStore } from "@/shared/stores/debts";

const debtStore = useDebtStore();

const { debts } = storeToRefs(debtStore);

onMounted(() => {
  debtStore.getDebtsAsync();
});
</script>

<style lang="scss" scoped>
.debt-list {
  padding: 10px;
}
</style>
