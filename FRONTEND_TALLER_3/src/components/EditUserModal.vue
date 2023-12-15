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
  
        <div class="fixed inset-0 overflow-y-auto">
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
              <DialogPanel class=" w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all" :key="componentKey">
                <h1 class="text-center mb-10 text-2xl text-black font-bold">¡Edita tu información!</h1>       
                <form @submit.prevent="submitForm" class="mx-auto w-full">
                  <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre Completo</label>
                    <input type="text" v-model="formData.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" >
                    <p v-if="errors.name"  class="text-red-500 text-sm my-2">{{ errors.name[0] }}</p>
                  </div>
                  <div class="mb-5 ">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Correo Electrónico</label>
                    <input type="text" v-model="formData.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " novalidate>
                    <p v-if="errors.email" class="text-red-500 text-sm my-2">{{ errors.email[0] }}</p>
                  </div>
                  <div class="mb-5 ">
                    <label for="points_earned" class="block mb-2 text-sm font-medium text-gray-900">Año de nacimiento</label>
                    <input type="text" v-model="formData.birth_year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " >
                    <p v-if="errors.birth_year" class="text-red-500 text-sm my-2">{{ errors.birth_year[0] }}</p>
                  </div>
                  <div class="flex justify-center w-full">
                      <button type="submit" class="text-white  bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5">Guardar cambios</button>
                  </div>
                </form>
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
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import { useMainStore } from '@/stores/main';
import { FormErrors } from '@/interfaces/userForm';
import { FormEditUser } from '@/interfaces/userForm';
import { editUser } from '@/backend/user'
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


/**
 * Se define una variable como true para el estado del modal
 */
const isOpen = ref<boolean>(true);
/**
 * Se define una función para cerrar el modal, asignando isOpen como false
 */
function closeModal(): void {
  isOpen.value = false;
}



/**
 * Se define una lista de errores
 */
let errors = ref<FormErrors>({});

/**
 * Se define un formulario.
 */
const formData = ref<FormEditUser>({
  name: mainStore.user?.name ,
  email: mainStore.user?.email,
  birth_year: mainStore.user?.birth_year,
});

/**
 * Se define la función para enviar el formulario a la api, obteniendo la respuesta y los errores.
 */
async function submitForm(): Promise<void> {
  errors.value = {};
  try {
      const response = await editUser(formData.value);
      mainStore.user = response.data.user;
      closeModal();
      window.location.reload();

  } catch (error: any) {
    errors = { ...error.response.data } || {};
    if(error.response.data.status){
        mainStore.user = null;
        mainStore.token = '';
        closeModal();
        router.push('/');
      }
    console.log(errors)
    forceRerender();
  }
}


</script>