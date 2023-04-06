<template>
  <form class="debt-form" @submit.prevent="onSave">
    <IonRow class="debt-form__row-types">
      <IonSegment v-model="debtType">
        <IonSegmentButton :value="DEBT_TYPES.took">{{
          DEBT_TITLE.took
        }}</IonSegmentButton>
        <IonSegmentButton :value="DEBT_TYPES.borrowed">{{
          DEBT_TITLE.borrowed
        }}</IonSegmentButton>
      </IonSegment>
    </IonRow>
    <IonRow>
      <IonCol>
        <InputForm
          name="name"
          v-model="values.name"
          label="Заемщик"
          :error="errors.name"
          placeholder="Введите имя"
        />
      </IonCol>
    </IonRow>
    <DateRangePicker
      v-model:start-value="values.startDate"
      v-model:end-value="values.endDate"
      :start-error="errors.startDate"
      :end-error="errors.endDate"
    />
    <IonRow>
      <IonCol>
        <InputNumberForm
          name="sum"
          v-model="values.sum"
          :error="errors.sum"
          placeholder="Введите сумму"
          label="Сумма долга"
        />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <ToggleForm name="active" v-model="values.active" label="Действующий" />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol class="debt-form__actions">
        <IonButton type="submit">Сохранить</IonButton>
      </IonCol>
    </IonRow>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { string, object, number, date } from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { InputForm } from "@/shared/ui/form/input";
import { InputNumberForm } from "@/shared/ui/form/inputNumber";
import {
  IonButton,
  IonCol,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { DEBT_TITLE, DEBT_TYPES } from "@/shared/api/store/debt";
import { useDebtStore } from "@/shared/stores/debts";
import { ToggleForm } from "@/shared/ui/form/toggle";
import { DateRangePicker } from "@/shared/ui/form/dateRangePicker";
import { getFormatDate } from "@/shared/lib";

interface DataForm {
  type: DEBT_TYPES;
  name: string;
  startDate: null | Date;
  endDate: null | Date;
  sum: null | number;
  active: boolean;
}

const router = useRouter();

const debtStore = useDebtStore();

const schema = object().shape(
  {
    type: string().required(),
    name: string().required(),
    startDate: date()
      .required()
      .when("endDate", (endDate, yup) => {
        const parsedDate = getFormatDate(String(endDate));

        return parsedDate
          ? yup.max(endDate, () => `Дата не может быть больше ${parsedDate}`)
          : yup;
      }),
    endDate: date()
      .required()
      .when("startDate", (startDate, yup) => {
        const parsedDate = getFormatDate(String(startDate));

        return parsedDate
          ? yup.min(startDate, () => `Дата должна быть меньше ${parsedDate}`)
          : yup;
      }),
    sum: number()
      .transform((val) => (isNaN(val) ? undefined : val))
      .required(),
  },
  [["startDate", "endDate"]]
);

const { values, errors, validate, resetForm, useFieldModel } =
  useForm<DataForm>({
    validationSchema: toTypedSchema(schema),
    initialValues: {
      name: "",
      type: DEBT_TYPES.took,
      startDate: null,
      endDate: null,
      sum: null,
      active: true,
    },
  });

const debtType = useFieldModel("type");

async function onSave() {
  const { valid } = await validate();

  if (valid && values.sum && values.startDate && values.endDate) {
    try {
      await debtStore.createDebtStoreAsync({
        type: values.type,
        startDate: values.startDate.toString(),
        endDate: values.endDate.toString(),
        sum: values.sum,
        active: values.active,
        people: 1,
      });

      await router.push({ name: "main" });
    } catch (error) {
      console.log(error, "error");
    }
  }
}

defineExpose({
  resetForm,
});
</script>

<style lang="scss" scoped>
.debt-form {
  &__row-types {
    margin-bottom: 5px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
