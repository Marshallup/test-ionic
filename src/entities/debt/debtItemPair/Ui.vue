<template>
  <ListItem class="debts-item-multiple">
    <IonRow class="debts-item-multiple__row">
      <IonCol
        v-for="(debtsTypeData, debtType) in debts"
        :key="debtType"
        size="6"
        :class="[`debts-item-multiple--${debtType}`]"
      >
        <div class="debts-item-multiple__title">
          {{ DEBT_TITLES[debtType] }}:
        </div>

        <div class="debts-item-multiple__list">
          <div
            v-for="debtData in debtsTypeData"
            :key="debtData.id"
            class="debts-item-multiple__item"
          >
            <div>{{ debtData.people }}:&nbsp;</div>
            <div>{{ debtData.sum }}</div>
          </div>
        </div>
      </IonCol>
    </IonRow>

    <template #footer>
      <div class="debts-item-multiple__footer">{{ total }}</div>
    </template>
  </ListItem>
</template>

<script setup lang="ts">
import { computed, unref } from "vue";
import { IonCol, IonRow } from "@ionic/vue";
import { DEBT_TITLES, type DebtsByType } from "@/shared/api/store/debt";
import { ListItem } from "@/shared/ui/listItem";

interface DebtItemMultipleProps {
  debts: DebtsByType;
}

const props = defineProps<DebtItemMultipleProps>();

const totalTook = computed(() =>
  props.debts.took.reduce((prev, cur) => prev + cur.sum, 0)
);
const totalBorrowed = computed(() =>
  props.debts.borrowed.reduce((prev, cur) => prev + cur.sum, 0)
);

const total = computed(() => unref(totalTook) - unref(totalBorrowed));
</script>

<style lang="scss" scoped>
.debts-item-multiple {
  :deep(.list-item__body) {
    align-items: flex-start;
  }

  &--borrowed {
    text-align: right;

    .debts-item-multiple__item {
      justify-content: flex-end;
    }
  }
  &__row {
    width: 100%;
    height: 100%;
  }
  &__title {
    margin-bottom: 10px;
  }
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  &__footer {
    padding-top: 15px;
    border-top-width: 1px;
    border-top-style: solid;
    text-align: center;
    font-size: 18px;
  }
}
</style>
