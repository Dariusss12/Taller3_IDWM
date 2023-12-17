<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container">
        <edit-user-modal
        v-if="showEditModal" 
        @close="showEditModal = false"
        :key="componentKey1"
        ></edit-user-modal>
        <CommitsModal
        v-if="showCommitsModal" 
        @close="showCommitsModal = false, commitRepoName = ''"
        :repoName = commitRepoName
        :key="componentKey2"
        >
        </CommitsModal>
        <ChangePasswordModal
        v-if="showChangeModal" 
        @close="showChangeModal = false"
        :key="componentKey3"
        >
        </ChangePasswordModal>
        <div class="flex flex-wrap items-center justify-between h-[10%] h-max-10 bg-[#3880ff] text-white w-full">
            <h1 class="font-bold text-2xl ml-2">Repositorios</h1>
                <button @click="cerrarSesion" class="w-8 h-8 hover:text-gray-500 mr-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
        </div>

        <div class="h-[80%] overflow-auto" v-if="!isLoading">

            <div v-for="repo in repos" class="m-3 bg-gray-200 rounded-lg p-2 text-gray-700 flex"> 
                <div class="w-[70%]">
                    <h1 class="font-bold text-l">{{ repo.name }}</h1>
                    <div class="w-full my-2">
                        <h1 class="text-sm">Fecha de creación: {{ formatedDate(repo.created_at) }}</h1>
                        <h1 class="text-sm" v-if="repoCommits[repo.name] !== undefined">Cantidad de commits: {{ repoCommits[repo.name] }}</h1>
                    </div>
                </div>

                <div class="w-[30%] items-center flex">
                    <button @click="openCommitsModal(repo.name)" class="bg-green-500 rounded-lg p-2 font-bold text-white text-xs" :key="commitRepoName">Ver commits</button>
                </div>
            </div>

        </div>

        <div class="h-[80%] flex items-center" v-else>

            <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                <path fill="#3880ff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                    <animateTransform 
                        attributeName="transform" 
                        attributeType="XML" 
                        type="rotate"
                        dur="1s" 
                        from="0 50 50"
                        to="360 50 50" 
                        repeatCount="indefinite" />
                </path>
            </svg>
        </div>

        <div class="flex items-center h-[10%] bg-[#3a3a3a] w-full fixed justify-between ">
            <div class="w-1/2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[25%] h-[25%] mx-auto" @click="openEditModal"> 
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </div>
            <div class="w-1/2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[25%] h-[25%] mx-auto" @click="openChangeModal">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
            </div>
        </div>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import EditUserModal from '@/components/EditUserModal.vue';
import CommitsModal from '@/components/CommitsModal.vue';
import ChangePasswordModal from '@/components/ChangePasswordModal.vue';
import router from '@/router';
import { logout } from '../backend/auth'
import { getRepos, getCommits } from '@/backend/github';


/**
 * Se define las variables como keys
 */
 const componentKey1 = ref(0);
 const componentKey2 = ref(0);
 const componentKey3 = ref(0);

/**
 * Funcion para cambiar el valor de componentKey y asì forzar el re-renderizado de los modals
 */
const forceRerender1 = () => {
  componentKey1.value += 1;
};

const forceRerender2 = () => {
  componentKey2.value += 1;
};

const forceRerender3 = () => {
  componentKey3.value += 1;
};


async function cerrarSesion(){
    await logout();
    router.push('/')
};

const showEditModal = ref(false);
const showCommitsModal = ref(false);
const showChangeModal = ref(false);

const isLoading = ref(true);

function openEditModal() {
    showEditModal.value = true;
    forceRerender1();
}

let commitRepoName = ''

function openCommitsModal(repoName: string) {
    showCommitsModal.value = true;
    commitRepoName = repoName
    forceRerender2();
}

function openChangeModal() {
    showChangeModal.value = true;
    forceRerender3();
}

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



async function getCantCommits(reposName:string) {
    const response = await getCommits(reposName);

    // Verificar si la respuesta es un array
    if (Array.isArray(response)) {
        const cantCommits = response.length;
        return cantCommits;
    } else {
        // En caso de que la respuesta no sea un array, puedes manejarlo según tus necesidades.
        // Puedes devolver 0, lanzar un error, o realizar alguna otra acción.
        return 0; // O puedes lanzar un error: throw new Error("La respuesta no es un array de commits");
    }
}

interface RepoCommits {
  [repoName: string]: number | undefined;
}

const repoCommits = ref<RepoCommits>({});

async function calculateCommits() {
  for (const repo of repos.value) {
    const commitsCount = await getCantCommits(repo.name);
    // Utiliza el nombre del repositorio como clave en el objeto repoCommits
    // para almacenar la cantidad de commits.
    repoCommits.value[repo.name] = commitsCount;
  }
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
    await getUserRepos();
    await calculateCommits();
    isLoading.value = false;
});


</script>

<style>
.container{
  --ion-background-color: white;
}
</style>