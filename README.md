# Desafío técnico 

## Descripción

En este proyecto podemos gestionar los trámites de alta de dominio automotor y patente de rodado, proporcionando una interfaz fácil de usar y segura. Estas son sus funcionalidades principales:

__Registro de trámite de alta__:

En la pantalla de alta, los usuarios pueden ingresar los detalles del alta, como nombre, apellido, DNI, CUIT, email, teléfono, dominio, año y un archivo PDF de baja de municipio anterior. Se implementan validaciones para garantizar la integridad de los datos ingresados. Una vez completado el trámite, el sistema almacena la información en la base de datos de manera segura.

__Redirección a la pantalla principal__:

Una vez que se completa con éxito el registro de un trámite, el sistema redirige automáticamente al usuario a la pantalla principal. La ruta principal del proyecto varía en función del tipo de usuario:

__Usuario regular__:
Si el usuario recién registrado es un usuario regular, será redirigido a la ruta principal estándar del proyecto donde podrá ver el estado de sus trámites.

__Usuario administrador__:
En caso de que el usuario sea un administrador, la redirección llevará a una ruta principal específica diseñada para gestionar y revisar todos los trámites presentados.

## Instrucciones de instalación.

### Instalación de dependencias del cliente:

Accede al directorio del cliente mediante el comando `cd client`.
Ejecuta `npm install` para instalar las dependencias necesarias. Este comando descargará e instalará todas las bibliotecas y paquetes requeridos para el cliente.

```bash
cd client
npm install
```

Abre otra terminal o regresa al directorio principal del proyecto mediante el comando cd ...
Accede al directorio del servidor con el comando cd server. Ejecuta npm install para instalar las dependencias del servidor. Esto garantizará que todas las bibliotecas esenciales para la parte del servidor estén instaladas.

```bash
cd server
npm install
```

### Uso del proyecto:

1 . Abre una terminal en Visual Studio Code y navega hasta el directorio del cliente usando el comando:

```bash
cd client
```

2 . El proyecto en el frontend fue creado con Vite + React, por lo tanto, para iniciar el servidor del cliente debemos ejecutar el comando:

```bash
npm run dev
```

3 . Abre una segunda terminal en Visual Studio Code y navega hasta el directorio del servidor utilizando el comando:

```bash
cd server
```
4 . Inicia el servidor del backend ejecutando el siguiente comando:

```bash
npm run dev
```

### Acceso a la Ruta del administrador

Para acceder a la ruta del administrador en este proyecto, utiliza las siguientes credenciales:

Email: admin@example.com
Contraseña: administrador

## Endpoints

### `GET /api/`

- **Descripción:** Ruta principal del proyecto.
- **Acción:** Retorna un mensaje indicando que el servidor está en ejecución.

### `GET /api/tramites`

- **Descripción:** Obtiene la lista de todos los trámites almacenados en la base de datos.
- **Acción:** Retorna un JSON con la información de todos los trámites, incluyendo sus atributos como:
  - `id` (Número): ID del trámite.
  - `name` (String): Nombre del chofer.
  - `lastName` (String): Apellido del chofer.
  - `dni` (String): DNI del chofer.
  - `cuit` (String): CUIT del chofer.
  - `email` (String): Email del chofer.
  - `telefono` (String): Teléfono del chofer.
  - `dominio` (String): Dominio del vehículo.
  - `anio` (String): Año del vehículo.
  - `estado` (String): Estado del trámite.

### `POST /api/tramites/tramite`

- **Descripción:** Agrega un nuevo trámite de alta a la base de datos.
- **Parámetros de entrada (en el cuerpo de la solicitud):**
  - `name` (String): Nombre del chofer.
  - `lastName` (String): Apellido del chofer.
  - `dni` (String): DNI del chofer.
  - `cuit` (String): CUIT del chofer (sin guiones).
  - `email` (String): Email del chofer.
  - `telefono` (String): Teléfono del chofer (solo números).
  - `dominio` (String): Dominio del vehículo.
  - `anio` (String): Año del vehículo.
  - `archivo` (File): Archivo PDF de baja de municipio anterior.
- **Acción:**
  - Verifica si los datos ingresados son válidos.
  - Crea un nuevo trámite en la base de datos.
  - Retorna la información del trámite recién creado en formato JSON.

### `PUT /api/tramites/:id`

- **Descripción:** Actualiza un trámite específico.
- **Parámetros de entrada (en el cuerpo de la solicitud):**
  - `id` (Número): ID del trámite a actualizar.
  - `estado` (String): Nuevo estado del trámite (opcional).
- **Acción:**
  - Verifica si el trámite existe.
  - Actualiza la información del trámite.
  - Retorna la información actualizada del trámite en formato JSON.

## Endpoints de Autenticación de Usuarios

### `POST /api/users/registrar`

- **Descripción:** Registra un nuevo usuario en el sistema.
- **Parámetros de entrada (en el cuerpo de la solicitud):**
  - `name` (String): Nombre del usuario.
  - `lastName` (String): Apellido del usuario.
  - `email` (String): Dirección de correo electrónico del usuario.
  - `password` (String): Contraseña del usuario.
- **Acción:**
  - Verifica si el correo electrónico ya está registrado.
  - Crea un nuevo usuario en la base de datos.
  - Retorna un JSON con la información del usuario recién creado, excepto la contraseña.

### `POST /api/users/login`

- **Descripción:** Inicia sesión en el sistema.
- **Parámetros de entrada (en el cuerpo de la solicitud):**
  - `email` (String): Dirección de correo electrónico del usuario.
  - `password` (String): Contraseña del usuario.
- **Acción:**
  - Verifica las credenciales proporcionadas (email y contraseña).
  - Si las credenciales son válidas, genera un token de autenticación JWT.
  - Retorna un JSON con el token de acceso y los datos del usuario autenticado.

### `POST /api/users/logout`

- **Descripción:** Cierra la sesión de un usuario.
- **Acción:**
  - Invalida el token de sesión del usuario.
  - Retorna un mensaje confirmando que el usuario ha cerrado sesión exitosamente.

## Tecnologías y Herramientas Utilizadas

Este proyecto fue desarrollado utilizando una serie de tecnologías modernas tanto en el frontend como en el backend. A continuación, se detallan las principales herramientas empleadas:

### Frontend:

- **React + Vite**
- **Tailwind CSS**
- **JavaScript (ES6+)**

### Backend:

- **Node.js**
- **Express.js**
- **MySQL**
