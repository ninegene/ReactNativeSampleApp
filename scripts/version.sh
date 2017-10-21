#!/bin/bash
set -eo pipefail

PROGNAME=$(basename $0)
PROGDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$(cd ${PROGDIR}/..; pwd)

XCODEPROJ=$(find ${ROOTDIR}/ios -type d -maxdepth 1 -name '*.xcodeproj')
APPNAME=$(basename "${XCODEPROJ}" .xcodeproj)

IOS_APPDIR=${ROOTDIR}/ios
INFO_PLIST=${IOS_APPDIR}/${APPNAME}/Info.plist

PACKAGE_JSON=${ROOTDIR}/package.json
VERSION=$(jq -r ".version" ${PACKAGE_JSON})

usage() {
    cat <<- EOF

    USAGE:
        $ ./${PROGNAME} bump <major|minor|patch>
        $ ./${PROGNAME} set <x.x.x>

    Bump major, minor, patch version of package.json and Info.plist (for iOS).
    Android reads package.json for versionCode and versionName.
EOF
}

get_major_number() {
    local ver=$1
    local major=$(echo ${ver} | awk -F'.' '{print $1}')
    echo ${major}
}

get_minor_number() {
    local ver=$1
    local minor=$(echo ${ver} | awk -F'.' '{print $2}')
    echo ${minor}
}

get_patch_number() {
    local ver=$1
    local patch=$(echo ${ver} | awk -F'.' '{print $3}')
    echo ${patch}
}

set_version() {
    local newver=$1
    local major=$(get_major_number ${newver})
    local minor=$(get_minor_number ${newver})
    local patch=$(get_patch_number ${newver})
    (set -x
    # update package.json
    sed -i "s/\"version\": \".*/\"version\": \"${newver}\",/" ${PACKAGE_JSON}

    # https://developer.apple.com/library/content/qa/qa1827/_index.html
    # update Info.plist
    cd ${IOS_APPDIR}
    agvtool new-marketing-version ${newver}
    agvtool new-version ${newver}
    # https://medium.com/@andr3wjack/versioning-react-native-apps-407469707661
    /usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${patch}" ${INFO_PLIST}
    )
    echo "Old version: ${VERSION}"
    echo "New version: ${newver}"
}

bump_major_version() {
    local new_major=$(($(get_major_number ${VERSION}) + 1))
    local newver=${new_major}.$(get_minor_number ${VERSION}).$(get_patch_number ${VERSION})
    set_version ${newver}
}

bump_minor_version() {
    local new_minor=$(($(get_minor_number ${VERSION}) + 1))
    local newver=$(get_major_number ${VERSION}).${new_minor}.$(get_patch_number ${VERSION})
    set_version ${newver}
}

bump_patch_version() {
    local new_patch=$(($(get_patch_number ${VERSION}) + 1))
    local newver=$(get_major_number ${VERSION}).$(get_minor_number ${VERSION}).${new_patch}
    set_version ${newver}
}

get_ios_version_number() {
    cd ${IOS_APPDIR}
    agvtool what-marketing-version
}

get_ios_build_number() {
    cd ${IOS_APPDIR}
    agvtool what-version
}

if [[ $1 == "bump" ]]; then
    case "$2" in
      major)
          bump_major_version
          ;;
      minor)
          bump_minor_version
          ;;
      patch)
          bump_patch_version
          ;;
      *)
          usage
          exit 2
    esac
elif [[ $1 == "set" ]]; then
    if [[ $2 =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        set_version "$2"
    else
        usage
        exit 2
    fi
else
    usage
    exit 2
fi
