<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <Transition>
          <IonBackButton v-if="!isMainPage" default-href="/"></IonBackButton>
        </Transition>
      </ion-buttons>
      <ion-title>Header</ion-title>

      <!-- <IonButtons slot="end">
        <Suspense>
          <ThemeSwitcher />
        </Suspense>
      </IonButtons> -->
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ThemeSwitcher } from "@/features/theme";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonNavLink,
  IonBackButton,
} from "@ionic/vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isMainPage = computed(() => route.name === "main");
</script>

<style lang="scss" scoped>
.default-header {
  &__body {
    margin-right: var(--ion-space-2);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
</style>
