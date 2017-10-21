#!/bin/bash
set -eo pipefail

PROGNAME=$(basename $0)
PROGDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$(cd ${PROGDIR}/..; pwd)

XCODEPROJ=$(find ${ROOTDIR}/ios -type d -maxdepth 1 -name '*.xcodeproj')
APPNAME=$(basename "${XCODEPROJ}" .xcodeproj)

INFO_PLIST=${ROOTDIR}/ios/${APPNAME}/Info.plist
STRINGS_XML=${ROOTDIR}/android/app/src/main/res/values/strings.xml

# Use "APPNAME-<iOS|Android>" convension for code-push app name
IOS_APPNAME=${APPNAME}-iOS
ANDROID_APPNAME=${APPNAME}-Android

usage() {
    cat <<- EOF

    USAGE:
        $ ./${PROGNAME} <Staging|Production>
EOF
}

get_deployment_key() {
    local appname=$1
    local type=$2
    code-push deployment ls ${appname} -k --format json \
       | jq ".[] | select(.name == \"${type}\") | .key" \
       | sed -e 's/^"//' -e 's/"$//'
}

get_deployment_key_from_ios() {
    /usr/libexec/PlistBuddy -c 'Print CodePushDeploymentKey' ${INFO_PLIST}
}

get_deployment_key_from_android() {
    xmllint --xpath '//string[@name="reactNativeCodePush_androidDeploymentKey"]/text()' ${STRINGS_XML}
}

set_deployment_key_in_android() {
    local oldkey=$1
    local newkey=$2
    (set -x
    sed -i "s/${oldkey}/${newkey}/" ${STRINGS_XML}
    )
}

set_deployment_key_in_ios() {
    local oldkey=$1
    local newkey=$2
    (set -x
    sed -i "s/${oldkey}/${newkey}/" ${INFO_PLIST}
    )
}

set_deployment_key_in_android() {
    local oldkey=$1
    local newkey=$2
    (set -x
    sed -i "s/${oldkey}/${newkey}/" ${STRINGS_XML}
    )
}

set_deployment_key() {
    local type=$1
    echo "Going to use ${type} key"

    local old_ioskey=$(get_deployment_key_from_ios)
    local new_ioskey=$(get_deployment_key ${IOS_APPNAME} ${type})
    set_deployment_key_in_ios ${old_ioskey} ${new_ioskey}
    echo "Old iOS Deployment Key: ${old_ioskey}"
    # echo "New iOS Deployment Key: ${new_ioskey}"
    echo "New iOS Deployment Key: $(get_deployment_key_from_ios)"

    local old_androidkey=$(get_deployment_key_from_android)
    local new_androidkey=$(get_deployment_key ${ANDROID_APPNAME} ${type})
    set_deployment_key_in_android ${old_androidkey} ${new_androidkey}
    echo "Old Android Deployment Key: ${old_androidkey}"
    # echo "New Android Deployment Key: ${new_androidkey}"
    echo "New Android Deployment Key: $(get_deployment_key_from_android)"
}

case $1 in
    Staging)
        set_deployment_key Staging
        ;;
    Production)
        set_deployment_key Production
        ;;
    *)
        usage
        exit 2
esac
