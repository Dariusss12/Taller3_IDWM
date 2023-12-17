/**
 * Módulo para realizar operaciones relacionadas con la API de GitHub.
 * @module
 */
import github from '@/services/githubApi';
import { useMainStore } from '@/stores/main';

/**
 * Función asincrónica para obtener el nombre de usuario de GitHub asociado a un correo electrónico.
 * @async
 * @function
 * @name getUsername
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function getUsername(email: string) {
    const response = await github.get(`/search/users?q=${email}`);
    return response;
}

/**
 * Función asincrónica para obtener los repositorios de GitHub de un usuario.
 * @async
 * @function
 * @name getRepos
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function getRepos() {
 
  const mainStore = useMainStore();

  //Para usar con cualquier usuario logueado. Eso si, el usuario debe tener su correo visible en github y además debe ser el mismo con el que se registró.
  /*
  const response = await github.get(`/users/${mainStore.githubUsername}/repos`,{
    headers: {
      Authorization: `Bearer ${mainStore.githubToken}`
    }
  });
  */
  const response = await github.get(`/users/Dizkm8/repos`,{
    headers: {
      Authorization: `Bearer ${mainStore.githubToken}`
    }
  });
  return response.data;
};

/**
 * Función asincrónica para obtener los commits de un repositorio en GitHub.
 * @async
 * @function
 * @name getCommits
 * @param {string} repoName - Nombre del repositorio.
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 */
export async function getCommits(repoName: string) {
 
  const mainStore = useMainStore();
  
  //Para usar con cualquier usuario logueado. Eso si, el usuario debe tener su correo visible en github y además debe ser el mismo con el que se registró.
  /*
  const response = await github.get(`/users/${mainStore.githubUsername}/repos`,{
    headers: {
      Authorization: `Bearer ${mainStore.githubToken}`
    }
  });
  */
  const response = await github.get(`repos/Dizkm8/${repoName}/commits`,{
    headers: {
      Authorization: `Bearer ${mainStore.githubToken}`
    }
  });
  return response.data;
};




