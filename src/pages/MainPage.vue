<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div>main page content</div>
      <ion-button color="secondary">
        <!-- <ion-icon slot="start" name="star"></ion-icon> -->
        <ion-icon slot="start" name="battery-dead-outline"></ion-icon>
        Left Icon
      </ion-button>
      <ion-button color="primary">Primary</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      <IonButton @click="goAboutPage">go about</IonButton>
      sdfsdfsd
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonButton, IonPage, IonIcon } from "@ionic/vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goAboutPage() {
  router.push({ name: "about" });
}
</script>

<style lang="scss" scoped>
.main-page {
  &__body {
    padding: var(--ion-space-5);
  }
}
</style>
