<template>
  <IonRow class="navigation-toolbar-ui ion-justify-content-between">
    <LinkIconUi
      :to="{ name: 'main' }"
      :icon="homeOutline"
      exact
      class="navigation-toolbar-ui__link"
    >
      Главная
    </LinkIconUi>
    <LinkIconUi
      :to="{ name: 'debts-new' }"
      :icon="addCircleOutline"
      class="navigation-toolbar-ui__link"
    >
      Добавить
    </LinkIconUi>
    <LinkIconUi
      :to="{ name: 'settings' }"
      :icon="settingsOutline"
      class="navigation-toolbar-ui__link"
    >
      Настройки
    </LinkIconUi>
  </IonRow>
</template>

<script setup lang="ts">
import { IonRow } from "@ionic/vue";
import { settingsOutline, homeOutline, addCircleOutline } from "ionicons/icons";
import { LinkIconUi } from "@/shared";
</script>

<style lang="scss" scoped>
.navigation-toolbar-ui {
  &__link {
    user-select: none;
  }
}
</style>
