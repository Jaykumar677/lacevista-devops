pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('SONAR_TOKEN_DevOps')
    SNYK_TOKEN = credentials('SNYK_TOKEN')
  }

  stages {

    stage('Build') {
      steps {
        echo '🔨 Building Docker image...'
        bat '''
          set DOCKER_BUILDKIT=0
          docker build --no-cache -t lacevista .
        '''
      }
    }

    stage('Test') {
      steps {
        echo '🧪 Running Mocha Tests...'
        bat 'npm install'
        bat 'npm test'
      }
    }

    stage('Code Quality') {
      steps {
        echo '📏 Running SonarCloud Scanner in Docker...'
        bat """
          docker run --rm -e SONAR_TOKEN=%SONAR_TOKEN% ^
            -v "%cd%:/usr/src" ^
            sonarsource/sonar-scanner-cli ^
            -Dsonar.projectKey=lacevista ^
            -Dsonar.organization=jaykumar677 ^
            -Dsonar.sources=. ^
            -Dsonar.host.url=https://sonarcloud.io ^
            -Dsonar.login=%SONAR_TOKEN%
        """
      }
    }

    stage('Security') {
      steps {
        echo '🛡️ Running Snyk Security Scan...'
        bat '"C:\\Users\\jaima\\AppData\\Roaming\\npm\\snyk.cmd" auth %SNYK_TOKEN%'
        bat '"C:\\Users\\jaima\\AppData\\Roaming\\npm\\snyk.cmd" test || exit 0'
      }
    }

    stage('Deploy') {
      steps {
        echo '🚀 Deploying to test environment using Docker Compose...'
        bat 'docker-compose up -d'
      }
    }

    stage('Release') {
      steps {
        echo '🏷️ Tagging release version...'
        bat 'git config user.email "jai.jk739@gmail.com"'
        bat 'git config user.name "JayKumar677"'
        bat 'git tag -a v1.0.%BUILD_NUMBER% -m "Release v1.0.%BUILD_NUMBER%"'

        script {
          withCredentials([string(credentialsId: 'release-lacevista', variable: 'TOKEN')]) {
            def remoteUrl = "https://${TOKEN}@github.com/Jaykumar677/lacevista-devops.git"
            bat "git remote set-url origin ${remoteUrl}"
            timeout(time: 2, unit: 'MINUTES') {
              bat "git push origin --tags"
            }
          }
        }
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
