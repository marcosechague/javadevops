# Proyecto Java Devops

## Requisitos

 - Java 8 o superior 
 - Docker compose

## Instrucciones
- Crear un contenedor a partir del docker-compose-devops.yml. El mismo posee el Jenkins con los pipelines del proyecto.
 
> docker-compose -f docker-compose-devops.yml up -d

- Ingresar a la url del navegador a [http://localhost:8181](http://localhost:8181/) con las credenciales *user: javadevops, pass: javadevops*

- Seleccionar el projecto javadevops -> master
- Seleccionar la opción Construir ahora
