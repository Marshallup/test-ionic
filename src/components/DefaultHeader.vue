<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button :auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-title>Tab Header</ion-title>

      <IonButtons slot="end">
        <Suspense>
          <ThemeSwitcher />
        </Suspense>
      </IonButtons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { ThemeSwitcher } from "@/features/theme";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";
</script>

<style lang="scss" scoped>
.default-header {
  &__body {
    margin-right: var(--ion-space-2);
  }
}
</style>
