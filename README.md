# Backend-test

El paso a paso que se siguio para realizar este repo fue el siguiente.
1- crear el proyecto e instalar las librerias iniciales (Apollo server, graphql, prisma) y otra de desarrollo como nodemon
2-se inicializo prisma, y gracias a prisma.schema y al .env se configuro la base de datos de postgress
3- se lanzo un db pull para que prisma hiciera la instrospeccion de la base de datos
4-se creo el Prisma Client el cual use para crear los typos de graphql 
5-se crea el index.ts con todos los tipos, y la primer query y se valida funcionamiento de apollo-server
6-una vez se confirma el funcionamiento de todo se empieza un trabajo iterativo de crear cada una de las querys con sus types y resolvers correspondientes


Para continuar con el trabajo los pasos a seguir serias:

1-Debug las dos ultimas querys
2-programar la logica de autenticacion usando la tabla Session en caso tal de requerir un nivel superior de seguridad se podria implementar Passport.js y JWT
3-crear un flujo de pruebas unitarias podria ser con jest o crear un entorno de pruebas End 2 End con Cypress
4-por ultimo seria revisar en que plataforma se piensa hacer deploy de produccion, comparar compatibilidad de version y librerias
5-revisar el compilado de ts a js
6-contenerizar con Docker y configurar para lanzamiento
