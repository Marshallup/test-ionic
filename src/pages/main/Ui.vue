<template>
  <IonPage>
    <IonContent class="ion-padding">
      <DebtList ref="debtsListRef" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { DebtList } from "@/widgets/debtList";
import { IonContent, IonPage, onIonViewWillEnter } from "@ionic/vue";

const debtsListRef = ref<InstanceType<typeof DebtList> | null>(null);

onIonViewWillEnter(() => {
  const debtsList = unref(debtsListRef);

  if (debtsList) {
    debtsList.getDebtsAsync();
  }
});
</script>

<style lang="scss" scoped>
.main-page {
  &__body {
    padding: var(--ion-space-5);
  }
}
</style>
