#!/bin/bash
# wrapper script for gradle/android
set -eo pipefail

PROGNAME=$(basename $0)
PROGDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$(cd ${PROGDIR}/..; pwd)

XCODEPROJ=$(find ${ROOTDIR}/ios -type d -maxdepth 1 -name '*.xcodeproj')
APPNAME=$(basename "${XCODEPROJ}" .xcodeproj)
PKG_ID=$(cd ${ROOTDIR}/android; ./gradlew -q applicationId)

DATESTR=$(date +%F-%H-%M-%S)
APK_OUTDIR=${ROOTDIR}/android/build/dist/${APPNAME}-${DATESTR}
APK_BUILDLOG=${APK_OUTDIR}/build.log
APK_RELEASE=${ROOTDIR}/android/app/build/outputs/apk/app-release.apk

clean() {
  cd ${ROOTDIR}/android
  ./gradlew clean
}

info() {
  cd ${ROOTDIR}/android
  ./gradlew -q info
}

assemble-release() {
  cd ${ROOTDIR}/android
  ./gradlew assembleRelease
}

build() {
  assemble-release
}

install-release() {
  cd ${ROOTDIR}/android
  ./gradlew installRelease
}

copy-to-apk-outdir() {
  mkdir -p ${APK_OUTDIR}
  cp ${APK_RELEASE} ${APK_OUTDIR}/
}

install() {
  assemble-release
  # install-release  # not in sync with code-push bundle file, and code-push asked to install update even thought there is no changes
  adb install -r ${APK_RELEASE}
}

uninstall() {
  set +e
  adb uninstall ${PKG_ID}
  set -e
}

force-install() {
  uninstall
  assemble-release
  # install-release
  adb install -r ${APK_RELEASE}
}

apk() {
  mkdir -p ${APK_OUTDIR}
  cd ${ROOTDIR}/android
  info 2>&1 | tee -a ${APK_BUILDLOG}
  clean 2>&1 | tee -a ${APK_BUILDLOG}
  assemble-release 2>&1 | tee -a ${APK_BUILDLOG}
  copy-to-apk-outdir 2>&1 | tee -a ${APK_BUILDLOG}
  open ${APK_OUTDIR}
}

set -x
# execute function
$1
