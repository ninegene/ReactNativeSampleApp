#!/bin/bash
# wrapper script for xcodebuild
# See: https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/xcodebuild.1.html
set -eo pipefail

PROGNAME=$(basename $0)
PROGDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$(cd ${PROGDIR}/..; pwd)

XCODEPROJ=$(find ${ROOTDIR}/ios -type d -maxdepth 1 -name '*.xcodeproj')
APPNAME=$(basename "${XCODEPROJ}" .xcodeproj)

IOS_APPDIR=${ROOTDIR}/ios
INFO_PLIST=${IOS_APPDIR}/${APPNAME}/Info.plist

SCHEME=${APPNAME}
DATESTR=$(date +%F-%H-%M-%S)
EXPORT_NAME=${APPNAME}-${DATESTR}
ARCHIVE_PATH=${ROOTDIR}/ios/build/dist/${APPNAME}-${DATESTR}.xcarchive
IPA_OUTDIR=${ROOTDIR}/ios/build/dist/${APPNAME}-${DATESTR}
IPA_BUILDLOG=${IPA_OUTDIR}/build.log

EXPORT_OPTIONS_PLIST=${ROOTDIR}/xcodebuild-ExportOptions.plist

TEAM_ID=${XCODE_TEAM_ID}

# Use convension of "MyAppName-Dist" provision profile
# after created appleid, iOS Distribution Profile from apple developer account website
PROVISION_PROFILE_NAME=${APPNAME}-Dist

showsdks() {
  xcodebuild -showsdks
}

list() {
  xcodebuild -list
}

sdk-iphoneos() {
  xcodebuild -showsdks | grep -o '\-sdk iphoneos.*' | grep -o 'iphoneos.*'
}

sdk-iphonesimulator() {
  xcodebuild -showsdks | grep -o '\-sdk iphonesimulator.*' | grep -o 'iphonesimulator.*'
}

xcode-version() {
  xcodebuild -version | head -n 1 | sed -e 's/Xcode //'
}

info() {
  agvtool what-version
  agvtool what-marketing-version
  /usr/libexec/PlistBuddy -c "Print :CFBundleVersion" ${INFO_PLIST}
}

clean-debug() {
  xcodebuild -project ${XCODEPROJ} -configuration Debug -alltargets clean
}

clean-release() {
  xcodebuild -project ${XCODEPROJ} -configuration Release -alltargets clean
}

create-archive() {
  xcodebuild \
    -scheme ${SCHEME} \
    -sdk "iphoneos" \
    -configuration "Release" \
    -archivePath ${ARCHIVE_PATH} \
    archive
}

get_export_options_plist() {
  local tmp_file=/tmp/ExportOptions.plist
  cp ${EXPORT_OPTIONS_PLIST} ${tmp_file}
  /usr/libexec/PlistBuddy -c "Set :teamID ${TEAM_ID}" /${tmp_file}
  echo ${tmp_file}
}

export-archive() {
  xcodebuild -exportArchive \
      -allowProvisioningDeviceRegistration \
      -exportOptionsPlist "$(get_export_options_plist)" \
      -archivePath "${ARCHIVE_PATH}" \
      -exportPath "${IPA_OUTDIR}"
}

ipa() {
  mkdir -p ${IPA_OUTDIR}
  info 2>&1 | tee -a ${IPA_BUILDLOG}
  clean-release 2>&1 | tee -a ${IPA_BUILDLOG}
  create-archive 2>&1 | tee -a ${IPA_BUILDLOG}
  export-archive 2>&1 | tee -a ${IPA_BUILDLOG}
  open ${IPA_OUTDIR}
}

cd ${IOS_APPDIR}
set -x
# execute function
$1
