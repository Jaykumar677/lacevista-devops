pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('SONAR_TOKEN_DevOps')      // Add this in Jenkins credentials
    SNYK_TOKEN = credentials('SNYK_TOKEN')        // Add this in Jenkins credentials
  }

  stages {

    stage('Build') {
      steps {
        echo '🔨 Building Docker image...'
        sh 'docker build -t lacevista .'
      }
    }

    stage('Test') {
      steps {
        echo '🧪 Running Mocha Tests...'
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('Code Quality') {
      steps {
        echo '📏 Running SonarCloud Scanner...'
        sh '''
          sonar-scanner \
            -Dsonar.projectKey=lacevista \
            -Dsonar.organization=your_org \
            -Dsonar.host.url=https://sonarcloud.io \
            -Dsonar.login=$SONAR_TOKEN
        '''
      }
    }

    stage('Security') {
      steps {
        echo '🛡️ Running Snyk Security Scan...'
        sh 'snyk auth $SNYK_TOKEN'
        sh 'snyk test || true'
      }
    }

    stage('Deploy') {
      steps {
        echo '🚀 Deploying to test environment using Docker Compose...'
        sh 'docker-compose up -d'
      }
    }

    stage('Release') {
      steps {
        echo '🏷️ Tagging release version...'
        sh 'git config user.email "you@example.com"'
        sh 'git config user.name "Your Name"'
        sh 'git tag -a v1.0.${BUILD_NUMBER} -m "Release v1.0.${BUILD_NUMBER}"'
        sh 'git push origin v1.0.${BUILD_NUMBER}'
      }
    }

    stage('Monitoring') {
      steps {
        echo '📈 Monitoring is handled via Datadog Agent (already integrated in docker-compose).'
      }
    }

  }

  post {
    success {
      echo '✅ Pipeline completed successfully!'
    }
    failure {
      echo '❌ Pipeline failed!'
    }
  }
}
