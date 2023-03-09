<template>
  <IonRow class="footer-toolbar ion-justify-content-between">
    <LinkIcon :to="{ name: 'main' }" :icon="homeOutline" exact>
      Главная
    </LinkIcon>
    <LinkIcon :to="{ name: 'settings' }" :icon="settingsOutline">
      Настройки
    </LinkIcon>
  </IonRow>
</template>

<script setup lang="ts">
import { IonRow } from "@ionic/vue";
import { settingsOutline, homeOutline } from "ionicons/icons";
import LinkIcon from "./LinkIcon.vue";
</script>

<style lang="scss" scoped></style>
