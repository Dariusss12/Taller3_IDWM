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

