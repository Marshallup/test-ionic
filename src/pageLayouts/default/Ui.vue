<template>
  <IonPage>
    <div class="ion-page" id="main-content">
      <Header />

      <IonContent class="ion-padding">
        <IonRouterOutlet />
      </IonContent>

      <Footer />
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonRouterOutlet, IonContent, IonPage } from "@ionic/vue";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
</script>
