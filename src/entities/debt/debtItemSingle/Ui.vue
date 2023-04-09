<template>
  <ListItem
    class="debts-item"
    :class="{
      'debts-item--single': isSingleDebt,
      'debts-item--all-not-active': allNotActive,
    }"
  >
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
          :class="{
            'debts-item--active': debt.active,
            'debts-item--not-active': !debt.active,
          }"
        >
          {{ getPeopleName(debt.people, peoples)?.name || debt.people }}
        </div>
      </IonCol>
      <IonCol size="4" class="debts-item__col debts-item__count">
        <div
          v-for="debt in debts"
          :key="debt.id"
          class="debts-item__count-number"
          :class="{
            'debts-item--active': debt.active,
            'debts-item--not-active': !debt.active,
          }"
        >
          <span>{{ debt.sum }}</span>

          <DebtActions
            class="debts-item__actions"
            @toggle-active="toggleActive(debt)"
          />
        </div>
      </IonCol>
    </IonRow>

    <template #footer v-if="!isSingleDebt && !allNotActive">
      <div class="debts-item__footer">
        <IonRow class="ion-justify-content-center">
          <div class="debts-item__total">{{ total }}</div>
        </IonRow>
      </div>
    </template>
  </ListItem>
</template>

<script setup lang="ts">
import { IonCol, IonRow } from "@ionic/vue";
import { computed } from "vue";
import { ListItem } from "@/shared/ui/listItem";
import {
  type DebtType,
  Debts,
  DEBT_TITLE,
  DEBT_TYPES,
  DEBT_TITLES,
  Debt,
} from "@/shared/api/store/debt";
import DebtActions from "../DebtActions.vue";
import { People } from "@/shared/api/store/people";
import { getPeopleName } from "@/shared/lib/people";

interface DebtsItemProps {
  debts: Debts;
  peoples: People[];
  type: DebtType;
}
interface DebtsItemEmits {
  (e: "toggleActive", id: Debt["id"], active: Debt["active"]): void;
}

const props = defineProps<DebtsItemProps>();
const emit = defineEmits<DebtsItemEmits>();

const isSingleDebt = computed(() => props.debts.length === 1);

const total = computed(() => {
  const totalSum = props.debts.reduce(
    (prev, current) => (prev += current.active ? current.sum : 0),
    0
  );

  return props.type === DEBT_TYPES.took ? totalSum : -totalSum;
});

const allNotActive = computed(() => props.debts.every((debt) => !debt.active));

function toggleActive(debt: Debt) {
  emit("toggleActive", debt.id, debt.active);
}
</script>

<style lang="scss" scoped>
.debts-item {
  &--single {
    .debts-item__count-number {
      font-size: 18px;
    }

    :deep(.list-item__body) {
      margin-bottom: 0;
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
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;

      margin-bottom: var(--ion-space-2);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__actions {
    display: flex;
    margin-left: 10px;
  }

  &--all-not-active,
  &--not-active {
    color: var(--ion-color-primary-shade);
  }

  &--not-active {
    text-decoration: line-through;
  }

  &--all-not-active {
    :deep(.list-item__body) {
      margin-bottom: 0;
    }
    .debts-item {
      &__total {
        text-decoration: line-through;
      }
    }
  }
}
</style>
