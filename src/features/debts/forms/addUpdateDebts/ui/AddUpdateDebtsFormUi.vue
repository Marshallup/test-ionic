<template>
  <form @submit.prevent="onSave">
    <IonRow>
      <IonCol>
        <InputFormUi
          name="name"
          v-model="dataForm.name"
          label="Заемщик"
          :error="errors.name"
          placeholder="Введите имя"
        />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol size="6">
        <DatePickerFormUi
          name="dateStart"
          v-model="dataForm.dateStart"
          :error="errors.dateStart"
          label="Дата займа"
        />
      </IonCol>
      <IonCol size="6">
        <DatePickerFormUi
          name="dateEnd"
          v-model="dataForm.dateEnd"
          :error="errors.dateEnd"
          label="Дата возвращения"
        />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <InputNumbeFormrUi
          name="sum"
          v-model="dataForm.sum"
          :error="errors.sum"
          placeholder="Введите сумму"
          label="Сумма долга"
        />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol class="add-update-debts-form-ui__actions">
        <IonButton type="submit">Сохранить</IonButton>
      </IonCol>
    </IonRow>
  </form>
</template>

<script setup lang="ts">
import { InputFormUi, DatePickerFormUi, InputNumbeFormrUi } from "@/shared";
import { IonButton, IonCol, IonRow } from "@ionic/vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { debtModel } from "@/entities";
import { useFirestore } from "vuefire";

const router = useRouter();

const db = useFirestore();

const dataForm = reactive({
  name: "",
  dateStart: "",
  dateEnd: "",
  sum: null,
});

const schema = yup.object({
  name: yup.string().required(),
  dateStart: yup.string().required(),
  dateEnd: yup.string().required(),
  sum: yup
    .number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .required(),
});

const { errors, validate, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
});
async function onSave() {
  const { valid } = await validate();

  console.log(valid, "isValidate");

  if (valid) {
    try {
      await debtModel.addDebt(db, {
        type: "borrowed",
        people: {
          id: 1,
          name: dataForm.name,
        },
        startDate: dataForm.dateStart,
        endDate: dataForm.dateEnd,
        sum: dataForm.sum as unknown as number,
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
.add-update-debts-form-ui {
  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
