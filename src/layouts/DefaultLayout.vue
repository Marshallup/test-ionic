<template>
  <IonPage>
    <!-- <MenuMain /> -->

    <div class="ion-page" id="main-content">
      <default-header />
      <ion-content class="ion-padding">
        <ion-router-outlet></ion-router-outlet>
      </ion-content>
      <DefaultFooter />
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import DefaultFooter from "@/components/DefaultFooter.vue";
import DefaultHeader from "@/components/DefaultHeader.vue";
import MenuMain from "@/components/MenuMain.vue";
import { IonRouterOutlet, IonContent, IonPage } from "@ionic/vue";
</script>
