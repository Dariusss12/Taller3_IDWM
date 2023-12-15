import { LoginCredentials, RegisterCredentials } from '../interfaces/auth';
import api from '@/services/api';
import { useMainStore } from '@/stores/main';

export async function login(credentials: LoginCredentials) {
  const response = await api.post('/login', credentials);
  return response.data;
};

export async function register(credentials: RegisterCredentials) {
  const response = await api.post('/register', credentials);
  return response.data;
};

export async function logout(){
    // Obtén el token del localStorage
    const token = useMainStore().token;
  
    // Verifica si el token está presente
    if (!token) {
      console.error('No se encontró el token en localStorage');
      return false;
    }
  
    try {
      // Realiza la solicitud de logout con el token en el encabezado
      const response = await api.post('/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Si la solicitud tiene éxito, realiza otras acciones según sea necesario
      // ...
      useMainStore().token = '';
      return response; // Indica que el logout fue exitoso
  
    } catch (error) {
      console.error('Error al realizar el logout:', error);
      return false; // Indica que hubo un error durante el logout
    }
  }

