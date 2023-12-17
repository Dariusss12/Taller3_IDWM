/**
 * Módulo para realizar solicitudes HTTP a una API local utilizando Axios.
 * @module ApiService
 */
import axios from 'axios';

/**
 * Puerto en el que la API local está escuchando.
 * @type {number}
 */
const port = 8000;

/**
 * Instancia de Axios configurada para interactuar con la API local.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
    /**
   * URL base de la API local.
   * @type {string}
   */
  baseURL: `http://localhost:${port}/api`,
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
 * Exporta la instancia de Axios configurada para interactuar con la API local.
 * @type {import('axios').AxiosInstance}
 */
export default api;