<template>
  <IonRow>
    <IonCol size="6">
      <DatePickerForm
        v-model="valueStart"
        :name="nameStart"
        :label="labelStart"
        :placeholder="placeholder"
        :error="startError"
      />
    </IonCol>
    <IonCol size="6">
      <DatePickerForm
        v-model="valueEnd"
        :name="nameEnd"
        :label="labelEnd"
        :placeholder="placeholder"
        :error="endError"
      />
    </IonCol>
  </IonRow>
</template>

<script setup lang="ts">
import { IonCol, IonRow } from "@ionic/vue";
import { DatePickerForm } from "../datePicker";
import { toRefs, unref, computed } from "vue";

interface DateRangePickerProps {
  startValue: Date | null;
  endValue: Date | null;
  startName?: string;
  endName?: string;
  labelStart?: string;
  labelEnd?: string;
  placeholder?: string;
  startError?: string;
  endError?: string;
}

interface DateRangePickerEmits {
  (e: "update:startValue", val: DateRangePickerProps["startValue"]): void;
  (e: "update:endValue", val: DateRangePickerProps["endValue"]): void;
}

const props = withDefaults(defineProps<DateRangePickerProps>(), {
  startName: "startDate",
  endName: "endDate",
  placeholder: "ДД.ММ.ГГГГ",
  labelStart: "Дата займа",
  labelEnd: "Дата возвращения",
});

const emit = defineEmits<DateRangePickerEmits>();

const {
  startName: nameStart,
  endName: nameEnd,
  startValue,
  endValue,
} = toRefs(props);

const valueStart = computed({
  get: () => unref(startValue),
  set: (val) => emit("update:startValue", val),
});

const valueEnd = computed({
  get: () => unref(endValue),
  set: (val) => emit("update:endValue", val),
});
</script>

<style scoped></style>
