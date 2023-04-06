<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" class="header-ui__btns-start">
        <Transition>
          <IonBackButton
            v-if="!isMainPage"
            default-href="/"
            class="header-ui__back-btn"
          ></IonBackButton>
        </Transition>
      </ion-buttons>
      <ion-title>
        <div class="header-ui__total-statistics">
          <div
            class="header-ui__total-statistics-item header-ui__total-statistics-item--borrowed"
          >
            {{ total.borrowed }}
          </div>
          <div class="header-ui__total-statistics-hr">|</div>
          <div
            class="header-ui__total-statistics-item header-ui__total-statistics-item--took"
          >
            {{ total.took }}
          </div>
        </div>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { useDebtStore } from "@/shared/stores/debts";

const route = useRoute();
const debtStore = useDebtStore();

const total = computed(() => debtStore.debtsTotal);

const isMainPage = computed(() => route.name === "main");

onMounted(() => {
  debtStore.getDebtsAsync();
});
</script>

<style lang="scss" scoped>
.header-ui {
  &__btns-start.md {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &__total-statistics {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;

    &-item {
      &--took {
        color: var(--ion-color-success);
      }
      &--borrowed {
        color: var(--ion-color-danger);
      }
    }

    &-hr {
      margin: 0 5px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
</style>
