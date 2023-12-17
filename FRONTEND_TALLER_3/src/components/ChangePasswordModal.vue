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
              <DialogPanel class=" w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-3 shadow-xl transition-all" :key="componentKey">
                <div class="w-full flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black" @click="closeModal">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                <div v-if="!message">
                  <h1 class="text-center mb-10 text-2xl text-black font-bold">¡Cambia tu contraseña!</h1>       
                  <form @submit.prevent="submitForm" class="mx-auto w-full">
                    <div class="mb-5">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Contraseña antigua</label>
                      <input type="password" v-model="formData.old_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" >
                      <p v-if="errors.old_password" class="text-sm text-[#ff0000] w-full mx-auto mt-1">{{ errors.old_password[0]}}</p>
                    </div>
                    <div class="mb-5 ">
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Contraseña nueva</label>
                      <input type="password" v-model="formData.new_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " novalidate>
                      <p v-if="errors.new_password" class="text-sm text-[#ff0000] w-full mx-auto mt-1">{{ errors.new_password[0]}}</p>
                    </div>
                    <p v-if="errors.credentials" class="text-sm text-[#ff0000] w-full mx-auto mb-3">{{ errors.credentials }}</p>
                    <div class="flex justify-center w-full">
                        <button type="submit" class="text-white  bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5">Guardar cambios</button>
                    </div>
                  </form>
                </div>
                <div v-else>
                  <h1 class="text-center text-3xl font-bold text-black">{{ message }}</h1>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[25%] h-[25%] text-green-500 mx-auto my-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

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
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import { useMainStore } from '@/stores/main';
import { FormErrors } from '@/interfaces/userForm';
import { FormChangePassword } from '@/interfaces/userForm';
import { changePassword } from '@/backend/user';
import { validateToken, logout } from '@/backend/auth';
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
const formData = ref<FormChangePassword>({
  old_password: '',
  new_password: ''
});

/**
 * Se define una variable de mensaje
 */
 const message = ref('')

/**
 * Se define una función para generar un delay
 * @param milliseconds 
 */
 function delayWithPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

/**
 * Se define la función para enviar el formulario a la api, obteniendo la respuesta y los errores.
 */
async function submitForm(): Promise<void> {
  errors.value = {};

  try {
      const isValid = await validateToken();
      if(isValid.data.valid === 'true'){
        const response = await changePassword(formData.value);
        mainStore.user = response.data.user;
        message.value = '¡Tu contraseña se ha cambiado con exito!'
        await delayWithPromise(2000);
        closeModal();
        mainStore.token = '';
        mainStore.user = null;
        router.push('/')
      }
      else{
        mainStore.token = '';
        mainStore.user = null;
        closeModal();
        router.push('/');
      }


  } catch (error: any) {
    errors = { ...error.response.data } || {};
    console.log(errors)
    forceRerender();
  }
}


</script>