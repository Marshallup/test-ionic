<template>
  <ion-header>
    <ion-toolbar>
      <div class="default-header__body">
        <ion-title>Tab Header</ion-title>

        <Suspense>
          <ThemeSwitcher />
        </Suspense>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { ThemeSwitcher } from "@/features/theme";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
</script>

<style lang="scss" scoped>
.default-header {
  &__body {
    display: flex;
    margin-right: var(--ion-space-2);
  }
}
</style>
