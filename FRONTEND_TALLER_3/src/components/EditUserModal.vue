<!--
 EditUserModal - Modal que muestra el formulario de editar información.
 
 @component
 @example
 <EditUserModal 
 v-if='showModal == true'
 @close = 'showModal = false'
 />
 
 @remarks
 Esta página utiliza Ionic con Vue y presenta una interfaz de usuario con un formulario para editar información del usuario.
 /-->
<template>
   <!-- Raíz de la transición con la propiedad appear y la condición show -->
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
                  <!-- Contenido del formulario de edición -->
                  <h1 class="text-center mb-10 text-2xl text-black font-bold">¡Edita tu información!</h1>       
                  <form @submit.prevent="submitForm" class="mx-auto w-full">
                  <!-- Campos del formulario con mensajes de error condicionales -->
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
import { FormEditUser } from '@/interfaces/userForm';
import { editUser } from '@/backend/user';
import { validateToken } from '@/backend/auth';
import router from '@/router';


/**
 * Almacén principal de la aplicación.
 * @type {import('@/stores/main').MainStore}
 */
const mainStore = useMainStore();
/**
 * Variable de reactividad para forzar el re-renderizado de los modales.
 * @type {import('vue').Ref<number>}
 */
const componentKey = ref(0);
/**
 * Función para cambiar el valor de componentKey y forzar el re-renderizado de los modales.
 * @function
 * @name forceRerender
 */
const forceRerender = () => {
  componentKey.value += 1;
};


/**
 * Estado del modal, inicializado como abierto.
 * @type {import('vue').Ref<boolean>}
 */
const isOpen = ref<boolean>(true);
/**
 * Función para cerrar el modal.
 * @function
 * @name closeModal
 */
function closeModal(): void {
  isOpen.value = false;
}



/**
 * Objeto para almacenar errores del formulario.
 * @type {import('@/interfaces/userForm').FormErrors}
 */
let errors = ref<FormErrors>({});

/**
 * Objeto para almacenar datos del formulario de edición de usuario.
 * @type {import('@/interfaces/userForm').FormEditUser}
 */
const formData = ref<FormEditUser>({
  name: mainStore.user?.name ,
  email: mainStore.user?.email,
  birth_year: mainStore.user?.birth_year,
});

/**
 * Variable para almacenar un mensaje.
 * @type {import('vue').Ref<string>}
 */
 const message = ref('')

/**
 * Función para introducir un retraso utilizando una promesa.
 * @param {number} milliseconds - La cantidad de milisegundos para esperar.
 * @returns {Promise<void>} - Una promesa que se resuelve después del retraso.
 */
 function delayWithPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

/**
 * Función para enviar el formulario a la API, gestionar la respuesta y los errores.
 * @async
 * @function
 * @name submitForm
 * @returns {Promise<void>} - Una promesa que se resuelve después del procesamiento del formulario.
 */
async function submitForm(): Promise<void> {
  errors.value = {};

  try {
      const isValid = await validateToken();
      if(isValid.data.valid === 'true'){
        const response = await editUser(formData.value);
        mainStore.user = response.data.user;
        message.value = '¡Tus datos se han actualizado con éxito!'
        await delayWithPromise(2000);
        closeModal();
      }
      else{
        mainStore.token = '';
        mainStore.user = null;
        closeModal();
        router.push('/');
      }


  } catch (error: any) {
    errors = { ...error.response.data } || {};
    forceRerender();
  }
}


</script>