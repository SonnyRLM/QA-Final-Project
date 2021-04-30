pipeline {
    agent any
    stages {
        stage('Build and Test') {
            agent {
                label 'testvm'
            }

            stages {

                stage('Clean Workspace') {
                    steps {
                        cleanWs()
                    }

//                stage("Clone Repo") {
//                    steps {
//                        git branch: 'frontend-backend', url: 'https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App/'
//                    }
//                }

                    stage('Code Checkout') {
                        steps {
                            checkout([
                                    $class           : 'GitSCM',
                                    branches         : [[name: '*/frontend-backend']],
                                    userRemoteConfigs: [[url: 'https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App/']]
                            ])
                        }
                    }

                    stage('Run Backend Tests and Export Coverage') {
                        parallel {
                            stage("CreateTicket Test") {
                                steps {
                                    dir('backend/CreateTicket') {
                                        sh 'mvn test'
                                    }
                                }
                            }

                            stage("ReadTicket Test") {
                                steps {
                                    dir('backend/ReadTicket') {
                                        sh 'mvn test'
                                    }
                                }
                            }

                            stage("UpdateTicket Test") {
                                steps {
                                    dir('backend/UpdateTicket') {
                                        sh 'mvn test'
                                    }
                                }
                            }

                            stage("DeleteTicket Test") {
                                steps {
                                    dir('backend/DeleteTicket') {
                                        sh 'mvn test'
                                    }
                                }
                            }
                        }
                    }
                }

//            post {
//                // Clean after build
//                always {
//                    cleanWs()
//                }
////                success {
////                    stash name: "artifacts", includes: "artifacts/**/*"
////                }
//            }
            }
        }
    }