<!--
 CommitsModal - Modal que muestra los commits de un repo.
 
 @component
 @example
 <CommitsModal 
 v-if='showModal == true'
 @close = 'showModal = false'
 />
 
 @remarks
 Esta página utiliza Ionic con Vue y presenta una interfaz de usuario con los commits de un repo.
 /-->
<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" class="relative z-[50]" @close="closeModal">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
        <div class="fixed inset-0 bg-black bg-opacity-80" />
        </TransitionChild>
  
        <div class="fixed overflow-y-auto inset-0">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class=" w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-3 shadow-xl transition-all">
                <div class="w-full flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black" @click="closeModal">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>

                <!-- Indicador de carga -->
                <div v-if="isLoading">
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
                <!-- Lista de commits del repositorio -->
                <div v-else>
                  <h1 class="text-center mb-10 text-2xl text-black font-bold">Commits de {{ prop.repoName }}</h1>    
                  <div v-for="commit in commits" class=" m-3">
                    <h1 class="text-black font-bold"> {{ commit.commit.message }}</h1>
                    <h1 class="text-black"> Autor: {{ commit.commit.author.name }}</h1>
                    <h1 class="text-black"> Fecha: {{ formatedDate(commit.commit.committer.date) }} </h1>

                  </div>   
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>        
      </Dialog>
    </TransitionRoot>
</template>
  
<script setup lang="ts">
/**
 * Importaciones
 */
import { ref, onMounted } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import { getCommits } from '@/backend/github';


/**
 * Variable de reactividad para el estado del modal, inicializado como abierto.
 * @type {import('vue').Ref<boolean>}
 */
const isOpen = ref<boolean>(true);
/**
 * Variable de reactividad para el estado del modal, inicializado como abierto.
 * @type {import('vue').Ref<boolean>}
 */
function closeModal(): void {
  isOpen.value = false;
}

/**
 * Variable de reactividad para indicar si la carga está en progreso.
 * @type {import('vue').Ref<boolean>}
 */
const isLoading = ref(true);

/**
 * Propiedad para almacenar el nombre del repositorio.
 * @type {import('vue').Ref<string>}
 */
const prop = defineProps({
  repoName: {
    type: String,
    requiered: true
  }
})

/**
 * Variable reactiva para almacenar la lista de commits.
 * @type {import('vue').Ref<Array<any>>}
 */
const commits = ref([]) 

/**
 * Función asincrónica para obtener y ordenar los commits del repositorio.
 * @async
 * @function
 * @name getRepoCommits
 */
async function getRepoCommits() {
  if(prop.repoName){
    const response = await getCommits(prop.repoName);
    commits.value = response;
    commits.value.sort((a, b) => {
        const dateA = new Date(a.commit.committer.date).getTime();
        const dateB = new Date(b.commit.committer.date).getTime();
        return dateB - dateA; // Orden descendente, para ascendente cambia a dateA - dateB
    });
  }
  
}
/**
 * Función para formatear la fecha.
 * @function
 * @name formatedDate
 * @param {string} fechaOriginal - La fecha original en formato de cadena.
 * @returns {string} - La fecha formateada.
 */
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
 * @function
 * @name onMounted
 */
 onMounted(async () => {
    await getRepoCommits();
    isLoading.value = false
});

</script>