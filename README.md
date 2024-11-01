# Proyecto de Backend - Sistema de Biblioteca

Este proyecto es el backend de una plataforma de biblioteca que permite a los usuarios registrarse, reservar libros y gestionar su perfil. El sistema incluye autenticación, CRUD para usuarios y libros, soft deletes, historial de reservas y filtros de búsqueda.

## Características

- **Registro y Autenticación**: Permite que los usuarios se registren e inicien sesión. Algunos endpoints están protegidos mediante autenticación.
- **Gestión de Usuarios**: CRUD completo para los usuarios registrados en la biblioteca.
  - Un usuario puede modificar su propio perfil.
  - Los usuarios con permisos especiales pueden modificar o desactivar otros usuarios.
  - Soft delete para usuarios.
- **Gestión de Libros**: CRUD completo para gestionar los libros disponibles en la biblioteca.
- **Historial de Reservas**: Mantiene un registro de reservas de libros por parte de los usuarios.
- **Filtros de Búsqueda**: Permite realizar búsquedas avanzadas de libros según diferentes criterios.
- **Control de Permisos**: Los usuarios con permisos específicos pueden realizar acciones avanzadas, como modificar o eliminar otros usuarios.

## Estructura del Proyecto

- `controllers/`: Contiene los controladores de usuarios y libros, donde se definen las acciones CRUD y lógica.
- `models/`: Define los modelos de la base de datos, como `User` y `Book`.
- `middlewares/`: Incluye el middleware de autenticación y de permisos.
  - `authMiddleware.ts`: Verifica que el usuario esté autenticado.
  - `permissionMiddleware.ts`: Verifica que el usuario tenga permisos para editar otros perfiles.
- `services/`: Define las acciones de negocio que interactúan con la base de datos, como `getUserById`, `updateUserById` y `deactivateUserById`.
- `routes/`: Define las rutas principales del sistema, con protección para las operaciones CRUD y permisos para las acciones avanzadas.

## Rutas Principales

### Usuarios
- `PUT /update/:userId?`: Actualiza un usuario específico. Si no se proporciona `userId`, se actualiza el usuario logueado.
- `DELETE /deactivate/:userId?`: Desactiva un usuario específico. Si no se proporciona `userId`, se desactiva el usuario logueado.

## Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AntonyJDC/proyectobackend.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto.
4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   
## Middleware de Permisos

El proyecto incluye un middleware de permisos que verifica si un usuario tiene autorización para realizar modificaciones en otros usuarios. Si el `userId` en la URL coincide con el del token del usuario autenticado o si el usuario tiene permisos, se le permite realizar la acción solicitada.

## Requisitos Técnicos

- **Node.js**: Versión 14 o superior.
- **Express**: Para la configuración de rutas y middleware.
- **MongoDB**: Base de datos para el almacenamiento de usuarios, libros y reservas.
- **JWT**: Autenticación mediante JSON Web Tokens.
