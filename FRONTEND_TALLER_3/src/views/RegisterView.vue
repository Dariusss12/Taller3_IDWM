<!--
 RegisterView - Página que muestra el formulario de registro de usuario.
 
 @component
 @example
 <RegisterView />
 
 @remarks
 Esta página utiliza Ionic con Vue y presenta una interfaz de usuario con un formulario para el registro de usuario.
 /-->
<template>
  <!-- Inicio de la plantilla -->
  <ion-page>
    <ion-content :fullscreen="true" class="container">
      <!-- Enlace de router para regresar a la página principal -->
      <router-link to="/" class="fixed mt-3" @click="clearAll()">
        <!-- Icono SVG para navegación -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </router-link>
      <!-- Contenido principal de la página de registro -->
      <div class="flex h-full items-center" :key="componentKey">
        <div>
          <!-- Componente de imagen de Ionic para mostrar una imagen -->
          <ion-row>
          <ion-img
            class="w-1/2 h-1/2 mx-auto mb-5 mt-[20%]"
            src="/MobileHub.png"
          ></ion-img>
          </ion-row>
  
           <!-- Formulario de registro -->
          <h2 class="text-3xl text-center mx-auto">¡Regístrate!</h2>
          <form @submit.prevent="submitForm" class="my-5">
            <ion-row responsive-sm class="gap-4 ion-padding">
              <!-- Campo de entrada para el nombre completo -->
              <ion-row class="w-full flex h-full items-center">
                <div class="w-4/5 mx-auto">
                  <ion-label class="text-sm text-left font-bold align-baseline">NOMBRE COMPLETO</ion-label>
                </div>
                <input type="text" v-model="formData.name" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
                <!-- Mostrar error de validación si existe -->
                <p v-if="errors.name"  class="text-sm text-[#ff0000] w-4/5 mx-auto mt-1">{{ errors.name[0] }}</p>
              </ion-row>
              <!-- Campo de entrada para el correo electrónico -->
              <ion-row class="w-full flex h-full items-center">
                <div class="w-4/5 mx-auto">
                  <ion-label class="text-sm text-left font-bold">CORREO ELECTRÓNICO</ion-label>
                </div>
                <input type="text" v-model="formData.email" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
                <!-- Mostrar error de validación si existe -->
                <p v-if="errors.email"  class="text-sm text-[#ff0000] w-4/5 mx-auto mt-1">{{ errors.email[0] }}</p>
              </ion-row>
              <!-- Campo de entrada para el año de nacimiento -->
              <ion-row class="w-full flex h-full items-center">
                <div class="w-4/5 mx-auto">
                  <ion-label class="text-sm text-left font-bold align-baseline">AÑO DE NACIMIENTO</ion-label>
                </div>
                <input type="number" v-model="formData.birth_year" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2">
                <!-- Mostrar error de validación si existe -->
                <p v-if="errors.birth_year"  class="text-sm text-[#ff0000] w-4/5 mx-auto mt-1">{{ errors.birth_year[0] }}</p>
              </ion-row>
              <!-- Campo de entrada para el RUT -->
              <ion-row class="w-full flex h-full items-center">
                <div class="w-4/5 mx-auto">
                  <ion-label class="text-sm text-left font-bold align-baseline">RUT</ion-label>
                </div>
                <input type="text" v-model="formData.rut" class="bg-gray-200 text-black rounded-lg h-12 w-4/5 mx-auto opacity-80 px-2" placeholder="xx.xxx.xxx-x">
                 <!-- Mostrar error de validación si existe -->
                <p v-if="errors.rut"  class="text-sm text-[#ff0000] w-4/5 mx-auto mt-1">{{ errors.rut[0] }}</p>
              </ion-row>
  
            </ion-row>
            <!-- Botón de envío y enlace para iniciar sesión -->
            <ion-row responsive-sm>
              <ion-col class="text-center">
                 <!-- Botón para enviar el formulario -->
                <button
                  class="font-bold text-center w-4/5 text-white bg-[#3880ff] hover:bg-[#3171e0] rounded-2xl p-3.5 my-2"
                  type="submit"
                >Registrarse</button>
                <!-- Enlace a la página de inicio de sesión -->
                <p class="pt-4 text-base text-center">¿Ya tienes cuenta? <router-link to="/login" class="underline font-bold" @click="clearAll()">Inicia sesión aquí</router-link></p>
              </ion-col>
            </ion-row>       
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

    
<script setup lang="ts">
//Importaciones
import {IonContent, IonPage, IonImg, IonRow,IonCol, IonLabel } from '@ionic/vue';
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { RegisterCredentials, FormErrors } from '../interfaces/auth'
import { register } from '../backend/auth'
import { getUsername } from '../backend/github'
import router from '@/router';


/**
 * Variable reactiva para forzar el re-renderizado del componente.
 * @type {import('vue').Ref<number>}
 */
 const componentKey = ref(0);

/**
 * Función para cambiar el valor de componentKey y forzar el re-renderizado de los modals.
 * @function
 * @returns {void}
 */
const forceRerender = () => {
  componentKey.value += 1;
};

/**
 * Año actual para el campo de año de nacimiento en el formulario.
 * @type {number}
 */
const currentYear: number = new Date().getFullYear();

/**
 * Acceso al almacenamiento global usando el hook useMainStore.
 * @type {MainStore}
 */
const mainStore = useMainStore();

/**
 * Variable reactiva para almacenar los errores del formulario.
 * @type {import('vue').Ref<FormErrors>}
 */
let errors = ref<FormErrors>({});

/**
 * Variable reactiva para almacenar los datos del formulario de registro.
 * @type {import('vue').Ref<RegisterCredentials>}
 */
const formData = ref<RegisterCredentials>({
  name: '',
  email: '',
  birth_year: currentYear,
  rut: ''
});

/**
 * Función asincrónica para enviar el formulario de registro.
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function submitForm(): Promise<void> {
  errors.value = {};

  try {
      const response = await register(formData.value);
      mainStore.user = response.user;
      mainStore.token = response.token
      //Para obtener el nombre de usuario de github por el correo.
      //const username = await getUsername(response.user.email);
      //Para setear el nombre en la mainstore
      //mainStore.githubUsername = response.data.items[0].login;
      mainStore.githubUsername = 'Dizkm8';
      clearAll();
      router.push('/repos')
      
  } catch (error: any) {
    errors = { ...error.response.data } || {};
    forceRerender();
  }
}

/**
 * Función para limpiar todos los campos del formulario y errores.
 * @function
 * @returns {void}
 */
function clearAll(){
  formData.value.name = '';
  formData.value.email = '';
  formData.value.birth_year = currentYear;
  formData.value.rut = '';
  errors = ref<FormErrors>({});
}

</script>
    
<style>
.container{
  --ion-background-color: white;
}
</style>