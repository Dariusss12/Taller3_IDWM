<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container">
      <div class="content-center">
        <ion-row>
        <ion-img
          class="w-1/2 h-1/2 mx-auto my-3"
          src="/MobileHub.png"
        ></ion-img>
        </ion-row>

        <h2 class="text-3xl text-center mx-auto">¡Inicia Sesión!</h2>
        <form @submit.prevent="" class="my-5">
          <ion-row responsive-sm class="gap-4 ion-padding">
            <ion-row class="w-full grid grid-cols-1 grid-rows-2">
              <div class="w-4/5 mx-auto">
                <ion-label class="text-sm text-left font-bold">CORREO ELECTRÓNICO</ion-label>
              </div>
              <input type="text" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
            </ion-row>

            <ion-row class="w-full grid grid-cols-1 grid-rows-2">
              <div class="w-4/5 mx-auto">
                <ion-label class="text-sm text-left font-bold align-baseline">CONTRASEÑA</ion-label>
              </div>
              <input type="password" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
            </ion-row>
          </ion-row>
          <p  class="pt-3 pl-2 pb-1 text-sm text-start indent-8 text-[#ff0000] font-bold"></p>
          <ion-row responsive-sm>
            <ion-col>
              <ion-button
                class="w-4/5 mx-auto font-bold text-white border-white border-4 rounded-2xl"
                type="submit"
                expand="block"
                fill="solid"
              >Iniciar Sesión</ion-button>
              <p class="pt-4 text-base text-center">¿No tienes cuenta? <router-link to="/register" class="underline font-bold">Regístrate aquí</router-link></p>
            </ion-col>
          </ion-row>       
        </form>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonImg, IonRow, IonInput, IonButton, IonCol, IonLabel } from '@ionic/vue';
import { ref, watch } from 'vue';

</script>

<style>
.container{
  --ion-background-color: white;
}
</style>

