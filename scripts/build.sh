#!/bin/bash
set -eo pipefail

PROGNAME=$(basename $0)
PROGDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$(cd ${PROGDIR}/..; pwd)

XCODEPROJ=$(find ${ROOTDIR}/ios -type d -maxdepth 1 -name '*.xcodeproj')
APPNAME=$(basename "${XCODEPROJ}" .xcodeproj)

PACKAGE_JSON=${ROOTDIR}/package.json

use-prod-deployment-key(){
  ${PROGDIR}/set-deployment-key.sh Production
}

use-stage-deployment-key(){
  ${PROGDIR}/set-deployment-key.sh Staging
}

build-ios() {
  ${PROGDIR}/xcodebuild.sh ipa
}

build-android() {
  ${PROGDIR}/gradlebuild.sh apk
}

bump-patch-version() {
  ${PROGDIR}/version.sh bump patch
}

git-commit-version-files() {
  local branch=$(cd ${ROOTDIR} && git branch | sed -n '/\* /s///p')
  # only tag and commit if master branch
  if [[ ${branch} == "master" ]]; then
    local version=$(jq -r ".version" ${PACKAGE_JSON})
    cd ${ROOTDIR}
    git status --short --branch
    git add ios/${APPNAME}*/Info.plist
    git add ios/${APPNAME}.xcodeproj/project.pbxproj
    git add package.json
    git diff --word-diff=color --staged
    git commit -m "${version} - update by build script"
    git tag ${version}
    git push -u origin master
    git push origin ${version}
  fi
}

code-push-stage() {
  ${PROGDIR}/code-push.sh stage
}

code-push-release() {
  ${PROGDIR}/code-push.sh release
}

# Only use prod deployment key for this project
# Make sure to use correct deployment key for different build
# if [[ $1 == 'release' ]]; then
#   use-prod-deployment-key
# else
#   use-stage-deployment-key
# fi

if [[ $# -eq 0 ]]; then
  bump-patch-version
  build-android
  build-ios
elif [[ $1 == 'release' ]]; then
  git-commit-version-files
  code-push-release
fi
