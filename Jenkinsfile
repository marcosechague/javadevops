#!groovy

pipeline {

    agent any

   environment {
        SONAR_HOST = 'http://172.18.0.1:9000'
        NETWORK_AUX = "javadevops_net"
        CONTAINER_NAME = "api-persona"
        HOST_APP = "http://${CONTAINER_NAME}:9000"
        APP_HEALTHCHECK = "${HOST_APP}/status/verificar"
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
                parallel(
                    test: {
                        script {
                            try{
                                echo "### creating environment with docker-compose ###"
                                dir("aplicativo"){
                                    docker.image('wjma90/mvn3-jdk8-curso-devops').inside('--network="${NETWORK_AUX}" -v "/var/run/docker.sock:/var/run/docker.sock"') {
                                        sh "docker-compose up -d --build"
                                        sh "docker network connect ${NETWORK_AUX} ${CONTAINER_NAME}"
                                        
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

                                        sh "mvn -Dmaven.repo.local=/home/.m2/repository -f ../	integration/pom.xml --batch-mode test -Dbackend=${HOST_APP}"

                                        echo "### Integration TEST FINISHED ###"

                                        sh "docker-compose down -v"
                                    }
                                }
                            }catch(err){
                                echo "Error: ${err}" 
                                try{
                                    dir("aplicativo"){
                                        docker.image('wjma90/mvn3-jdk8-curso-devops').inside('--network="${NETWORK_AUX}"  -v "/var/run/docker.sock:/var/run/docker.sock"') {
                                            sh "docker-compose down -v"
                                        }
                                    }
                                }catch(err2){
                                    echo "Error2: ${err2}" 
                                }

                                error "Integration TEST with ERROR... Please verify"
                            }
                        }
                    },
                    logs : {
                        script {
                            //waiting for the application
                            timeout(time: 330, unit: 'SECONDS') {
                                waitUntil {
                                    try {
                                        sh "curl -s --head  --request GET  ${APP_HEALTHCHECK} | grep '200'"
                                        return true
                                    } catch (Exception e) {
                                        return false
                                    }
                                }
                            }

                            dir("aplicativo"){
                                docker.image('wjma90/mvn3-jdk8-curso-devops').inside('--network="${NETWORK_AUX}" -e "ARTIFACTORY_CREDENTIALS_USR=${ARTIFACTORY_USR}" -e "ARTIFACTORY_CREDENTIALS_PSW=${ARTIFACTORY_PSW}" -e "ARTIFACTORY_REPOSITORY=${ARTIFACTORY_REPOSITORY}" -v "/var/run/docker.sock:/var/run/docker.sock"') {
                                    sh "docker-compose ps"
                                    sh "docker-compose logs -f ${CONTAINER_NAME} mysql_server"
                                }
                            }
                        }
                    }
                )
            }
        }
    }
}
