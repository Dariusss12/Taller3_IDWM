/**
 * Interfaz para representar credenciales de registro.
 * @interface RegisterCredentials
 */
export interface RegisterCredentials {
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
     * @type {number}
     */
    birth_year: number;
  
    /**
     * Número de RUT (Rol Único Tributario) del usuario.
     * @type {string}
     */
    rut: string;
  }
  
  /**
   * Interfaz para representar credenciales de inicio de sesión.
   * @interface LoginCredentials
   */
  export interface LoginCredentials {
    /**
     * Correo electrónico del usuario.
     * @type {string}
     */
    email: string;
  
    /**
     * Contraseña del usuario.
     * @type {string}
     */
    password: string;
  }
  
  /**
   * Interfaz para representar errores de formulario.
   * @interface FormErrors
   */
  export interface FormErrors {
    [key: string]: string;
  }
  