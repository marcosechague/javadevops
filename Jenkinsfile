#!groovy

pipeline {

    agent any

   environment {
    
        NETWORK_AUX = "javadevops_master_default"
        CONTAINER_NAME = "api-persona-exam"
        HOST_APP = "http://${CONTAINER_NAME}:8080"
        APP_HEALTHCHECK = "${HOST_APP}/status/verificar"
        HOST_PRODUCTION = "172.26.0.3"
        PATH_DEPLOY_PRODUCTION = "/opt/tomcat/webapps/"
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

                                    docker.image('marcosechague/jdk8-mvn-docker-compose').inside('-v "/var/run/docker.sock:/var/run/docker.sock"') {
                                        sh "docker-compose up -d --build"
                                        sh "docker network ls"
                                    }

                                    docker.image('marcosechague/jdk8-mvn-docker-compose').inside('--network="${NETWORK_AUX}" -v "/var/run/docker.sock:/var/run/docker.sock"') {
                                        //sh "docker-compose up -d --build"
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

                                        sh "mvn -Dmaven.repo.local=/home/.m2/repository -f integration/pom.xml --batch-mode test -Dbackend=${HOST_APP}"

                                        echo "### Integration TEST FINISHED ###"

                                        sh "docker-compose down -v"
                                    }
                            }catch(err){
                                echo "Error traing to execute the integration test : ${err}"
                                try{
                                    
                                    docker.image('marcosechague/jdk8-mvn-docker-compose').inside('--network="${NETWORK_AUX}"  -v "/var/run/docker.sock:/var/run/docker.sock"') {
                                        sh "docker-compose down -v"
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
                                        sh "echo 'Error en la conexion'"
                                        return false
                                    }
                                }
                            }

	                   docker.image('marcosechague/jdk8-mvn-docker-compose').inside('--network="${NETWORK_AUX}" -v "/var/run/docker.sock:/var/run/docker.sock"') {
                                    sh "docker-compose ps"
                                    sh "docker-compose logs -f api-persona mysql_server"
                            }
                        }
                    }
                )
            }
        }


        /*stage('Deploy'){
            steps{
                withCredentials([sshUserPrivateKey(credentialsSSH: "productionSSHv2", keyFileVariable: 'keyfile')]) {
                    sh "scp -i ${keyfile} api-persona/target/api-persona.war root@:${HOST_PRODUCTION}${PATH_DEPLOY_PRODUCTION}}"
                }
            }
        }*/

        /*stage ('Deploy') {
            steps{
                sshagent(credentials : ['productionSSHv2']) {
                    sh 'ssh -o StrictHostKeyChecking=no root@tomcat uptime'
                    sh 'ssh -v root@tomcat'
                    sh 'scp api-persona/target/api-persona.war root@:${HOST_PRODUCTION}${PATH_DEPLOY_PRODUCTION}}'
                }
            }
        }*/
    }
}
