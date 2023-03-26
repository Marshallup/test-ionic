<template>
  <Input
    v-model="inputValue"
    :name="inputName"
    :label="label"
    :valid="meta.valid"
    :placeholder="placeholder"
    @ion-blur="onBlurInput"
  />
</template>

<script setup lang="ts">
import { ref, unref, toRef, watch } from "vue";
import { useField } from "vee-validate";
import { Input } from "@/shared/ui/input";

interface InputNumberUiProps {
  name: string;
  label?: string;
  placeholder?: string;
  modelValue: number | null;
}
interface InputNumberEmits {
  (e: "update:modelValue", val: InputNumberUiProps["modelValue"]): void;
}

const props = defineProps<InputNumberUiProps>();
const emit = defineEmits<InputNumberEmits>();

const inputName = toRef(props, "name");

function isValidNumber(value: string) {
  if (value === "") {
    return false;
  }
  return !isNaN(+value);
}
function getValidNumberString(value: string) {
  if (!isValidNumber(value)) {
    return "";
  }

  return value;
}

function getInitialValue(value: InputNumberUiProps["modelValue"]) {
  return value !== null ? getValidNumberString(value.toString()) : "";
}

const inputValue = ref(getInitialValue(props.modelValue));

const {
  setValue,
  value: numberValue,
  meta,
} = useField<InputNumberUiProps["modelValue"]>(inputName, undefined, {
  initialValue: props.modelValue,
  syncVModel: false,
});

function onBlurInput() {
  if (unref(inputValue) === "") {
    emit("update:modelValue", null);
    setValue(null);
  } else if (isValidNumber(unref(inputValue))) {
    emit("update:modelValue", parseInt(unref(inputValue)));
    setValue(parseInt(unref(inputValue)));
  } else {
    inputValue.value = unref(numberValue)?.toString() || "";
    emit("update:modelValue", unref(numberValue));
  }
}

watch(numberValue, (val) => {
  emit("update:modelValue", val);
  inputValue.value = val ? val.toString() : "";
});
</script>

<style scoped></style>
