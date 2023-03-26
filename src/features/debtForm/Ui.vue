<template>
  <form @submit.prevent="onSave">
    <IonRow>
      <IonCol>
        <InputForm
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
        <DatePickerForm
          name="dateStart"
          v-model="dataForm.dateStart"
          placeholder="DD.MM.YYYY"
          label="Дата займа"
          :error="errors.dateStart"
        />
      </IonCol>
      <IonCol size="6">
        <DatePickerForm
          name="dateEnd"
          v-model="dataForm.dateEnd"
          placeholder="DD.MM.YYYY"
          label="Дата возвращения"
          :error="errors.dateEnd"
        />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <InputNumberForm
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
import { InputForm } from "@/shared/ui/form/input";
import { DatePickerForm } from "@/shared/ui/form/datePicker";
import { InputNumberForm } from "@/shared/ui/form/inputNumber";
import { IonButton, IonCol, IonRow } from "@ionic/vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";

const router = useRouter();

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

  if (valid) {
    try {
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
