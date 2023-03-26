<template>
  <InputForm
    :model-value="inputeValue"
    :name="inputName"
    :label="label"
    :placeholder="placeholder"
    readonly
    @click="setOpenModal(true)"
  >
    <IonModal :is-open="isOpenModal" :keep-contents-mounted="true">
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
  </InputForm>
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
import { computed, ref, watch, toRef, unref } from "vue";
import dayjs from "dayjs";
import { InputForm } from "../input";

const format = "DD.MM.YYYY";

function getFormatedDate(date: string) {
  return date ? dayjs(date).format(format) : "";
}

interface DatePickerProps {
  name: string;
  modelValue: string;
  label?: string;
  placeholder?: string;
  titlePicker?: string;
}
interface DatePickerEmits {
  (e: "update:modelValue", val: DatePickerProps["modelValue"]): void;
  (e: "change", val: DatePickerProps["modelValue"], dateVal: Date): void;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  titlePicker: "Выберите дату",
});
const emit = defineEmits<DatePickerEmits>();

const inputName = toRef(props, "name");

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const datePickerValue = ref("");

const inputeValue = computed(() => getFormatedDate(unref(datePickerValue)));

const isOpenModal = ref(false);

function setOpenModal(openVal: boolean) {
  isOpenModal.value = openVal;
}

watch(datePickerValue, (pickerValue) => {
  value.value = pickerValue;

  emit("change", unref(value), new Date(pickerValue));
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
