REQUISITOS

* Tener instalado NodeJS versión >= 14.
* Ejecutar comandos:
```
npm install
node app.js
```
* Ingresar en un explorador a URL http://localhost:8001
* Para iniciar sesión utilizar las siguientes credenciales:
    * Correo:     admin@admin.cl
    * Contraseña: admin
* El PMV Desarrollado permite actualmente:
    * Solicitar inscripción de socio desde el login haciendo click en palabra "Solicitar inscripción".
    * Iniciar sesión como Administrador.
    * Revisar inscripciones (pendientes, aceptadas y rechazadas).
    * Revisar documentación legal de inscripciones.
    * Aceptar o rechazar solicitud según sea el caso.

INFORMACIÓN

* Aplicación web desarrollada en entorno de ejecución NodeJS bajo Framework Express.
* Patrón de arquitectura MVC implementado en el código en directorio /src/app.
* Estructura principal del framework se encuentre dentro de /src.

# Version 1.0.1
* Vistas:
    * Reservas
* API:
    * Login app móvil
    * Registro de reserva y validaciones correspondientes

# Version 1.0.0
* Vistas:
    * Login
    * Solicitar inscripción
    * Listado de inscripciones y operaciones CRUD.