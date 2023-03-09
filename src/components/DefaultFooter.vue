<template>
  <IonFooter>
    <IonToolbar>
      <IonGrid class="ion-padding-horizontal">
        <!-- <IonRow class="ion-justify-content-center"> -->
        <FooterToolbar />
        <!-- <IonCol size="5" /> -->
        <!-- <IonCol class="ion-flex ion-justify-content-center"> -->
        <!-- <ion-button shape="round">
            <ion-icon
              slot="icon-only"
              :icon="addCircleOutline"
              size="large"
            ></ion-icon>
          </ion-button> -->
        <!-- <RouterLink :to="{ name: 'about' }">qweqwe</RouterLink> -->
        <!-- </IonCol> -->
        <!-- <IonCol size="5" /> -->
        <!-- </IonRow> -->
      </IonGrid>
      <!-- <IonTitle> -->
      <!-- <ion-button shape="round">
          <ion-icon
            slot="icon-only"
            :icon="addCircleOutline"
            size="large"
          ></ion-icon>
        </ion-button> -->
      <!-- </IonTitle> -->
      <!-- <IonButtons slot="center"> -->
      <!-- <IonButton color="primary"> -->
      <!-- <ion-icon name="star"></ion-icon> -->
      <!-- </IonButton> -->
      <!-- </IonButtons> -->
    </IonToolbar>
  </IonFooter>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonCol,
  IonFooter,
  IonGrid,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
import FooterToolbar from "./FooterToolbar.vue";
</script>

<style scoped></style>
