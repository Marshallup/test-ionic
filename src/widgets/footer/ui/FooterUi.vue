<template>
  <IonFooter>
    <IonToolbar>
      <IonGrid class="ion-padding-horizontal">
        <NavigationToolbarUi />
      </IonGrid>
    </IonToolbar>
  </IonFooter>
</template>

<script setup lang="ts">
import { IonFooter, IonGrid, IonToolbar } from "@ionic/vue";
import { NavigationToolbarUi } from "@/features";
</script>

<style scoped></style>
