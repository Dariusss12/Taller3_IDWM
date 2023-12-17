import github from '@/services/githubApi';
import { useMainStore } from '@/stores/main';

export async function getUsername(email: string) {
    const response = await github.get(`/search/users?q=${email}`);
    return response;
}

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




