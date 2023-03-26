<template>
  <Input
    :model-value="inputeValue"
    :name="inputName"
    :label="label"
    :placeholder="placeholder"
    readonly
    @click="setOpenModal(true)"
  >
    <IonModal
      :is-open="isOpenModal"
      :keep-contents-mounted="true"
      @did-dismiss="onDismiss"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{{ titlePicker }}</IonTitle>
          <IonButtons slot="end">
            <IonButton @click="setOpenModal(false)">Закрыть</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <div class="date-picker-ui__modal-content">
          <IonDatetime
            v-model="datePickerValue"
            id="date"
            presentation="date"
            @ion-change="setOpenModal(false)"
          />
        </div>
      </IonContent>
    </IonModal>
  </Input>
</template>

<script setup lang="ts">
import {
  IonModal,
  IonDatetime,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from "@ionic/vue";
import { computed, ref, watch, toRefs, unref } from "vue";
import { Input } from "../../input";
import { getFormatDate } from "./lib";
import { useField } from "vee-validate";

const format = "DD.MM.YYYY";

interface DatePickerProps {
  name: string;
  modelValue: Date | null;
  label?: string;
  placeholder?: string;
  titlePicker?: string;
}
interface DatePickerEmits {
  (e: "update:modelValue", val: DatePickerProps["modelValue"]): void;
  (e: "change", val: DatePickerProps["modelValue"]): void;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  titlePicker: "Выберите дату",
});
const emit = defineEmits<DatePickerEmits>();

const { name: inputName } = toRefs(props);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const datePickerValue = ref("");

const isOpenModal = ref(false);

const inputeValue = computed(() =>
  getFormatDate(unref(datePickerValue), format)
);

const { value: formValue, setValue } = useField(inputName, undefined, {
  initialValue: unref(value),
});

function setOpenModal(openVal: boolean) {
  isOpenModal.value = openVal;
}

function onDismiss() {
  isOpenModal.value = false;
}

watch(datePickerValue, (pickerValue) => {
  const dateJs = pickerValue ? new Date(pickerValue) : null;

  value.value = dateJs;

  setValue(dateJs);

  emit("change", dateJs);
});

watch(formValue, (formValueClear) => {
  value.value = formValueClear;

  datePickerValue.value = formValueClear ? formValueClear.toString() : "";

  emit("change", formValueClear);
});
</script>

<style lang="scss" scoped>
.date-picker-ui {
  &__modal-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
