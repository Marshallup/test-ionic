<template>
  <IonFooter class="footer-ui">
    <IonToolbar>
      <IonGrid class="ion-padding-horizontal">
        <NavigationToolbar />
      </IonGrid>
    </IonToolbar>
  </IonFooter>
</template>

<script setup lang="ts">
import { IonFooter, IonGrid, IonToolbar } from "@ionic/vue";
import { NavigationToolbar } from "@/features/navigationToolbar";
</script>

<style lang="scss" scoped>
.footer-ui {
  padding: 0 4px;
}
</style>
