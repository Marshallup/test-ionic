<template>
  <IonItem ref="ionItemRef" class="form-item">
    <IonLabel v-if="label" position="stacked">{{ label }}</IonLabel>
    <slot />
    <IonNote
      slot="helper"
      class="form-item__helper"
      :class="{ 'form-item__helper--show': !!helper }"
      >{{ helper || "empty" }}</IonNote
    >
    <Transition>
      <IonNote v-if="error" slot="error">{{ error }}</IonNote>
    </Transition>

    <slot name="footer" />
  </IonItem>
</template>

<script setup lang="ts">
import { ref, toRefs, unref, watch, onMounted } from "vue";
import { IonItem, IonLabel, IonNote } from "@ionic/vue";

interface FormItemProps {
  label?: string;
  error?: string;
  helper?: string;
  valid?: boolean;
}

const props = defineProps<FormItemProps>();

const { error, valid } = toRefs(props);

const ionItemRef = ref<InstanceType<typeof IonItem> | null>(null);

function initValid() {
  const ionItemRefVal = unref(ionItemRef);

  if (ionItemRefVal) {
    if (unref(valid)) {
      ionItemRefVal.$el.classList.add("ion-valid");
    } else {
      ionItemRefVal.$el.classList.remove("ion-valid");
    }
  }
}

function initShowError() {
  const errorVal = props.error;
  const ionItemRefVal = unref(ionItemRef);

  if (ionItemRefVal) {
    if (errorVal) {
      ionItemRefVal.$el.classList.add("ion-invalid");
    } else {
      ionItemRefVal.$el.classList.remove("ion-invalid");
    }
  }
}

watch([error, valid], () => {
  initShowError();
  initValid();
});

onMounted(() => {
  initShowError();
  initValid();
});
</script>

<style lang="scss" scoped>
.form-item {
  &__helper {
    opacity: 0;

    &--show {
      opacity: 1;
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
