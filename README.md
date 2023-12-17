# Taller 3 de Introducción al Desarrollo Web/Móvil

### DarÍo Contreras Abaca
****
## INSTALACIÓN:
Debes instalar [Visual Studio Code](https://code.visualstudio.com/) y [Xampp](https://www.apachefriends.org/es/download.html).

Para comenzar la instalación, debes abrir Visual Studio Code, ir a File -> Open Folder, y seleccionar carpeta en donde quieres clonar el proyecto.

Ir a Terminal -> New Terminal para abrir una nueva terminal.

Ejecutar los siguientes comandos en orden: 

```bash
git clone https://github.com/Dariusss12/Taller3_IDWM
```

```bash
cd Taller3_IDWM
```

```bash
cd BACKEND_TALLER_3
```

```bash
copy .env.example .env
```

```bash
composer install
```

```bash
php artisan key:generate
```

```bash
php artisan jwt:secret
```

Abrir Xampp Control Panel e iniciar Apache y MySQL dando click en el botón "start" respetando el orden.

Ahora debes ir al archivo .env en la carpeta BACKEND_TALLER_3 y en el apartado "DB_DATABASE=laravel" cambiar laravel por taller3_idwm y guardar los cambios con ctrl + s.

Debes verificar que el puerto de MySQL coincida con "DB_PORT" en el archivo .env de BACKEND_TALLER_3. 

****
En caso de que no coincidan, debes copiar el puerto de MySQL y colocarlo en "DB_PORT".

Ejemplo: "DB_PORT=1234".
****

En caso de que no exista la base de datos:

```bash
php artisan migrate
```
Si sale el siguiente mensaje:

```bash
   WARN  The database 'taller3_idwm' does not exist on the 'mysql' connection.  

  Would you like to create it? (yes/no) [no]
```
Debes escribir yes:

```bash
yes
```
En caso de que ya exista la base de datos:

```bash
php artisan migrate:fresh
```
****
```bash
cd..
```
```bash
cd FRONTEND_TALLER_3
```

```bash
npm i
```

****
## INCIAR SISTEMA:
En Visual Studio Code, ir a File -> Open Folder, y seleccionar la carpeta BACKEND_TALLER_3.

Ir a Terminal -> New Terminal para abrir una nueva terminal.

Ejecutar el siguiente comando:

```bash
php artisan serve
```

Luego en Visual Studio Code, ir a File -> New Window.

En esa nueva ventana ir a File -> Open Folder, y seleccionar la carpeta FRONTEND_TALLER_3.

Ir a Terminal -> new terminal para abrir una nueva terminal.

Ejecutar el siguiente comando en ese nueva ventana:

```bash
npm run dev
```

Abrir el enlace indicado por la consola como "Local:" para visualizar la página web.

```bash
  VITE v4.5.0  ready in 506 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```
Luego en el navegador debes abrir las herramientas de desarrollador (en el caso de Google Chrome apretando la tecla F12) y seleccionar las dimensiones de la pantalla como cualquier modelo de teléfono disponible.

****
## Postman

Para probar el la api usando "postman-file", necesitas instalar [Postman](https://www.postman.com/downloads/).
Al abrir Postman y elegir un espacio de trabajo, debes hacer click en "Import" y seleccionar "postman-file".

## Ejecución

#### Registrar usuario
Ejecutas la prueba y la api debería retornarte la información del usuario creado.

#### Loggear usuario
Ejecutas la prueba y la api debería retornarte la información del usuario y el token creado por el login. Asegurate de copiar el token para usarlo en las otras pruebas.

#### Editar usuario
Para realizar la edición, debes ir a la pestaña de Authorization -> Tpye y seleccionar "Bearer Token", esto mostrara una opcion al lado en donde debes copiar el token del Login.
Luego ejecutas la prueba y la api debería retornarte la información del usuario con los datos editados.

#### Cambiar contraseña
Para realizar el cambio, debes ir a la pestaña de Authorization -> Tpye y seleccionar "Bearer Token", esto mostrara una opcion al lado en donde debes copiar el token del Login.
Luego ejecutas la prueba y la api debería retornarte un "succes = true".


