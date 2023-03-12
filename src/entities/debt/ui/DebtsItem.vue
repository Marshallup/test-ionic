<template>
  <div class="debts-item">
    <div class="debts-item__body">
      <IonRow class="debts-item__row">
        <IonCol size="4" class="debts-item__col debts-item__title">
          <div>{{ debtType === "took" ? "Заемщики" : "Должники" }}:</div>
        </IonCol>
        <IonCol size="4" class="debts-item__col debts-item-people">
          <div
            v-for="debt in debts"
            :key="debt.id"
            class="debts-item-people__name"
          >
            {{ debt.people.name }}
          </div>
        </IonCol>
        <IonCol size="4" class="debts-item__col debts-item-count">
          <div
            v-for="debt in debts"
            :key="debt.id"
            class="debts-item-count__number"
          >
            {{ debt.count }}
          </div>
        </IonCol>
      </IonRow>
    </div>

    <div class="debts-item__footer">
      <IonRow class="ion-justify-content-center">
        <div>{{ total }}</div>
      </IonRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Debts, DebtType } from "@/share";
import { IonCol, IonRow } from "@ionic/vue";
import { computed } from "vue";

interface DebtsItemProps {
  debts: Debts;
  debtType: DebtType;
}

const props = defineProps<DebtsItemProps>();

const total = computed(() => {
  const totalSum = props.debts.reduce(
    (prev, current) => (prev += current.count),
    0
  );

  return props.debtType === "took" ? totalSum : -totalSum;
});
</script>

<style lang="scss" scoped>
.debts-item {
  border-width: 1px;
  margin-bottom: 20px;
  border-style: solid;
  min-height: 100px;
  padding: var(--ion-space-2);

  &:last-child {
    margin-bottom: 0;
  }

  &__body {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__row {
    flex: 1;
  }
  &-people {
    &__name {
      text-align: center;
      margin-bottom: var(--ion-space-2);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &-count {
    &__number {
      text-align: right;

      margin-bottom: var(--ion-space-2);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
