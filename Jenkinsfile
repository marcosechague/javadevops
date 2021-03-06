#!groovy

pipeline {

    agent any

   environment {
    
        NETWORK_AUX = "javadevops_master_default"
        CONTAINER_NAME = "api-persona-exam"
        HOST_APP = "http://${CONTAINER_NAME}:8080"
        APP_HEALTHCHECK = "${HOST_APP}/status/verificar"
        HOST_PRODUCTION = "tomcat_javadevops"
        PATH_DEPLOY_PRODUCTION = ":/usr/local/tomcat/webapps"
    }

    stages {

        stage('Build'){
            steps{
                script {
                    docker.image('maven:3.6-jdk-8-alpine').inside('-v "/home/.m2:/home/.m2"') {
                        sh "mvn -Dmaven.repo.local=/home/.m2/repository -f ${env.WORKSPACE}/api-persona/pom.xml --batch-mode clean package -Dmaven.test.skip=true"
                    }
                }
            }
        }

        stage('Unit Test'){
            steps{
                script {
                    docker.image('maven:3.6-jdk-8-alpine').inside('-v "/home/.m2:/home/.m2"') {
                        sh "mvn -Dmaven.repo.local=/home/.m2/repository -f ${env.WORKSPACE}/api-persona/pom.xml --batch-mode test"
                    }
                }
            }
        }
        

        stage('Integration Test'){
            steps{
                script {
                    try{

                        echo "### creating environment with docker-compose ###"
                        docker.image('marcosechague/jdk8-mvn-docker-compose').inside('-v "/var/run/docker.sock:/var/run/docker.sock"') {
                            sh "docker-compose up -d --build"
                            sh "docker network ls"
                        }
                        
                        docker.image('marcosechague/jdk8-mvn-docker-compose').inside('--network="${NETWORK_AUX}" -v "/var/run/docker.sock:/var/run/docker.sock"') {
                            
                            //sh "docker network connect ${NETWORK_AUX} ${CONTAINER_NAME}"
                            
                            //waiting for the application
                            timeout(time: 300, unit: 'SECONDS') {
                                waitUntil {
                                    try {
                                        sh "curl -s --head  --request GET  ${APP_HEALTHCHECK} | grep '200'"
                                        return true
                                    } catch (Exception e) {
                                        return false
                                    }
                                }
                            }
                            
                            echo "### HUBO CONEXION CON LA APLICACION ###"
                            
                            sh "mvn -f integration/pom.xml --batch-mode test -Dbackend=${HOST_APP}"
                            
                            echo "### Integration TEST FINISHED ###"
                            
                            //sh "docker-compose down -v"
                        }

                        docker.image('marcosechague/jdk8-mvn-docker-compose').inside('-v "/var/run/docker.sock:/var/run/docker.sock"') {
                            sh "docker-compose down -v"
                        }
                    }catch(err){
                        echo "Error: ${err}"
                        try{
                            docker.image('marcosechague/jdk8-mvn-docker-compose').inside('-v "/var/run/docker.sock:/var/run/docker.sock"') {
                                sh "docker-compose down -v"
                            }
                        }catch(err2){
                            echo "Error2: ${err2}"
                        }

                        error "Integration TEST with ERROR... Please verify"
                    }
                }
            }
        }


        stage('Deploy'){
            steps{
                script{
                    docker.image('marcosechague/jdk8-mvn-docker-compose').inside('-v "/var/run/docker.sock:/var/run/docker.sock"') {
                    sh "docker cp api-persona/target/api-persona.war ${HOST_PRODUCTION}${PATH_DEPLOY_PRODUCTION}"
                }
                }
            }
        }
    }
}
