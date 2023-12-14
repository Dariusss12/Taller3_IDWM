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

        <h2 class="text-3xl text-center mx-auto">¡Regístrate!</h2>
        <form @submit.prevent="" class="my-5">
          <ion-row responsive-sm class="gap-4 ion-padding">
            <ion-row class="w-full grid grid-cols-1 grid-rows-2">
              <div class="w-4/5 mx-auto">
                <ion-label class="text-sm text-left font-bold align-baseline">NOMBRE COMPLETO</ion-label>
              </div>
              <input type="text" v-model="formData.name" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
            </ion-row>

            <ion-row class="w-full grid grid-cols-1 grid-rows-2">
              <div class="w-4/5 mx-auto">
                <ion-label class="text-sm text-left font-bold">CORREO ELECTRÓNICO</ion-label>
              </div>
              <input type="text" v-model="formData.email" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
            </ion-row>

            <ion-row class="w-full grid grid-cols-1 grid-rows-2">
              <div class="w-4/5 mx-auto">
                <ion-label class="text-sm text-left font-bold align-baseline">AÑO DE NACIMIENTO</ion-label>
              </div>
              <input type="number" v-model="formData.birth_year" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
            </ion-row>

            <ion-row class="w-full grid grid-cols-1 grid-rows-2">
              <div class="w-4/5 mx-auto">
                <ion-label class="text-sm text-left font-bold align-baseline">RUT</ion-label>
              </div>
              <input type="text" v-model="formData.rut" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2" placeholder="xx.xxx.xxx-x">
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
              >Registrarse</ion-button>
              <p class="pt-4 text-base text-center">¿Ya tienes cuenta? <router-link to="/login" class="underline font-bold">Inicia sesión aquí</router-link></p>
            </ion-col>
          </ion-row>       
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

    
<script setup lang="ts">
import {IonContent, IonPage, IonImg, IonRow, IonInput,IonButton,IonCol, IonLabel } from '@ionic/vue';
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { RegisterCredentials } from '../interfaces/auth'

const currentYear: number = new Date().getFullYear();
const mainStore = useMainStore();

const errors = ref<string>(''); 


const formData = ref<RegisterCredentials>({
  name: '',
  email: '',
  birth_year: currentYear,
  rut: ''
});

async function submitForm(): Promise<void> {
  errors.value = '';

  try {
      await registerUser(formData.value);
    
      try {
        const user = await loginUser({
          email: formData.value.email,
          password: formData.value.password
        });
        mainStore.loginUser(user);

        // user.player.queue = await loadQueue(user.player.id); //AGREGAR FIRESTORE PARA GUARDAR Y CARGAR DATOS DEL MUSICPLAYER
        playerStore.storePlayer(user.player);

        const userPlaylists = await fetchUserPlaylists();
        mainStore.loadMyPlaylists(userPlaylists);
        router.push('/');

      } catch (error: any) {
        console.log(error);
      };
    
  } catch (error: any) {
    if (error.response && error.response.data.error) {
        const mappedErrors = await mapZodErrors(error);
        errors.value = mappedErrors;
      };

      if (formData.value.password !== formData.value.confirmPassword ) {
        errors.value.confirmPassword = "Las contraseñas no coinciden";
      };

      if (formData.value.confirmPassword == "" ) {
        errors.value.confirmPassword = "Este campo no puede ser vacío";
      };
  }
}

</script>
    
<style>
.container{
  --ion-background-color: white;
}
</style>