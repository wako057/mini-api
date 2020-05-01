
@Library('jenkins-pipeline-libs') _
def common = new net.wako057.Common()
def git = new net.wako057.Git()
def APP_NAME = 'mini-api'
def APP_COMMIT

node {

  docker.withRegistry("http://nexus.wako057.net:18442", 'cc1aa518-b1d0-466e-a4e7-c536fb0f1563') {
    wrap([$class: 'AnsiColorBuildWrapper']) {
      // Define docker image for slave
      def slave = docker.image('nexus.wako057.net:18442/mini-api:1.0')

      stage('Checkout code') {
        checkout scm
      }

      stage('Checkout Slave') {
        slave.pull()
      }

      slave.inside {
        stage('Init vars') {

          echo("[Init vars][BUILD_TYPE]: ${params.BUILD_TYPE}")
          echo("[Init vars][MAJOR_VERSION]: ${params.MAJOR_VERSION}")
          echo("[Init vars][MINOR_VERSION]: ${params.MINOR_VERSION}")
          echo("[Init vars][PATCH_VERSION]: ${params.PATCH_VERSION}")

          if (params.BUILD_TYPE && params.BUILD_TYPE == 'release') {
            echo("[Init vars]: ${params.BUILD_TYPE}")
            env.BUILD_TYPE = params.BUILD_TYPE
            env.MAJOR_VERSION = params.MAJOR_VERSION
            env.MINOR_VERSION = params.MINOR_VERSION
            env.PATCH_VERSION = params.PATCH_VERSION
          } else {
            echo("[Init vars]: ${params.BUILD_TYPE}")
          }

          APP_COMMIT = git.getCommitHash()
        }

        stage('Install dependencies') {
          sh 'npm install --production'
        }

        stage('Jenkins Artifacts') {
          common.createArtifacts()
        }

        stage('Package app') {
          def options = '--exclude=./docker --exclude=./docker-compose.*'
          echo("Send artifacts to Nexus AVANT le move")
          common.createArchive(APP_NAME, APP_COMMIT, BUILD_ID, options)
          echo("Send artifacts to Nexus APRES le move")
        }

        stage('Send artifacts to Nexus') {
          echo("Send artifacts to Nexus AVANT le move")
         common.moveArchiveInProjet([
           name: APP_NAME,
           commit: APP_COMMIT,
           build_id: BUILD_ID
         ])
          echo("Send artifacts to Nexus APRES le move")

          common.sendToNexus([
                      name: APP_NAME,
                      commit: APP_COMMIT,
                      build_id: BUILD_ID,
                      branch_display: common.getNexusBranchName(env.BRANCH_NAME),
                      repo: common.getNexusRepoLabel(),
                      group: common.getNexusGroup(),
                      nexus: NEXUS_URL,
                      version: common.getBuildVersionName()
          ])
        }

        stage('Clean') {
          deleteDir();
        }
      }
    }
  }
}
