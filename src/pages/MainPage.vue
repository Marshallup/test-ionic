<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab Header</ion-title>

        <Suspense>
          <ThemeSwitcher />
        </Suspense>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      ssssss
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ThemeSwitcher } from "@/features/theme";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
</script>
