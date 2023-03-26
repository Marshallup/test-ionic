<template>
  <IonList class="debts-list">
    <template v-for="debtItem in debts" :key="debtItem.id">
      <DebtItemSingle
        v-if="debtItem.type && Array.isArray(debtItem.debts)"
        :debts="debtItem.debts"
        :debt-type="debtItem.type"
      />
      <DebtItemPair
        v-else-if="!debtItem.type && !Array.isArray(debtItem.debts)"
        :debts="debtItem.debts"
      />
    </template>
  </IonList>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonList } from "@ionic/vue";
import { DebtItemSingle } from "@/entities/debt/debtItemSingle";
import { DebtItemPair } from "@/entities/debt/debtItemPair";
import type { DebtItems } from "@/entities/debt";

const debts = reactive<DebtItems>([
  {
    id: 1,
    type: "borrowed",
    debts: [
      {
        id: 1,
        type: "borrowed",
        people: {
          id: 1,
          name: "Петр",
        },
        created_at: "",
        startDate: "",
        endDate: "",
        sum: 50,
      },
      {
        id: 2,
        type: "borrowed",
        people: {
          id: 2,
          name: "Максим",
        },
        created_at: "",
        startDate: "",
        endDate: "",
        sum: 150,
      },
    ],
  },
  {
    id: 2,
    type: "took",
    debts: [
      {
        id: 1,
        type: "took",
        people: {
          id: 1,
          name: "Петр",
        },
        created_at: "",
        startDate: "",
        endDate: "",
        sum: 100,
      },
    ],
  },
  {
    id: 3,
    type: "borrowed",
    debts: [
      {
        id: 1,
        type: "borrowed",
        people: {
          id: 1,
          name: "qqq",
        },
        created_at: "",
        startDate: "",
        endDate: "",
        sum: 170,
      },
    ],
  },
  {
    id: 4,
    debts: {
      took: [
        {
          id: 1,
          type: "took",
          people: {
            id: 1,
            name: "222",
          },
          created_at: "",
          startDate: "",
          endDate: "",
          sum: 10,
        },
        {
          id: 2,
          type: "took",
          people: {
            id: 1,
            name: "222",
          },
          created_at: "",
          startDate: "",
          endDate: "",
          sum: 70,
        },
      ],
      borrowed: [
        {
          id: 2,
          type: "borrowed",
          people: {
            id: 1,
            name: "22qqq",
          },
          created_at: "",
          startDate: "",
          endDate: "",
          sum: 50,
        },
      ],
    },
  },
]);
</script>

<style lang="scss" scoped>
.debts-list {
  padding: 10px;
}
</style>
