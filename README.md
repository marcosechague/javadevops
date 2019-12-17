
# Proyecto Java Devops
## Requisitos

- Java 8 o superior

- Docker compose  

## Instrucciones

- Crear un contenedor a partir del docker-compose-devops.yml. El mismo posee un Jenkins y un servidor tomcat en el que se tendra que hacer el deploy.

> docker-compose -f docker-compose-devops.yml up -d

- Ingresar a la url del navegador a [http://localhost:8181](http://localhost:8181/) installar plugins, y setear credenciales
- Para el deploy, se opta por realizar una copia a un servidor remoto de produccion.  En este caso sera en el docker del tomcat que corre en el puerto local *8282*.  
- 
- Crear una nueva tarea, asignar el nombre jevadevops y seleccionet el tipo Multibranch Pipeline
- En **Diplay name** asignar el nombre javadevops
- En **Branch Sources**  asignar https://github.com/marcosechague/javadevops y agregar credenciales de tu Github.
- En **Build Configuration** Mode by *Jenkinsfile* y Script path *Jenkinsfile*.
- En **Scan Multibranch Pipeline Triggers** seleccionar el checkbox y elegir el intervalo de 1 minuto.
- Seleccionar el projecto javadevops -> Credentias y crear unas credenciales para el servidor de produccion con id **productionSSHv2**.
- Seleccionar el projecto javadevops -> master y Construir ahora. 

- Seleccionar la opción Construir ahora.