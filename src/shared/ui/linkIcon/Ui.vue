<template>
  <RouterLink
    :to="to"
    class="link-icon"
    :class="{ 'link-icon--exact': exact, 'link-icon--active': !exact }"
  >
    <IonIcon :icon="icon" class="link-icon__icon" />

    <div class="link-icon__content">
      <slot />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { RouterLinkProps } from "vue-router";

interface LinkIconProps {
  to: RouterLinkProps["to"];
  icon: string;
  exact?: boolean;
}

defineProps<LinkIconProps>();
</script>

<style lang="scss" scoped>
.link-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  &--exact {
    &.router-link-exact-active {
      color: var(--ion-color-tertiary);
    }
  }

  &--active {
    &.router-link-active {
      color: var(--ion-color-tertiary);
    }
  }
}
.link-icon__icon {
  font-size: 24px !important;
  margin-bottom: 3px;
}

.link-icon__content {
  font-size: 14px;
}
</style>
