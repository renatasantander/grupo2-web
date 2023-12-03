# grupo_Grupo2_backend

### Documentación instalación BDD y API

A continuación se presenta la documentación para guiar a los usuarios en la instalación y configuración del backend de la aplicación.

#### BDD

Para poder configurar y levantar la base de datos, se deben seguir los siguientes pasos:

1. Crear archivo ```.env``` dentro de la carpeta de backend, la cual debe contener la siguiente información personalizada:
   ```sh
   DB_USERNAME=nombre_de_usuario_postgres
   DB_PASSWORD=password_de_usuario_postgres
   DB_NAME=nombre_que_se_le_pondrá_a_la_base_de_datos
   DB_HOST='localhost'
   JWT_SECRET=jwt_secret
   ```
2. Correr en la terminal el comando ```yarn```, que instala las dependencias.
3. Correr en la terminal el comando ```createdb nombre_que_se_le_pondrá_a_la_base_de_datos```, la que crea la base de datos.
4. Opcional: Si se hacen cambios en migraciones, correr en la terminal ```yarn sequelize-cli db:migrate:undo:all```, lo que deshace las migraciones creadas.
5. Correr en la terminal ```yarn sequelize-cli db:migrate```, para nuevamente crear las migraciones (necesario para que las migraciones se creen en la base de datos recién creada).
6. Correr en la terminal ```yarn sequelize-cli db:seed:all```, para crear las semillas en nuestra base de datos.
7. Por último, ejecuta el servidor del backend con el siguiente comando:
   - ```yarn dev``` para ejecutar el backend en modo desarrollo.
   - ```yarn start``` para ejecutar el backend en modo producción.

Luego, puedes acceder a la API en _localhost:3000_ desde un navegador web.

#### API

En relación a la instalación de la API, se pueden instalar las dependencias necesarias para ejecutarla con el comando ```yarn``` en la terminal. Luego, se debe correr el comando ```yarn dev``` para comenzar a ejecutar la API.

Opcional: Se puede ejecutar la API e ir a Postman para probar los distintos _endpoints_ disponibles. Importante notar que, antes de este paso, se deben completar los pasos de instalación y configuración de la base de datos.

### Conexión con Frontend

Para establecer conexión entre el backend y el frontend, se debe crear un archivo ```.env``` dentro de la carpeta ```planner``` del frontend, el cual debe contener la siguiente información:

```sh
VITE_BACKEND_URL=ubicacion_donde_escucha_el_backend
```

Si se está ejecutando el backend de forma local, la ```ubicacion_donde_escucha_el_backend``` corresponde a ```http://localhost:3000```.

Adicionalmente, para poder ejecutar la aplicación, hay que abrir dos terminales por separado, una para el backend y otra para el frontend (carpeta ```planner```). Se debe correr el comando ```yarn``` en ambas terminales, para instalar posibles nuevas dependencias. Luego, se debe correr el comando ```yarn dev``` en cada una de ellas. De esta forma, se habrá establecido la conexión entre el backend y el frontend.

### Documentación de la API

- La documentación de la API fue realizada con Postman y se puede encontrar en el siguiente [link](https://documenter.getpostman.com/view/26595524/2s9YRCXrdC).
- Esta documentación incluye información detallada sobre cada uno de los _endpoints_ disponibles en la API (método HTTP, URL, parámetros, body, respuestas), así como también ejemplos de uso de cada uno de ellos.

### Uso de Linter

Para poder utilizar la herramienta de linting (ESLint) en el proyecto, se debe ejecutar el comando ```yarn run lint``` en la terminal. Esto permite revisar el código y encontrar errores de sintaxis, así como también errores de estilo.

<!-- ***Validaciones y Restricciones***
1. Usuario:
   - Usuario: not Null, unique
   - Contraseña: not Null, debe contener un caracter especial, un número y una letra
   - Mail: not Null, unique
2. Proyecto:
   - Título:  not Null
   - Estado: not Null
3. Usuario-Proyecto:
   - Rol: not Null
4. Tarea:
   - Título: not Null
   - Fecha (caducación): not Null
   - Estado: not Null
   - Comentario: not Null
5. Etiqueta:
   - Nombre: not Null
6. Notificación:
   - Tipo: not Null
   - Mensaje: not Null
   - Leído: not Null -->

### Documentación funcionamiento del fllujo de la página web

Al acceder a la página web, los usuarios son automáticamente redirigidos a la sección de "Inicio". En la parte superior de la página, se encuentra una barra de navegación con las siguientes opciones: "Inicio", "Registrarse", "Iniciar Sesión" e "Instrucciones".

```Inicio:``` La página de Inicio tiene como objetivo presentar el proyecto y dar la bienvenida a los usuarios.

```Registrarse:``` La página de Registrarse permite a los nuevos usuarios crear una cuenta en la plataforma proporcionando un nombre de usuario, una contraseña y una dirección de correo electrónico.

```Iniciar Sesión:``` La página Iniciar Sesión está diseñada para que los usuarios registrados inicien sesión en la plataforma. Aquí, deben ingresar su dirección de correo electrónico y contraseña.

```Instrucciones:``` La página de Instrucciones proporciona información sobre cómo funciona la página web.

Una vez que un usuario inicia sesión, la barra de navegación se modifica para mostrar las siguientes opciones: "Inicio", "Página Principal", "Notificaciones", "Instrucciones", "Editar Perfil", "Cerrar Sesión" y "Admin". Las páginas "Inicio" e "Instrucciones" son las mismas que se describieron anteriormente.

```Página Principal:``` En esta sección, los usuarios pueden ver los proyectos previamente creados, así como la opción de crear nuevos proyectos. Además, al crear un proyecto, se puede especificar si será compartido o individual. Al hacer clic en un proyecto en la página principal, se redirige a la página del proyecto correspondiente.

En la página del proyecto, se presentan tres columnas: ```Tareas Pendientes```, ```Tareas en Curso``` y ```Tareas Terminadas```. En caso de que no existan tareas, estas columnas aparecerán vacías. También hay tres botones en la parte superior y a la izquierda de la página:

- ```Crear Tarea:``` Este botón dirige a una sección donde se pueden crear tareas mediante un formulario que incluye campos para el título, la fecha límite y un comentario. Las tareas creadas se mostrarán en la columna de Tareas Pendientes.

- ```Invitar:``` Esta opción lleva a una página donde los usuarios pueden invitar a otros usuarios ingresando sus direcciones de correo electrónico y enviando una notificación de invitación.

- ```Editar Proyecto:``` Dirige a una sección donde se pueden editar el nombre del proyecto, cambiar su configuración de individual a compartido y viceversa, o eliminar el proyecto.

```Notificaciones:``` En esta sección, los usuarios pueden ver las notificaciones relacionadas con todos los proyectos. Esto incluye notificaciones de invitación a proyectos compartidos. Los usuarios tienen la opción de aceptar o rechazar estas invitaciones.

```Editar Perfil:``` La página Editar Perfil ofrece un formulario donde los usuarios pueden modificar la información de su perfil según sea necesario.

```Cerrar Sesión:``` Este botón permite a los usuarios cerrar sesión en su cuenta. Una vez que se cierra la sesión, se redirige a la página con la barra de navegación original.

```Admin:``` Si un usuario inicia sesión como administrador utilizando las credenciales apropiadas, se le mostrarán cuatro columnas que contienen información sobre todos los usuarios, proyectos, tareas y notificaciones creadas por todos los usuarios. Se brinda la opción de eliminar elementos en cada categoría según sea necesario.