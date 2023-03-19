<template>
  <IonPage>
    <IonContent class="ion-padding">
      <AddUpdateDebtsFormUi ref="formRef" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { AddUpdateDebtsFormUi } from "@/features/debts";
import { IonContent, IonPage, onIonViewDidLeave } from "@ionic/vue";

const formRef = ref<InstanceType<typeof AddUpdateDebtsFormUi> | null>(null);

function resetFormRef() {
  const formRefComp = unref(formRef);

  if (formRefComp) {
    formRefComp.resetForm();
  }
}

onIonViewDidLeave(() => {
  resetFormRef();
});
</script>

<style scoped></style>
