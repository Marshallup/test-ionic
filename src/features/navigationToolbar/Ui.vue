<template>
  <IonRow class="navigation-toolbar-ui ion-justify-content-between">
    <LinkIcon
      :to="{ name: 'main' }"
      :icon="homeOutline"
      exact
      class="navigation-toolbar-ui__link"
    >
      Главная
    </LinkIcon>
    <LinkIcon
      :to="{ name: 'createDebt' }"
      :icon="addCircleOutline"
      class="navigation-toolbar-ui__link"
    >
      Добавить
    </LinkIcon>
    <LinkIcon
      :to="{ name: 'settings' }"
      :icon="settingsOutline"
      class="navigation-toolbar-ui__link"
    >
      Настройки
    </LinkIcon>
  </IonRow>
</template>

<script setup lang="ts">
import { IonRow } from "@ionic/vue";
import { settingsOutline, homeOutline, addCircleOutline } from "ionicons/icons";
import { LinkIcon } from "@/shared/ui/linkIcon";
</script>

<style lang="scss" scoped>
.navigation-toolbar-ui {
  &__link {
    user-select: none;
    text-transform: uppercase;

    :deep(.link-icon__content) {
      font-size: 12px;
    }
  }
}
</style>
