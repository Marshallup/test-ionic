<template>
  <FormItem :label="label" :error="error" :helper="helper" :valid="valid">
    <IonToggle :name="name" v-model="toggleValue" />
  </FormItem>
</template>

<script setup lang="ts">
import { IonToggle } from "@ionic/vue";
import { useField } from "vee-validate";
import { toRefs, computed } from "vue";
import { FormItem } from "../../formItem";

interface ToggleFormProps {
  modelValue: boolean;
  label?: string;
  name: string;
  error?: string;
  helper?: string;
  valid?: boolean;
}
interface ToggleFormEmits {
  (e: "update:modelValue", val: ToggleFormProps["modelValue"]): void;
}

const props = defineProps<ToggleFormProps>();
const emit = defineEmits<ToggleFormEmits>();

const { name } = toRefs(props);
const { setValue } = useField<ToggleFormProps["modelValue"]>(name);

const toggleValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
    setValue(val);
  },
});
</script>

<style scoped></style>
