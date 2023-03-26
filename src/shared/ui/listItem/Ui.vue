<template>
  <div class="list-item">
    <div class="list-item__body">
      <slot />
    </div>

    <div v-if="slots.footer" class="list-item__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

const slots = useSlots();
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  min-height: 100px;
  padding: var(--ion-space-2);
  box-shadow: var(--box-shadow-primary);

  &:last-child {
    margin-bottom: 0;
  }

  &__body {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    flex: 1;
  }
}
</style>
