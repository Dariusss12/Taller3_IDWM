<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container">
        <div class="flex flex-wrap items-center justify-between h-[10%] h-max-10 bg-[#3880ff] text-white w-full">
            <h1 class="font-bold text-xl ml-2">Repositorios</h1>
                <button @click="cerrarSesion" class="w-8 h-8 hover:text-gray-500 mr-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
        </div>

        <div class="h-[80%] overflow-auto">

            <div v-for="repo in repos" class="m-3 bg-gray-200 rounded-lg p-2 text-gray-700"> 
                <h1 class="font-bold text-l">{{ repo.name }}</h1>
                <h1 class="text-sm">Fecha de creación: {{ formatedDate(repo.created_at) }}</h1>
            </div>
            
        </div>

        <div class="flex h-[10%] bg-[#2a2a2a] w-full fixed"></div>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonImg, IonRow, IonButton } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { logout } from '../backend/auth'
import { getRepos } from '@/backend/github';

async function cerrarSesion(){
    await logout();
    router.push('/')
};

const repos = ref([]) 

async function getUserRepos() {
    const response = await getRepos();
    repos.value = response;
    repos.value.sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA; // Orden descendente, para ascendente cambia a dateA - dateB
    });
}

function formatedDate(fechaOriginal: string){
    const fechaFormateada = new Date(fechaOriginal).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return fechaFormateada;
}

/**
 * Función OnMounted para abrir el modal de Login cada vez que se ingresa a la vista.
 */
 onMounted(async () => {
    getUserRepos();
});


</script>

<style>
.container{
  --ion-background-color: white;
}
</style>