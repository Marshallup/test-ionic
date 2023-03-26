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
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonLabel, IonList, IonPage } from "@ionic/vue";
import { ThemeSwitcher } from "@/features/themeSwitcher";
</script>

<style scoped></style>
