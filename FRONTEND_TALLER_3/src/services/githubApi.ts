/**
 * Módulo para realizar solicitudes HTTP a la API de GitHub utilizando Axios.
 * @module GitHubService
 */

import axios from 'axios';

/**
 * Instancia de Axios configurada para interactuar con la API de GitHub.
 * @type {import('axios').AxiosInstance}
 */
const github = axios.create({
  /**
   * URL base de la API de GitHub.
   * @type {string}
   */
  baseURL: `https://api.github.com/`,
    /**
   * Indica si se deben incluir las credenciales al hacer solicitudes.
   * @type {boolean}
   */
  withCredentials: false,
    /**
   * Cabeceras predeterminadas para las solicitudes.
   * @type {Object}
   * @property {string} Accept - Tipo de contenido aceptado en la respuesta.
   * @property {string} Content-Type - Tipo de contenido en la solicitud.
   */
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Exporta la instancia de Axios configurada para interactuar con la API de GitHub.
 * @type {import('axios').AxiosInstance}
 */
export default github;