pipeline {
    agent any

    stages {
        stage ('Build') {
            steps {
                echo 'building the application'
            }
        }
        stage ('test') {
            steps {
                echo 'testing app'
            }
        }
        stage ('deploy') {
            steps {
                echo 'deploying app'
            }
        }
    }
}