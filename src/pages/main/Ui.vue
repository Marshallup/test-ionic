<template>
  <IonPage>
    <IonContent class="ion-padding">
      <DebtList />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { DebtList } from "@/widgets/debtList";
import { IonContent, IonPage } from "@ionic/vue";
</script>

<style lang="scss" scoped>
.main-page {
  &__body {
    padding: var(--ion-space-5);
  }
}
</style>
