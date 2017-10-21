#!/bin/bash
# code-push wrapper
set -eo pipefail

PROGNAME=$(basename $0)
PROGDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$(cd ${PROGDIR}/..; pwd)

XCODEPROJ=$(find ${ROOTDIR}/ios -type d -maxdepth 1 -name '*.xcodeproj')
APPNAME=$(basename "${XCODEPROJ}" .xcodeproj)

# Use "APPNAME-<iOS|Android>" convension for code-push app name
IOS_APPNAME=${APPNAME}-iOS
ANDROID_APPNAME=${APPNAME}-Android
PACKAGE_JSON=${ROOTDIR}/package.json
VERSION=$(jq -r ".version" ${PACKAGE_JSON})

ls-deployment-ios() {
  code-push deployment ls ${IOS_APPNAME}
}

ls-deployment-ios-in-json() {
  code-push deployment ls ${IOS_APPNAME} --format json
}

ls-deployment-ios-with-key() {
  code-push deployment ls ${IOS_APPNAME} -k
}

ls-deployment-android() {
  code-push deployment ls ${ANDROID_APPNAME}
}

ls-deployment-android-in-json() {
  code-push deployment ls ${ANDROID_APPNAME} --format json
}

ls-deployment-android-with-key() {
  code-push deployment ls ${ANDROID_APPNAME} -k
}

production-deployment-history-ios() {
  code-push deployment history ${IOS_APPNAME} Production
}

staging-deployment-history-ios() {
  code-push deployment history ${IOS_APPNAME} Staging
}

production-deployment-history-android() {
  code-push deployment history ${ANDROID_APPNAME} Production
}

staging-deployment-history-android() {
  code-push deployment history ${ANDROID_APPNAME} Staging
}

ls-deployment() {
  ls-deployment-ios
  ls-deployment-android
}

prod-deploy-history() {
  production-deployment-history-ios
  production-deployment-history-android
}

stag-deploy-history() {
  staging-deployment-history-ios
  staging-deployment-history-android
}

release-ios() {
  # can exit with error if bundle already uploaded
  set +e
  code-push release-react ${IOS_APPNAME} ios -d Production -t ${VERSION}
  set -e
}

release-android() {
  set +e
  code-push release-react ${ANDROID_APPNAME} android -d Production -t ${VERSION}
  set -e
}

stage-ios() {
  set +e
  code-push release-react ${IOS_APPNAME} ios -d Staging -t ${VERSION}
  set -e
}

stage-android() {
  set +e
  code-push release-react ${ANDROID_APPNAME} android -d Staging -t ${VERSION}
  set -e
}

release() {
  ${PROGDIR}/set-deployment-key.sh Production
  release-ios
  release-android
}

stage() {
  ${PROGDIR}/set-deployment-key.sh Staging
  stage-ios
  stage-android
}

cd ${ROOTDIR}
set -x
# execute function
$1
