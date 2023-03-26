<template>
  <IonItem ref="ionItemRef" class="input-ui">
    <IonLabel v-if="label" position="stacked">{{ label }}</IonLabel>
    <IonInput
      v-model="value"
      :placeholder="placeholder"
      :name="name"
      v-bind="$attrs"
    />
    <IonNote
      slot="helper"
      class="input-ui__helper"
      :class="{ 'input-ui__helper--show': !!helper }"
      >{{ helper || "empty" }}</IonNote
    >
    <Transition>
      <IonNote v-if="error" slot="error">{{ error }}</IonNote>
    </Transition>

    <slot />
  </IonItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { IonInput, IonItem, IonLabel, IonNote } from "@ionic/vue";
import { computed, unref, ref, onMounted, toRefs, watch } from "vue";

interface InputUiProps {
  modelValue: string;
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  helper?: string;
  valid?: boolean;
}

interface InputUiEmits {
  (e: "update:modelValue", val: InputUiProps["modelValue"]): void;
}

const props = withDefaults(defineProps<InputUiProps>(), {});
const emit = defineEmits<InputUiEmits>();

const { error, valid } = toRefs(props);

const ionItemRef = ref<InstanceType<typeof IonItem> | null>(null);

const value = computed({
  get: () => unref(props.modelValue),
  set: (val) => emit("update:modelValue", val),
});

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
.input-ui {
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
