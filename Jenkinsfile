#!/usr/bin/env groovy

pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/dani-alvarado/playwright-ts.git'
        NODE_COMMAND = 'npm install'
    }

    parameters {
        choice(name: 'TEST_SCRIPT', choices: ['test', 'test:api', 'test:chromium', 'test:firefox', 'test:webkit', 'test:headed', 'test:chromium:headed', 'test:firefox:headed', 'test:webkit:headed'], description: 'Select the test script to run')
    }

    stages {
        stage('Setup') {
            steps {
                echo '=== Setting up environment ==='
                sh 'export PATH=/usr/local/bin:/usr/bin:/usr/sbin:/sbin'
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: "${env.GIT_REPO}"]]])
                sh 'npx playwright install'
                sh "${env.NODE_COMMAND}"
            }
        }

        stage('Execution') {
            steps {
                echo "=== Running ${params.TEST_SCRIPT} ==="
                sh 'export PATH=/usr/local/bin:/usr/bin:/usr/sbin:/sbin'
                sh "npm run ${params.TEST_SCRIPT}"
            }
        }

        stage('Reporting') {
            steps {
                echo '=== Generating and displaying report ==='
                // Adjust this stage based on your Playwright test report format and location
                // For example, if your Playwright tests generate an HTML report, you might use:
                publishHTML(target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'playwright-report/', reportFiles: 'index.html'])
            }
        }
    }

    post {
        always {
            // Cleanup steps can be added here if needed
        }
    }
}
