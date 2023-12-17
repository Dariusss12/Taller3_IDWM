/**
 * Módulo para realizar operaciones de autenticación, registro, logout y validación del token.
 * @module
 */
import { LoginCredentials, RegisterCredentials } from '../interfaces/auth';
import api from '@/services/api';
import { useMainStore } from '@/stores/main';

/**
 * Función asincrónica para realizar la autenticación del usuario.
 * @async
 * @function
 * @name login
 * @param {LoginCredentials} credentials - Credenciales de inicio de sesión.
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function login(credentials: LoginCredentials) {
  const response = await api.post('/login', credentials);
  return response.data;
};

/**
 * Función asincrónica para realizar el registro de un nuevo usuario.
 * @async
 * @function
 * @name register
 * @param {RegisterCredentials} credentials - Credenciales de registro del usuario.
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function register(credentials: RegisterCredentials) {
  const response = await api.post('/register', credentials);
  return response.data;
};

/**
 * Función asincrónica para realizar el logout del usuario.
 * @async
 * @function
 * @name logout
 * @returns {Promise<boolean|object>} - Promesa que indica si el logout fue exitoso.
 */
export async function logout(){
    // Obtén el token del localStorage
  const mainStore = useMainStore()
  const token = mainStore.token;

  try {
    // Realiza la solicitud de logout con el token en el encabezado
      const response = await api.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    
    // Si la solicitud tiene éxito, realiza otras acciones según sea necesario
    // ...
    mainStore.user = null;
    mainStore.token = '';
    
    return response; // Indica que el logout fue exitoso

  } catch (error) {
    console.error('Error al realizar el logout:', error);
    return false; // Indica que hubo un error durante el logout
  }
}

/**
 * Función asincrónica para validar el token del usuario.
 * @async
 * @function
 * @name validateToken
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function validateToken() {
  const mainStore = useMainStore()
  const token = mainStore.token;

  const response = await api.get('/validate', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
}

