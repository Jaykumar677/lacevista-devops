pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('SONAR_TOKEN')
    SNYK_TOKEN = credentials('SNYK_TOKEN')
    DOCKER_IMAGE = "jaykumar677/task8.2hd-lacevista"
  }

  stages {
    stage('Build') {
      steps {
        echo '🔧 Building Docker image...'
        bat 'docker build -t %DOCKER_IMAGE% .'
      }
    }

    stage('Test') {
  steps {
    echo '🧪 Starting the app and running Cypress tests...'

    // Start the app in background
    bat 'start /B node app.js'

    // Wait for the app to be ready
    bat 'ping -n 10 127.0.0.1 > nul'

    // Install dependencies and run Cypress tests
    bat 'npm install'
    bat 'npx cypress run --browser chrome --headless'
  }
}


    stage('Code Quality') {
      steps {
        echo '🔍 Running SonarCloud analysis...'
        withSonarQubeEnv('SonarQubeServer') {
          bat 'sonar-scanner'
        }
      }
    }

    stage('Security') {
      steps {
        echo '🔐 Running Snyk security scan...'
        bat 'npx snyk test || echo "Snyk scan completed (non-blocking)"'
      }
    }

    stage('Deploy to Test') {
      steps {
        echo '🚀 Deploying to test environment...'
        bat 'docker-compose -f docker-compose.yml up -d'
      }
    }

    stage('Release to Prod') {
      steps {
        echo '📦 Releasing tagged version...'
        bat 'git tag task8.2hd-v1.0.%BUILD_NUMBER%'
        bat 'git push origin task8.2hd-v1.0.%BUILD_NUMBER%'
      }
    }

    stage('Monitoring & Alerting') {
      steps {
        echo '📈 Simulating Datadog alert...'
        bat 'curl -X POST https://api.datadoghq.com/api/v1/events -H "DD-API-KEY: %DATADOG_API_KEY%" -H "Content-Type: application/json" -d @datadog_event.json || echo done'
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline task7.3hd-lacevista completed.'
    }
  }
}
