/**
 * Interfaz para representar la información de un usuario.
 * @interface User
 */
export interface User {
    /**
     * Identificador único del usuario.
     * @type {string}
     */
    id: string;
  
    /**
     * Nombre del usuario.
     * @type {string}
     */
    name: string;
  
    /**
     * Correo electrónico del usuario.
     * @type {string}
     */
    email: string;
  
    /**
     * Año de nacimiento del usuario.
     * @type {string}
     */
    birth_year: string;
  
    /**
     * Número de RUT (Rol Único Tributario) del usuario.
     * @type {string}
     */
    rut: string;
  
    /**
     * Token de autenticación asociado al usuario.
     * @type {string}
     */
    token: string;
}
  