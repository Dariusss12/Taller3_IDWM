<!--
 HomeView - Página de inicio.
 
 @component
 @example
 <HomeView />
 
 @remarks
 Esta página utiliza Ionic con Vue y presenta una interfaz de usuario con los botones para iniciar sesión o registrarse.
 /-->
<template>
  <ion-page>
    <!-- Página principal con contenido fullscreen y contenedor -->
    <ion-content :fullscreen="true"  class="container">
      <!-- Contenedor principal con diseño flexible y alineación de elementos -->
        <div class="flex h-full items-center">
            <div>
              <!-- Fila para el título del MobileHub -->
              <ion-row>
                <h1 class="w-full text-center text-4xl mb-10 font-bold">MobileHub</h1>
              </ion-row>
              <!-- Fila para la imagen del MobileHub -->
              <ion-row>
                  <ion-img
                  class="w-11/12 h-11/12 mx-auto mb-5"
                  src="/MobileHub.png"
                  ></ion-img>
              </ion-row>
              <!-- Fila con dos enlaces para iniciar sesión y registrarse -->
              <ion-row class="w-full grid grid-cols-1 grid-rows-2">
                <!-- Enlace para iniciar sesión -->
                <router-link to="/login" class="font-bold text-center w-4/5 mx-auto text-white bg-[#3880ff] hover:bg-[#3171e0] rounded-2xl p-3.5">Inicia Sesión</router-link>
                <!-- Enlace para registrarse -->
                <router-link to="/register" class="font-bold text-center mt-2">Regístrate</router-link>
              </ion-row>
            </div>
        </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// Importaciones de componentes de Ionic
import { IonContent, IonPage, IonImg, IonRow } from '@ionic/vue';

</script>

<style>
.container{
  --ion-background-color: white;
}
</style>