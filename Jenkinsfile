#!/usr/bin/env groovy

pipeline {
    agent any

    tools {nodejs "nodejs"}

    environment {
        GIT_REPO = 'https://github.com/dani-alvarado/playwright-ts.git'
    }

    parameters {
        choice(name: 'BRANCH', choices: ['main', 'develop'], description: 'Choose the branch you want to execute')
        choice(name: 'TEST_SCRIPT', choices: ['test', 'test:api', 'test:chromium', 'test:firefox', 'test:webkit'], description: 'Select the test script to run')
    }

    stages {
        
        stage('Setup') {
            steps {
                echo '=== Setting up environment ==='
                sh 'export PATH=/usr/local/bin:/usr/bin:/usr/sbin:/sbin'
                checkout([$class: 'GitSCM', branches: [[name: '${BRANCH}']], userRemoteConfigs: [[url: "${env.GIT_REPO}"]]])
                sh 'rm -rf node_modules'
                sh 'rm -rf playwright-report'
                sh 'rm -rf test-results'
                sh 'npm install'
                sh 'npm run install-browsers'
            }
        }

        stage('Execution') {
            steps {
                echo "=== Running ${params.TEST_SCRIPT} ==="
                sh 'export PATH=/usr/local/bin:/usr/bin:/usr/sbin:/sbin'
                sh "npm run ${params.TEST_SCRIPT}"
            }
        }

    }
    post {
        always {
                echo '=== Generating and displaying report ==='
                // Adjust this stage based on your Playwright test report format and location
                // For example, if your Playwright tests generate an HTML report, you might use:
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: '*.html', reportName: 'Report', reportTitles: ''])
        }
    }
}
