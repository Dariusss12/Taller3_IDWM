<template>
  <ion-page>
    <ion-content :fullscreen="true"  class="container">
        <div class="flex h-full items-center">
            <div>
                <ion-row>
                    <ion-img
                    class="w-11/12 h-11/12 mx-auto mb-5"
                    src="/MobileHub.png"
                    ></ion-img>
                </ion-row>
                <ion-row class="w-full grid grid-cols-1 grid-rows-2">
                    <ion-button
                        class="w-4/5 mx-auto font-bold text-white border-white border-4 rounded-2xl"
                        type="submit"
                        expand="block"
                        fill="solid"
                    >
                    <router-link to="/login" class="font-bold text-center">Inicia Sesión</router-link>
                    </ion-button>
                    <router-link to="/register" class="font-bold text-center">Regístrate</router-link>
                </ion-row>

            </div>
        </div>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonImg, IonRow, IonButton } from '@ionic/vue';

</script>

<style>
.container{
  --ion-background-color: white;
}
</style>