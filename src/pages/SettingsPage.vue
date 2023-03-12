<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonList>
        <IonItem>
          <IonLabel>Черная тема:</IonLabel>
          <Suspense>
            <ThemeSwitcher />
          </Suspense>
        </IonItem>
      </IonList>
      <IonButton @click="goAboutPage">go about</IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { ThemeSwitcher } from "@/features/theme";

const router = useRouter();

function goAboutPage() {
  router.push({ name: "test" });
}
</script>

<style scoped></style>
