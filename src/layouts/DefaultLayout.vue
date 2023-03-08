<template>
  <MenuMain />

  <div class="ion-page" id="main-content">
    <default-header />
    <ion-content class="ion-padding">
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from "@/components/DefaultHeader.vue";
import MenuMain from "@/components/MenuMain.vue";
import { IonRouterOutlet, IonContent } from "@ionic/vue";
</script>
