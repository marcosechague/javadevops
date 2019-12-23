#### CONSTRUCCION MVN PACKAGE (JAR) ####
FROM maven:3.6-jdk-8-alpine AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn -B -e -C -T 1C org.apache.maven.plugins:maven-dependency-plugin:3.0.2:go-offline

COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true


####### JAR PARA USAR EN EL CONTAINER ##############
FROM openjdk:8-jdk-alpine
LABEL maintainer="marcosechague@gmail.com"
WORKDIR /workspace

ENV url_apipersona=""
ENV port_apipersona="8080"
ENV host="mysql_server"
ENV port="3306"
ENV database="demobd"
ENV username="root"
ENV password="toor"

COPY --from=builder /app/target/api-preferencia.jar app.jar

ENTRYPOINT exec java -jar /workspace/app.jar

EXPOSE 8090
