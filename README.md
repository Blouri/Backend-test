# Backend-test

## API GraphQL + Apollo-server + Prisma

La API proporciona un conjunto de servicios para gestionar usuarios, países, roles y monitoreo de actividades. Permite realizar consultas y obtener información.

## Paso a paso

 1. Creación del Proyecto y Configuración Inicial

- Inicialización del proyecto con Apollo Server, GraphQL, Prisma y otras dependencias de desarrollo como Nodemon.
  
2. Configuración de Prisma y Base de Datos

- Configuración de Prisma a través de `prisma.schema` y el archivo `.env` para establecer la conexión con la base de datos PostgreSQL.
  
3. Introspección de la Base de Datos

- Ejecución de `prisma db pull` para realizar la introspección de la base de datos y generar el esquema de Prisma.

4. Creación del Prisma Client

- Utilización de Prisma Client para generar tipos y operaciones en la base de datos.

5. Creación del Archivo Index.ts

- Creación del archivo `index.ts` que incluye la definición de tipos GraphQL, la primera query y la configuración de Apollo Server.
  
 6. Desarrollo Iterativo de Querys y Resolvers

## Decisiones y Justificaciones

En el transcurso de aprendizaje e iteraciones tuve la opotunidad de usar varias librerias de graphql, volviendo al final a original, en algun momento queria pasar mis resolver a archivo tipo typescript pero me parecio mas dificil por no conocer el lenguaje, y la interaccion entre archivos, resolvers.ts, server.ts, schema.graphql, etc, a la hora de coordinar las exportaciones e importaciones, cuando tenia errores me era mas dificil debuguear asi separado por eso la decision de unirlos.


### Pasos para Ejecutar

1. Clona el repositorio: `git clone <URL_DEL_REPOSITORIO>`
2. Ingresa al directorio del proyecto: `cd <NOMBRE_DEL_DIRECTORIO>`
3. Instala las dependencias: `npm install`
4. Agregar el archivo .env y agregar la ruta de la base de datos
5. Genera el Prisma client 'prisma generate'


## Proximos pasos

1-Debug las dos ultimas querys
2-programar la logica de autenticacion usando la tabla Session en caso tal de requerir un nivel superior de seguridad se podria implementar Passport.js y JWT
3-crear un flujo de pruebas unitarias podria ser con jest o crear un entorno de pruebas End 2 End con Cypress
4-por ultimo seria revisar en que plataforma se piensa hacer deploy de produccion, comparar compatibilidad de version y librerias
5-revisar el compilado de ts a js
6-contenerizar con Docker y configurar para lanzamiento

