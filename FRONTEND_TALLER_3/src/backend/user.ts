/**
 * Módulo para realizar operaciones relacionadas con la edición del usuario y cambio de contraseña.
 * @module
 */
import api from '@/services/api';
import { FormEditUser, FormChangePassword } from '@/interfaces/userForm';
import { useMainStore } from '@/stores/main';

/**
 * Función asincrónica para editar la información del usuario en el servidor.
 * @async
 * @function
 * @name editUser
 * @param {FormEditUser} data - Datos del formulario para editar el usuario.
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function editUser(data: FormEditUser){
    // Obtén el token del localStorage
  const mainStore = useMainStore()

  const token = mainStore.token;
  const response = await api.put(`/users/${mainStore.user?.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  return response;

}

/**
 * Función asincrónica para cambiar la contraseña del usuario en el servidor.
 * @async
 * @function
 * @name changePassword
 * @param {FormChangePassword} data - Datos del formulario para cambiar la contraseña.
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function changePassword(data: FormChangePassword){
  // Obtén el token del localStorage
  const mainStore = useMainStore()

  const token = mainStore.token;
  const response = await api.put(`/users/${mainStore.user?.id}/changePassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  return response;

}