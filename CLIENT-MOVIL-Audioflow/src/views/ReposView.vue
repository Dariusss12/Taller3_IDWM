<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container">
        <h1>repos</h1>
        <button @click="cerrarSesion" class="w-4/5 mx-auto font-bold rounded-2xl" type="submit" expand="block" fill="solid">logout</button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { logout } from '../backend/auth'

async function cerrarSesion(){
    console.log('hola')
    await logout();
    router.push('/')

};

</script>

<style>
.container{
  --ion-background-color: white;
}
</style>