<template>
  <ListItem
    class="debts-item-multiple"
    :class="{ 'debts-item-multiple--all-not-active': allNotActive }"
  >
    <IonRow class="debts-item-multiple__row">
      <IonCol
        v-for="(debtsTypeData, debtType) in orderDebtsType"
        :key="debtType"
        size="6"
        :class="[
          `debts-item-multiple--${debtType}`,
          debtType === 'took' &&
            tookNotActive &&
            'debts-item-multiple--not-active',
          debtType === 'borrowed' &&
            borrowedNotActive &&
            'debts-item-multiple--not-active',
        ]"
      >
        <div class="debts-item-multiple__title">
          {{ DEBT_TITLES[debtType] }}:
        </div>

        <div class="debts-item-multiple__list">
          <div
            v-for="debtData in debtsTypeData"
            :key="debtData.id"
            class="debts-item-multiple__item"
            :class="{
              'debts-item-multiple__item--not-active': !debtData.active,
            }"
          >
            <div>{{ debtData.people }}:&nbsp;</div>
            <div class="debts-item-multiple__sum">
              <span>{{ debtData.sum }}</span>
              <DebtActions
                class="debts-item-multiple__actions"
                @toggle-active="onToggleActive(debtData)"
              />
            </div>
          </div>
        </div>
      </IonCol>
    </IonRow>

    <template v-if="!allNotActive" #footer>
      <div class="debts-item-multiple__footer">{{ total }}</div>
    </template>
  </ListItem>
</template>

<script setup lang="ts">
import { computed, unref } from "vue";
import { IonCol, IonRow } from "@ionic/vue";
import {
  DEBT_TITLES,
  DEBT_TYPES,
  Debt,
  type DebtsByType,
} from "@/shared/api/store/debt";
import { ListItem } from "@/shared/ui/listItem";
import DebtActions from "../DebtActions.vue";

interface DebtItemMultipleProps {
  debts: DebtsByType;
}
interface DebtItemMultipleEmits {
  (e: "toggleActive", id: Debt["id"], active: Debt["active"]): void;
}

const props = defineProps<DebtItemMultipleProps>();
const emit = defineEmits<DebtItemMultipleEmits>();

const tookDebts = computed(() => props.debts.took);
const borrowedDebts = computed(() => props.debts.borrowed);

const orderDebtsType = computed(() => ({
  [DEBT_TYPES.took]: unref(tookDebts),
  [DEBT_TYPES.borrowed]: unref(borrowedDebts),
}));

const totalTook = computed(() =>
  unref(tookDebts).reduce((prev, cur) => prev + (cur.active ? cur.sum : 0), 0)
);
const totalBorrowed = computed(() =>
  unref(borrowedDebts).reduce(
    (prev, cur) => prev + (cur.active ? cur.sum : 0),
    0
  )
);

const total = computed(() => unref(totalTook) - unref(totalBorrowed));

const tookNotActive = computed(() =>
  unref(tookDebts).every((debt) => !debt.active)
);
const borrowedNotActive = computed(() =>
  unref(borrowedDebts).every((debt) => !debt.active)
);

const allNotActive = computed(
  () => unref(tookNotActive) && unref(borrowedNotActive)
);

function onToggleActive(debt: Debt) {
  emit("toggleActive", debt.id, debt.active);
}
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

    &--not-active {
      color: var(--ion-color-primary-shade);
      text-decoration: line-through;
    }
  }
  &__sum {
    display: flex;
    align-items: center;
  }
  &__actions {
    margin-left: 10px;
  }
  &__footer {
    padding-top: 15px;
    border-top-width: 1px;
    border-top-style: solid;
    text-align: center;
    font-size: 18px;
  }

  &--all-not-active {
    color: var(--ion-color-primary-shade);

    :deep(.list-item__body) {
      margin-bottom: 0;
    }
  }

  &--not-active {
    .debts-item-multiple {
      &__title {
        color: var(--ion-color-primary-shade);
        text-decoration: line-through;
      }
    }
  }
}
</style>
