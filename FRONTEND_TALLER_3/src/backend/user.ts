import api from '@/services/api';
import { FormEditUser, FormChangePassword } from '@/interfaces/userForm';
import { useMainStore } from '@/stores/main';

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