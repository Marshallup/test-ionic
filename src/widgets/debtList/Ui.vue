<template>
  <div>
    <div v-if="!debtsStore.length">Пусто! Добавьте данные.</div>
    <IonList v-else class="debt-list">
      <template v-for="debtItem in debtsStore" :key="debtItem.id">
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
// import type { DebtItems } from "@/entities/debt";
import { DebtStores } from "@/shared/api/store/debt";
import { loadDebtsAsync } from "./api";

const debtsStore = ref<DebtStores>([]);

// const debtsStorePeople = computed(() =>
//   unref(debtsStore).map((item) => ({
//     ...item,
//     people: {
//       id: 1,
//       name: "qweqweq",
//     },
//   }))
// );

// const debts = reactive<DebtStores>([
// {
//   id: "qweqw",
//   type: "borrowed",
//   dateStart: "",
//   debts: [
//     {
//       id: "1",
//       type: "borrowed",
//       people: 1,
//       created_at: "",
//       startDate: "",
//       endDate: "",
//       sum: 50,
//     },
//     {
//       id: "2",
//       type: "borrowed",
//       people: 1,
//       created_at: "",
//       startDate: "",
//       endDate: "",
//       sum: 150,
//     },
//   ],
// },
// {
//   id: 2,
//   type: "took",
//   debts: [
//     {
//       id: "1",
//       type: "took",
//       people: {
//         id: 1,
//         name: "Петр",
//       },
//       created_at: "",
//       startDate: "",
//       endDate: "",
//       sum: 100,
//     },
//   ],
// },
// {
//   id: 3,
//   type: "borrowed",
//   debts: [
//     {
//       id: "1",
//       type: "borrowed",
//       people: {
//         id: 1,
//         name: "qqq",
//       },
//       created_at: "",
//       startDate: "",
//       endDate: "",
//       sum: 170,
//     },
//   ],
// },
// {
//   id: 4,
//   debts: {
//     took: [
//       {
//         id: "1",
//         type: "took",
//         people: {
//           id: 1,
//           name: "222",
//         },
//         created_at: "",
//         startDate: "",
//         endDate: "",
//         sum: 10,
//       },
//       {
//         id: "2",
//         type: "took",
//         people: {
//           id: 1,
//           name: "222",
//         },
//         created_at: "",
//         startDate: "",
//         endDate: "",
//         sum: 70,
//       },
//     ],
//     borrowed: [
//       {
//         id: "2",
//         type: "borrowed",
//         people: {
//           id: 1,
//           name: "22qqq",
//         },
//         created_at: "",
//         startDate: "",
//         endDate: "",
//         sum: 50,
//       },
//     ],
//   },
// },
// ]);

async function getDebtsAsync() {
  const debtsData = await loadDebtsAsync();

  console.log(debtsData, "data");

  debtsStore.value = debtsData;
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
