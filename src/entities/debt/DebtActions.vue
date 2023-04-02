<template>
  <div class="debt-actions">
    <IonIcon
      :icon="checkmarkOutline"
      class="debt-actions__item"
      @click="onToggle"
    />
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { checkmarkOutline } from "ionicons/icons";

interface DebtActionsEmits {
  (e: "toggleActive"): void;
}

const emit = defineEmits<DebtActionsEmits>();

function onToggle() {
  emit("toggleActive");
}
</script>

<style lang="scss" scoped>
.debt-actions {
  &__item {
    cursor: pointer;
  }
}
</style>
