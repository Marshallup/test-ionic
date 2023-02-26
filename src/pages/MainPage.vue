<template>
  <ion-page>
    <DefaultHeader />
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="main-page__body">qwe body</div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import DefaultHeader from "@/components/DefaultHeader.vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
</script>

<style lang="scss" scoped>
.main-page {
  &__body {
    padding: var(--ion-space-5);
  }
}
</style>
