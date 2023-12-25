# grupo_Grupo2_backend

URLs de la aplicación desplegada:
- Frontend: https://main--charming-conkies-c5dd7a.netlify.app/
- Backend: https://grupo2-web-api.onrender.com/

### Documentación instalación BDD y API

A continuación se presenta la documentación para guiar a los usuarios en la instalación y configuración del backend de la aplicación.

#### BDD

Para poder configurar y levantar la base de datos, se deben seguir los siguientes pasos:

1. Crear archivo ```.env``` dentro de la carpeta de backend, la cual debe contener la siguiente información personalizada:
   ```sh
   DB_USERNAME = nombre_de_usuario_postgres
   DB_PASSWORD = password_de_usuario_postgres
   DB_NAME = nombre_que_se_le_pondrá_a_la_base_de_datos
   DB_HOST = 'localhost'
   JWT_SECRET = jwt_secret
   ADMIN_MAIL = email_de_admin
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


### Documentación de la API

- La documentación de la API fue realizada con Postman y se puede encontrar en el siguiente [link](https://documenter.getpostman.com/view/26595524/2s9YRCXrdC).
- Esta documentación incluye información detallada sobre cada uno de los _endpoints_ disponibles en la API (método HTTP, URL, parámetros, body, respuestas), así como también ejemplos de uso de cada uno de ellos.


### Conexión con Frontend

Para establecer conexión entre el backend y el frontend, se debe crear un archivo ```.env``` dentro de la carpeta ```planner``` del frontend, el cual debe contener la siguiente información:

```sh
VITE_BACKEND_URL=ubicacion_donde_escucha_el_backend
```

- Si se está ejecutando el backend de forma local, la ```ubicacion_donde_escucha_el_backend``` corresponde a ```http://localhost:3000```.
- Si se está ejecutando el backend desde el servidor, la ```ubicacion_donde_escucha_el_backend``` corresponde a ```https://grupo2-web-api.onrender.com```.

Adicionalmente, para poder ejecutar la aplicación, hay que abrir dos terminales por separado, una para el backend y otra para el frontend (carpeta ```planner```). Se debe correr el comando ```yarn``` en ambas terminales, para instalar posibles nuevas dependencias. Luego, se debe correr el comando ```yarn dev``` en cada una de ellas. De esta forma, se habrá establecido la conexión entre el backend y el frontend.

#### Endpoints conectados con el frontend

Proyectos:
- ```GET /proyectos```: Obtiene todos los proyectos existentes (Página Admin).
- ```GET /proyectos/:id```: Obtiene un proyecto en particular, por su ID (Página Proyecto).
- ```POST /proyectos```: Crea un nuevo proyecto (Página Principal).
- ```PATCH /proyectos/:id```: Actualiza un proyecto en particular, por su ID (Página Editar Proyecto).
- ```DELETE /proyectos/:id```: Elimina un proyecto en particular, por su ID (Páginas Editar Proyecto y Admin).

Authentication:
- ```POST /signup```: Registra un nuevo usuario en la aplicación (Página Registrarse).
- ```POST /login```: Inicia sesión en la aplicación (Página Iniciar Sesión).
- ```POST /editProfile```: Actualiza la información de un usuario mediante un token (Página Editar Perfil).
- ```GET /protectedadmin```: Verifica si el usuario es administrador para acceder a ruta protegida (Página Admin).
- ```GET /protecteduser```: Verifica si el usuario está logueado para acceder a rutas protegidas.

Usuarios:
- ```GET /usuarios```: Obtiene todos los usuarios existentes (Página Admin).
- ```GET /usuarios/me```: Obtiene un usuario mediante un token (Se utiliza en varias páginas de la aplicación).
- ```GET /usuarios/:id```: Obtiene un usuario en particular, por su ID (Página Tarea).
- ```GET /usuarios/mail/:mail```: Obtiene un usuario por su email (Página Invitar).
- ```DELETE /usuarios/:id```: Elimina un usuario en particular, por su ID (Páginas Editar Perfil y Admin).

Usuarios-Proyectos:
- ```POST /usuario-proyectos```: Crea una relación usuario_proyecto (Página Principal y Página Invitar).
- ```GET /usuario-proyectos/usuarios/:usuarioId/proyectos```: Obtiene todos los proyectos de un usuario en particular (Página Principal).
- ```PATCH /usuario-proyectos/usuarios/:usuarioId/proyectos/:proyectoId```: Actualiza una relación usuario_proyecto en particular (Página Notificaciones).
- ```DELETE /usuario-proyectos/usuarios/:usuarioId/proyectos/:proyectoId```: Elimina una relación usuario_proyecto en particular (Página Notificaciones y de forma automática al eliminar un proyecto o un usuario).

Tareas:
- ```POST /tareas```: Crea una nueva tarea (Página Crear Tarea).
- ```GET /tareas```: Obtiene todas las tareas existentes (Página Admin).
- ```GET /tareas/:id```: Obtiene una tarea en particular, por su ID (Páginas Tarea y Editar Tarea).
- ```GET /tareas/proyectos/:proyectoId```: Obtiene todas las tareas de un proyecto en particular (Página Proyecto).
- ```PATCH /tareas/:id```: Actualiza una tarea en particular, por su ID (Página Editar Tarea).
- ```DELETE /tareas/:id```: Elimina una tarea en particular, por su ID (Páginas Editar Tarea y Admin).

Etiquetas:
- ```POST /etiquetas```: Crea una nueva etiqueta (Página Tarea).
- ```GET /etiquetas/tareas/:tareaId```: Obtiene todas las etiquetas de una tarea en particular (Página Tarea).
- ```DELETE /etiquetas/:id```: Elimina una etiqueta en particular, por su ID (Página Editar Tarea).

Notificaciones:
- ```POST /notificaciones```: Crea una nueva notificación (Página Invitar).
- ```GET /notificaciones```: Obtiene todas las notificaciones existentes (Página Admin).
- ```GET /notificaciones/usuarios/:usuarioId```: Obtiene todas las notificaciones de un usuario en particular (Página Notificaciones).
- ```GET /notificaciones/reminder/:usuarioId```: Obtiene las notificaciones actualizadas de un usuario en particular (Página Notificaciones).
- ```PATCH /notificaciones/:id```: Actualiza una notificación en particular, por su ID (Página Notificaciones).
- ```DELETE /notificaciones/:id```: Elimina una notificación en particular, por su ID (Páginas Notificaciones y Admin).

Cabe destacar que, algunos de los endpoints implementados en el backend y presentes en la documentación de la API, no están conectados con el frontend, debido a que no se consideraron necesarios para el funcionamiento de la aplicación. Sin embargo, igual se mantuvieron en la API para testear la aplicación en Postman y para encontrar posibles errores en la implementación de los _endpoints_.

<!-- Enpoints no conectados con el frontend:
- ```PATCH /usuarios/:id```: Actualiza un usuario en particular, por su ID.
- ```GET /usuario-proyectos```: Obtiene todas las relaciones usuarios_proyectos existentes.
- ```GET /usuario-proyectos/usuarios/:usuarioId/proyectos/:proyectoId```: Obtiene una relación usuario_proyecto en particular.
- ```GET /etiquetas```: Obtiene todas las etiquetas.
- ```GET /etiquetas/:id```: Obtiene una etiqueta en particular.
- ```PATCH /etiquetas/:id```: Actualiza una etiqueta en particular.
- ```GET /notificaciones/:id```: Obtiene una notificación en particular. -->

### Instrucciones de Inicio de Sesión

*Si en la barra de navegación solo aparece Inicio, se debe esperar un tiempo para que aparezcan las otras opciones.

Antes de Iniciar Sesión, debe existir un usuario. Para registrar un usuario, debes dirigirte a Registrarse, y crear una cuenta ingresando un nombre de usuario, una contraseña y un correo. Luego serás redirigido a la página de Iniciar Sesión.

Para Iniciar Sesión, debes ingresar un correo electrónico y una contraseña válidos. Si el correo y la contraseña son correctos, serás redirigido a la página principal. En caso contrario, se mostrará un mensaje de error.

Actualmente ya existe un usuario de ejemplo registrado, al que se puede acceder con los siguientes datos:

```sh
Mail = usuario@example.com
Contraseña = usuario123@
```

Si se desea ingresar a la cuenta como Administrador de la aplicación, se deben ingresar los siguientes datos en Iniciar Sesión:

```sh
Mail = admin@admin.com
Contraseña = admin123@
```


### Funcionamiento del flujo de la página web

Al acceder a la página web, los usuarios son automáticamente redirigidos a la sección de "Inicio". En la parte superior de la página, se encuentra una barra de navegación con las siguientes opciones: "Inicio", "Registrarse", "Iniciar Sesión" e "Instrucciones".

```Inicio:``` La página de Inicio tiene como objetivo presentar el proyecto y dar la bienvenida a los usuarios.

```Registrarse:``` La página de Registrarse permite a los nuevos usuarios crear una cuenta en la plataforma proporcionando un nombre de usuario, una contraseña y una dirección de correo electrónico.

```Iniciar Sesión:``` La página Iniciar Sesión está diseñada para que los usuarios registrados inicien sesión en la plataforma. Aquí, deben ingresar su dirección de correo electrónico y contraseña.

```Instrucciones:``` La página de Instrucciones proporciona información sobre cómo funciona la página web.

Una vez que un usuario inicia sesión, la barra de navegación se modifica para mostrar las siguientes opciones: "Inicio", "Página Principal", "Notificaciones", "Instrucciones", "Editar Perfil", "Cerrar Sesión" y, en caso de ser administrador, "Admin". Las páginas "Inicio" e "Instrucciones" son las mismas que se describieron anteriormente.

```Página Principal:``` En esta sección, los usuarios pueden ver los proyectos previamente creados, así como la opción de crear nuevos proyectos. Además, al crear un proyecto, se puede especificar si será compartido o individual. Al hacer clic en un proyecto en la página principal, se redirige a la página del proyecto correspondiente.

En la página del proyecto, se presentan tres columnas: ```Tareas Pendientes```, ```Tareas en Curso``` y ```Tareas Terminadas```. En caso de que no existan tareas, estas columnas aparecerán vacías. También hay tres botones en la parte superior y a la izquierda de la página:

- ```Crear Tarea:``` Este botón dirige a una sección donde se pueden crear tareas mediante un formulario que incluye campos para el título, la fecha límite y un comentario. Las tareas creadas se mostrarán en la columna de Tareas Pendientes.

- ```Invitar:``` Esta opción lleva a una página donde los usuarios pueden invitar a otros usuarios ingresando sus direcciones de correo electrónico y enviando una notificación de invitación.

- ```Editar Proyecto:``` Dirige a una sección donde se pueden editar el nombre del proyecto, cambiar su configuración de individual a compartido y viceversa, o eliminar el proyecto.

Además, si se hace clic en una tarea, se redirige a la página de la tarea correspondiente. En esta página se muestra la información de la tarea y sus etiquetas asociadas. Se pueden agregar etiquetas con el botón ```+```, luego de ingresar el nombre de la nueva etiqueta en el campo correspondiente. También se puede editar la tarea haciendo clic en el botón ```Editar```, el cual dirige a una sección donde se puede editar el título, la fecha límite y el comentario de la tarea. También se pueden eliminar las etiquetas haciendo clic en el botón ```x``` que aparece junto a cada una de ellas. Además, se puede eliminar la tarea haciendo clic en el botón ```Eliminar Tarea```.

```Notificaciones:``` En esta sección, los usuarios pueden ver las notificaciones relacionadas con todos los proyectos. Esto incluye notificaciones de invitación a proyectos compartidos. Los usuarios tienen la opción de aceptar o rechazar estas invitaciones. Además, si un usuario tiene un usuario tiene una tarea próxima a su fecha límite, se le notificará en esta sección con un recordatorio.

```Editar Perfil:``` La página Editar Perfil ofrece un formulario donde los usuarios pueden modificar la información de su perfil según sea necesario. Se deben ingresar sólo los datos que se desean modificar y la contraseña actual, es decir, si se desea cambiar el nombre de usuario, se debe ingresar el nuevo nombre de usuario, la contraseña actual y dejar el campo de mail vacío. 

```Cerrar Sesión:``` Este botón permite a los usuarios cerrar sesión en su cuenta. Una vez que se cierra la sesión, se redirige a la página de Inicio con la barra de navegación original.

```Admin:``` Si un usuario inicia sesión como administrador utilizando las credenciales apropiadas, se le mostrarán cuatro columnas que contienen información sobre todos los usuarios, proyectos, tareas y notificaciones creadas por todos los usuarios. Se brinda la opción de eliminar elementos en cada categoría según sea necesario.


### Uso de Linter

Para poder utilizar la herramienta de linting (ESLint) en el proyecto, se debe ejecutar el comando ```yarn run lint``` en la terminal. Esto permite revisar el código y encontrar errores de sintaxis, así como también errores de estilo.