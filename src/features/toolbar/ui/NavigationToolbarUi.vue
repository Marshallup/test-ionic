<template>
  <IonRow class="footer-toolbar ion-justify-content-between">
    <LinkIconUi :to="{ name: 'main' }" :icon="homeOutline" exact>
      Главная
    </LinkIconUi>
    <LinkIconUi :to="{ name: 'settings' }" :icon="settingsOutline">
      Настройки
    </LinkIconUi>
  </IonRow>
</template>

<script setup lang="ts">
import { IonRow } from "@ionic/vue";
import { settingsOutline, homeOutline } from "ionicons/icons";
import { LinkIconUi } from "@/share";
</script>

<style lang="scss" scoped></style>
