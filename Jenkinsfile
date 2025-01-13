pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        IMAGE_NAME_APP_BLOG = 'asmabh/mern-server' // Remplacé server par app-blog
        IMAGE_NAME_CLIENT = 'asmabh/mern-client'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:asmabouhamed/appmern.git',
                    credentialsId: 'git'
            }
        }

        stage('Build App-Blog Image') { // Mise à jour du nom du stage
            steps {
                dir('app-blog') { // Mise à jour du chemin
                    script {
                        dockerImageAppBlog = docker.build("${IMAGE_NAME_APP_BLOG}") // Utilise IMAGE_NAME_APP_BLOG
                    }
                }
            }
        }

        stage('Build Client Image') {
            steps {
                dir('client') {
                    script {
                        dockerImageClient = docker.build("${IMAGE_NAME_CLIENT}")
                    }
                }
            }
        }

        

        
        }

        stage('Push App-Blog Image to Docker Hub') { // Mise à jour du nom du stage
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        dockerImageAppBlog.push() // Utilise dockerImageAppBlog
                    }
                }
            }
        }

        stage('Push Client Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        dockerImageClient.push()
                    }
                }
            }
        }        

    }
    post {
        always {
            script {
                echo 'Cleanup phase!'
                if (sh(script: "docker images -q aquasec/trivy", returnStdout: true).trim()) {
                    sh 'docker rmi aquasec/trivy'               
                }
                if (sh(script: "docker images -q ${IMAGE_NAME_APP_BLOG}", returnStdout: true).trim()) { // Utilise IMAGE_NAME_APP_BLOG
                    sh "docker rmi ${IMAGE_NAME_APP_BLOG}"
                }
                if (sh(script: "docker images -q ${IMAGE_NAME_CLIENT}", returnStdout: true).trim()) {
                    sh "docker rmi ${IMAGE_NAME_CLIENT}"
                }
                echo 'Cleanup Successfully done!'
            } 
        }
    }
}
