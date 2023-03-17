<template>
  <div class="list-item">
    <div class="list-item__body">
      <slot />
    </div>

    <slot name="footer" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: column;
  // border-width: 1px;
  margin-bottom: 20px;
  // border-style: solid;
  min-height: 100px;
  padding: var(--ion-space-2);
  // background-color: var(--ion-color-primary);
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
