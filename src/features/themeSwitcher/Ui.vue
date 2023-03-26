<template>
  <IonToggle :checked="isDark" color="secondary" @ion-change="onChange" />
</template>

<script setup lang="ts">
import { IonToggle } from "@ionic/vue";
import type { ToggleChangeEventDetail } from "@ionic/core";
import { ref, watch } from "vue";
import { themeModel } from ".";

const isDark = ref(await themeModel.isDarkTheme());

function onChange(event: CustomEvent<ToggleChangeEventDetail>) {
  isDark.value = event.detail.checked;
}

watch(isDark, themeModel.toggleDarkTheme);
</script>

<style scoped></style>
