/**
 * Interfaz para representar errores de formulario.
 * @interface FormErrors
 */
export interface FormErrors {
    [key: string]: string;
};

/**
 * Interfaz para representar datos de formulario de edición de usuario.
 * @interface FormEditUser
 */
export interface FormEditUser {
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
 
};

/**
 * Interfaz para representar datos de formulario de cambio de contraseña.
 * @interface FormChangePassword
 */
export interface FormChangePassword {
    /**
    * Contraseña antigua del usuario.
    * @type {string}
    */
    old_password: string;
    /**
    * Nueva contraseña del usuario.
    * @type {string}
    */
    new_password: string;
};