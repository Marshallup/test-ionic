<template>
  <IonFooter class="footer-ui">
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

<style lang="scss" scoped>
.footer-ui {
  padding: 0 4px;
}
</style>
