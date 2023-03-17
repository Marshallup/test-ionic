<template>
  <IonPage>
    <IonContent class="ion-padding">
      <DebtsList />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { DebtsList } from "@/widgets";
import { IonContent, IonPage } from "@ionic/vue";
</script>

<style lang="scss" scoped>
.main-page {
  &__body {
    padding: var(--ion-space-5);
  }
}
</style>
