<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div>New Debts Page</div>
      <AddUpdateDebtsForm />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import AddUpdateDebtsForm from "@/features/debts/forms/addUpdateDebts/ui/AddUpdateDebtsForm.vue";
import { IonContent, IonPage } from "@ionic/vue";
</script>

<style scoped></style>
