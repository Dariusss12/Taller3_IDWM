<!--
 ChangePasswordModal - Modal que muestra un formulario para cambiar la contrasenia.
 
 @component
 @example
 <ChangePasswordModal 
 v-if='showModal == true'
 @close = 'showModal = false'
 />
 
 @remarks
 Esta página utiliza Ionic con Vue y presenta una interfaz de usuario con el formulario para cambiar la contrasenia.
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

                <!-- Contenido del formulario -->
                <div v-if="!message">
                  <h1 class="text-center mb-10 text-2xl text-black font-bold">¡Cambia tu contraseña!</h1>       
                  <form @submit.prevent="submitForm" class="mx-auto w-full">
                    <!-- Campos del formulario con mensajes de error condicionales -->
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
                    <!-- Botón para enviar el formulario -->
                    <div class="flex justify-center w-full">
                        <button type="submit" class="text-white  bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5">Guardar cambios</button>
                    </div>
                  </form>
                </div>
                <!-- Contenido para mostrar un mensaje de éxito -->
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

/**
 * Almacén principal de la aplicación.
 * @type {Object}
 * @const
 */
const mainStore = useMainStore();
/**
 * Se define una variable como key.
 * @type {Ref<number>}
 * @const
 */
const componentKey = ref(0);
/**
 * Función para cambiar el valor de componentKey y así forzar el re-renderizado de los modals.
 * @function
 * @name forceRerender
 * @returns {void}
 */
const forceRerender = () => {
  componentKey.value += 1;
};


/**
 * Se define una variable como true para el estado del modal.
 * @type {Ref<boolean>}
 * @const
 */
const isOpen = ref<boolean>(true);
/**
 * Función para cerrar el modal, asignando isOpen como false.
 * @function
 * @name closeModal
 * @returns {void}
 */
function closeModal(): void {
  isOpen.value = false;
}



/**
 * Se define una lista de errores.
 * @type {Ref<FormErrors>}
 * @const
 */
let errors = ref<FormErrors>({});

/**
 * Se define un formulario.
 * @type {Ref<FormChangePassword>}
 * @const
 */
const formData = ref<FormChangePassword>({
  old_password: '',
  new_password: ''
});

/**
 * Se define una variable de mensaje.
 * @type {Ref<string>}
 * @const
 */
 const message = ref('')

/**
 * Función para generar un delay con una promesa.
 * @function
 * @name delayWithPromise
 * @param {number} milliseconds - El tiempo de delay en milisegundos.
 * @returns {Promise<void>}
 */
 function delayWithPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

/**
 * Función para enviar el formulario a la API, obteniendo la respuesta y los errores.
 * @async
 * @function
 * @name submitForm
 * @returns {Promise<void>}
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