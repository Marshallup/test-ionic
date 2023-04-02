<template>
  <FormItem :error="error" :label="label" :helper="helper" :valid="valid">
    <IonInput
      v-model="value"
      :placeholder="placeholder"
      :name="name"
      v-bind="$attrs"
    />

    <template #footer>
      <slot />
    </template>
  </FormItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { IonInput } from "@ionic/vue";
import { computed, unref } from "vue";
import { FormItem } from "../formItem";

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

const value = computed({
  get: () => unref(props.modelValue),
  set: (val) => emit("update:modelValue", val),
});
</script>

<style lang="scss" scoped></style>
