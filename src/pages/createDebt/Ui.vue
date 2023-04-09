<template>
  <IonPage>
    <IonContent class="ion-padding">
      <DebtForm ref="formRef" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { DebtForm } from "@/widgets/debtForm";
import { IonContent, IonPage, onIonViewDidLeave } from "@ionic/vue";

const formRef = ref<InstanceType<typeof DebtForm> | null>(null);

function resetFormRef() {
  const formRefComp = unref(formRef);

  if (formRefComp) {
    formRefComp.clearFormState();
  }
}

onIonViewDidLeave(() => {
  resetFormRef();
});
</script>

<style scoped></style>
