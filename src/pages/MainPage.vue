<template>
  <IonPage>
    <IonContent class="ion-padding">
      <DebtList />
      <!-- <div>main page content</div>
      <ion-button color="secondary">
        <ion-icon slot="start" :icon="batteryDeadOutline"></ion-icon>
        Left Icon
      </ion-button>
      <ion-button color="primary">Primary</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      sdfsdfsd -->
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { DebtList } from "@/widgets";
import { IonContent, IonPage } from "@ionic/vue";
</script>

<style lang="scss" scoped>
.main-page {
  &__body {
    padding: var(--ion-space-5);
  }
}
</style>
