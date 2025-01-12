pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

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
            when { changeset "app-blog/*" } // Remplacé server/* par app-blog/*
            steps {
                dir('app-blog') { // Mise à jour du chemin
                    script {
                        dockerImageAppBlog = docker.build("${IMAGE_NAME_APP_BLOG}") // Utilise IMAGE_NAME_APP_BLOG
                    }
                }
            }
        }

        stage('Build Client Image') {
            when { changeset "client/*" }
            steps {
                dir('client') {
                    script {
                        dockerImageClient = docker.build("${IMAGE_NAME_CLIENT}")
                    }
                }
            }
        }

        stage('Scan App-Blog Image') { // Mise à jour du nom du stage
            when { changeset "app-blog/*" } // Remplacé server/* par app-blog/*
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                    -e TRIVY_DB_REPO=ghcr.io/aquasecurity/trivy-db \\
                    aquasec/trivy:latest image --exit-code 0 --severity LOW,MEDIUM,HIGH,CRITICAL \\
                    ${IMAGE_NAME_APP_BLOG} // Utilise IMAGE_NAME_APP_BLOG
                    """
                }
            }
        }

        stage('Scan Client Image') {
            when { changeset "client/*" }
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                    -e TRIVY_DB_REPO=ghcr.io/aquasecurity/trivy-db \\
                    aquasec/trivy:latest image --exit-code 0 --severity LOW,MEDIUM,HIGH,CRITICAL \\
                    ${IMAGE_NAME_CLIENT}
                    """
                }
            }
        }

        stage('Push App-Blog Image to Docker Hub') { // Mise à jour du nom du stage
            when { changeset "app-blog/*" } // Remplacé server/* par app-blog/*
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        dockerImageAppBlog.push() // Utilise dockerImageAppBlog
                    }
                }
            }
        }

        stage('Push Client Image to Docker Hub') {
            when { changeset "client/*" }
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
