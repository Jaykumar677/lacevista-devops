pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('SONAR_TOKEN_7_3HD')  // Optional: if used directly
    SNYK_TOKEN = credentials('SNYK_TOKEN')
    DOCKER_IMAGE = "jaykumar677/task7.3hd-lacevista"
  }

  stages {
    stage('Build') {
      steps {
        echo '🔧 Building Docker image...'
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Test') {
      steps {
        echo '🧪 Running Cypress tests...'
        sh 'npm install'
        sh 'npx cypress run --browser chrome --headless'
      }
    }

    stage('Code Quality') {
      steps {
        echo '🔍 Running SonarCloud analysis...'
        withSonarQubeEnv(credentialsId: 'SONAR_TOKEN_7_3HD', installationName: 'SonarQubeServer') {
          sh 'sonar-scanner'
        }
      }
    }

    stage('Security') {
      steps {
        echo '🔐 Running Snyk security scan...'
        sh 'npx snyk test || echo "Snyk scan completed (non-blocking)"'
      }
    }

    stage('Deploy to Test') {
      steps {
        echo '🚀 Deploying to test environment...'
        sh 'docker-compose -f docker-compose.yml up -d'
      }
    }

    stage('Release to Prod') {
      steps {
        echo '📦 Releasing tagged version...'
        sh 'git tag task7.3hd-v1.0.$BUILD_NUMBER'
        sh 'git push origin task7.3hd-v1.0.$BUILD_NUMBER'
      }
    }

    stage('Monitoring & Alerting') {
      steps {
        echo '📈 Simulating Datadog alert...'
        sh 'curl -X POST https://api.datadoghq.com/api/v1/events -H "DD-API-KEY: $DATADOG_API_KEY" -H "Content-Type: application/json" -d @datadog_event.json || true'
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline task7.3hd-lacevista completed.'
    }
  }
}
