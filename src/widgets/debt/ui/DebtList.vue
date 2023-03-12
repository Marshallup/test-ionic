<template>
  <IonList>
    <template v-for="(debts, debtType) in debtTypes" :key="debtType">
      <DebtsItem v-if="debts.length" :debts="debts" :debt-type="debtType" />
    </template>
  </IonList>
</template>

<script setup lang="ts">
import { IonList } from "@ionic/vue";
import { DebtsItem } from "@/entities";
import { DebtByTypes } from "@/share";
import { reactive } from "vue";

const debtTypes = reactive<DebtByTypes>({
  took: [
    {
      id: 1,
      type: "took",
      people: {
        id: 1,
        name: "Петр",
      },
      count: 50,
    },
    {
      id: 2,
      type: "took",
      people: {
        id: 2,
        name: "Максим",
      },
      count: 150,
    },
  ],
  borrowed: [
    {
      id: 3,
      type: "borrowed",
      people: {
        id: 1,
        name: "Петр",
      },
      count: 65,
    },
    {
      id: 4,
      type: "borrowed",
      people: {
        id: 2,
        name: "Максим",
      },
      count: 150,
    },
  ],
});
</script>

<style scoped></style>
