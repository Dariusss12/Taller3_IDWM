<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container">
      <h1 v-for="index in range(1,100)">home</h1>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonImg, IonRow, IonInput, IonButton, IonCol, IonLabel } from '@ionic/vue';
const range = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, i) => start + i);
};
</script>

<style>
.container{
  --ion-background-color: white;
}
</style>