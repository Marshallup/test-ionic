<template>
  <Input
    v-model="value"
    :name="inputName"
    :label="label"
    :valid="meta.valid"
    :placeholder="placeholder"
  >
    <slot />
  </Input>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, toRef, unref } from "vue";
import { Input } from "@/shared/ui/input";

interface InputUiProps {
  modelValue: string;
  name: string;
  label?: string;
  placeholder?: string;
}

interface InputUiEmits {
  (e: "update:modelValue", val: InputUiProps["modelValue"]): void;
}

const props = withDefaults(defineProps<InputUiProps>(), {});
const emit = defineEmits<InputUiEmits>();

const inputName = toRef(props, "name");

const { value: inputValue, meta } = useField<InputUiProps["modelValue"]>(
  inputName,
  undefined,
  {
    initialValue: props.modelValue,
  }
);

const value = computed({
  get: () => unref(inputValue),
  set: (val) => emit("update:modelValue", val),
});
</script>

<style scoped></style>
