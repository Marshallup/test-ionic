<template>
  <ListItem class="debts-item" :class="{ 'debts-item--single': isSingleDebt }">
    <IonRow class="debts-item__row">
      <IonCol size="4" class="debts-item__col debts-item__title">
        <div>
          {{ debts.length < 2 ? DEBT_TITLE[type] : DEBT_TITLES[type] }}:
        </div>
      </IonCol>
      <IonCol size="4" class="debts-item__col debts-item__people">
        <div
          v-for="debt in debts"
          :key="debt.id"
          class="debts-item__people-name"
        >
          {{ debt.people }}
        </div>
      </IonCol>
      <IonCol size="4" class="debts-item__col debts-item__count">
        <div
          v-for="debt in debts"
          :key="debt.id"
          class="debts-item__count-number"
        >
          {{ debt.sum }}
        </div>
      </IonCol>
    </IonRow>

    <template #footer>
      <div v-if="!isSingleDebt" class="debts-item__footer">
        <IonRow class="ion-justify-content-center">
          <div>{{ total }}</div>
        </IonRow>
      </div>
    </template>
  </ListItem>
</template>

<script setup lang="ts">
import { IonCol, IonRow } from "@ionic/vue";
import { computed } from "vue";
// import { DebtsPeopleInfo } from "../types";
import { ListItem } from "@/shared/ui/listItem";
import {
  type DebtType,
  Debts,
  DEBT_TITLE,
  DEBT_TYPES,
  DEBT_TITLES,
} from "@/shared/api/store/debt";

interface DebtsItemProps {
  debts: Debts;
  type: DebtType;
}

const props = defineProps<DebtsItemProps>();

const isSingleDebt = computed(() => props.debts.length === 1);
const total = computed(() => {
  const totalSum = props.debts.reduce(
    (prev, current) => (prev += current.sum),
    0
  );

  return props.type === DEBT_TYPES.took ? totalSum : -totalSum;
});
</script>

<style lang="scss" scoped>
.debts-item {
  &--single {
    .debts-item__count-number {
      font-size: 18px;
    }
  }
  &__footer {
    padding-top: 15px;
    font-size: 18px;
    border-top-width: 1px;
    border-top-style: solid;
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__row {
    flex: 1;
  }
  &__people {
    &-name {
      text-align: center;
      margin-bottom: var(--ion-space-2);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__count {
    &-number {
      text-align: right;

      margin-bottom: var(--ion-space-2);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
