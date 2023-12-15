<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container" >
      <router-link to="/" class="fixed mt-3" @click="clearAll()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </router-link>
      <div class="flex h-full items-center" :key="componentKey">
        <div>
          <ion-row>
          <ion-img
            class="w-1/2 h-1/2 mx-auto mb-5 mt-[20%]"
            src="/MobileHub.png"
          ></ion-img>
          </ion-row>
  
          <h2 class="text-3xl text-center mx-auto">¡Inicia Sesión!</h2>
          <form @submit.prevent="submitForm" class="my-5">
            <ion-row responsive-sm class="gap-4 ion-padding">
              <ion-row class="w-full h-full items-center">
                <div class="w-4/5 mx-auto">
                  <ion-label class="text-sm text-left font-bold">CORREO ELECTRÓNICO</ion-label>
                </div>
                <input type="text" v-model="formData.email" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
                <p v-if="errors.email" class="text-sm text-[#ff0000] w-4/5 mx-auto mt-1">{{ errors.email[0]}}</p>
              </ion-row>
  
              <ion-row class="w-full h-full items-center">
                <div class="w-4/5 mx-auto">
                  <ion-label class="text-sm text-left font-bold align-baseline">CONTRASEÑA</ion-label>
                </div>
                <input type="password" v-model="formData.password" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
                <p v-if="errors.password" class="text-sm text-[#ff0000] w-4/5 mx-auto mt-1">{{ errors.password[0]}}</p>
              </ion-row>
            </ion-row>
            <p v-if="errors.credentials" class="text-sm text-[#ff0000] w-4/5 mx-auto mt-1">{{ errors.credentials}}</p>
            <ion-row responsive-sm>
              <ion-col class="text-center">
                <button
                  class="font-bold text-center w-4/5 text-white bg-[#3880ff] hover:bg-[#3171e0] rounded-2xl p-3.5 my-2"
                  type="submit"
                >Iniciar Sesión</button>
                <p class="pt-4 text-base text-center">¿No tienes cuenta? <router-link to="/register" @click="clearAll()"  class="underline font-bold">Regístrate aquí</router-link></p>
              </ion-col>
            </ion-row>       
          </form>

        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonImg, IonRow, IonInput, IonButton, IonCol, IonLabel } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';
import { LoginCredentials, FormErrors } from '../interfaces/auth'
import { login } from '../backend/auth'
import { getUsername } from '../backend/github'
import router from '@/router';

const mainStore = useMainStore();

/**
 * Se define una variable como key
 */
 const componentKey = ref(0);

/**
 * Funcion para cambiar el valor de componentKey y asì forzar el re-renderizado de los modals
 */
const forceRerender = () => {
  componentKey.value += 1;
};


let errors = ref<FormErrors>({});


const formData = ref<LoginCredentials>({
  email: '',
  password: ''
});

async function submitForm(): Promise<void> {
  errors.value = {};

  try {
      const response = await login(formData.value);
      mainStore.token = response.token;
      mainStore.userId = response.user.email;
      const username = await getUsername(response.user.email);
      mainStore.githubUsername = username.data.items[0].login;
      router.push('/repos')
      forceRerender();
      
  } catch (error: any) {
    errors = { ...error.response.data } || {};
    forceRerender();
  }
}

function clearAll(){
  formData.value.email = '';
  formData.value.password = '';
  errors = ref<FormErrors>({});

}

</script>

<style>
.container{
  --ion-background-color: white;
}
</style>

