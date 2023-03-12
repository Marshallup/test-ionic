<template>
  <IonPage>
    <div class="ion-page" id="main-content">
      <HeaderUi />
      <IonContent class="ion-padding">
        <IonRouterOutlet />
      </IonContent>
      <FooterUi />
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonRouterOutlet, IonContent, IonPage } from "@ionic/vue";
import { HeaderUi, FooterUi } from "@/widgets";
</script>
