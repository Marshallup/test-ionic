<template>
  <IonList class="debts-list">
    <template v-for="debtsItem in debtTypes" :key="debtsItem.id">
      <DebtsItem
        v-if="debtsItem.type !== 'combine'"
        :debts="debtsItem.debts"
        :debt-type="debtsItem.type"
      />
      <DebtsItemMultiple
        v-else-if="debtsItem.type === 'combine'"
        :debts="debtsItem.debts"
      />
    </template>
  </IonList>
</template>

<script setup lang="ts">
import { IonList } from "@ionic/vue";
import { DebtsItem, DebtsItemMultiple } from "@/entities";
import { DebtsDataItems } from "@/shared";
import { reactive } from "vue";

const debtTypes = reactive<DebtsDataItems>([
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
        count: 50,
      },
      {
        id: 2,
        type: "borrowed",
        people: {
          id: 2,
          name: "Максим",
        },
        count: 150,
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
        count: 100,
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
        count: 170,
      },
    ],
  },
  {
    id: 4,
    type: "combine",
    debts: {
      took: [
        {
          id: 1,
          type: "took",
          people: {
            id: 1,
            name: "222",
          },
          count: 10,
        },
        {
          id: 2,
          type: "took",
          people: {
            id: 1,
            name: "222",
          },
          count: 70,
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
          count: 50,
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
