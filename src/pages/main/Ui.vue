<template>
  <IonPage>
    <IonContent class="ion-padding">
      <DebtList ref="debtsListRef" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DebtList } from "@/widgets/debtList";
import { IonContent, IonPage } from "@ionic/vue";

const debtsListRef = ref<InstanceType<typeof DebtList> | null>(null);
</script>

<style lang="scss" scoped>
.main-page {
  &__body {
    padding: var(--ion-space-5);
  }
}
</style>
