#!/usr/bin/env bash
# Based on pepperoni-app-kit/support/rename.sh
set -eo pipefail

PROGNAME=$(basename $0)
PROGDIR=$(cd $(dirname "$0"); pwd)
ROOTDIR=$(cd ${PROGDIR}/..; pwd)
ROOT=".."

XCODEPROJ=$(find ${ROOTDIR}/ios -type d -maxdepth 1 -name '*.xcodeproj')
APPNAME=$(basename "${XCODEPROJ}" .xcodeproj)

NEW_NAME=$1
OLD_NAME=${APPNAME}

NEW_LOWERCASE_NAME=`echo $NEW_NAME | tr '[:upper:]' '[:lower:]'`
OLD_LOWERCASE_NAME=`echo $OLD_NAME | tr '[:upper:]' '[:lower:]'`

usage() {
    cat <<- EOF

    USAGE:
        $ ./${PROGNAME} <NewAppName>
EOF
}

kill_react_native_packager() {
    local pid=$(lsof -i :8081 | grep '^node' | awk '{print $2}')
    local ppid

    if [[ ${pid} ]]; then
        echo "Killing react-native packager ..."
        # ppid - parent pid - the terminal window
        ppid=$(ps -o ppid -p ${pid} | tail -n1)
        (set -x; kill ${pid} ${ppid})
    fi
}

clean() {
    kill_react_native_packager
    (set -x
    cd ${ROOTDIR}/android && ./gradlew clean
    rm -rf ${TMPDIR}/react-*
    watchman watch-del-all
    rm -rf ${ROOTDIR}/ios/build
    rm -rf ${ROOTDIR}/android/.gradle
    rm -rf ${ROOTDIR}/android/app/build
    )
}

replace_name_in_files() {
    local files=$(grep -riIl --exclude-dir={node_modules,build,.git} "${OLD_LOWERCASE_NAME}" ${ROOT}/*)
    local f
    for f in ${files}; do
      (set -x
      sed -i.bak "s/${OLD_NAME}/${NEW_NAME}/g;s/${OLD_LOWERCASE_NAME}/${NEW_LOWERCASE_NAME}/g" ${f}
      )
    done
    (set -x
    find "${ROOT}" -name '*.bak' -exec rm {} \;
    )
}

rename_files() {
    local files=$(find "${ROOT}/ios" "${ROOT}/android" -type f -ipath "*${OLD_LOWERCASE_NAME}*")
    local mvCMD="mv"
    local f
    if [[ -d "${ROOT}/.git" && -x "$(command -v git)" ]]; then
      git add --update
      mvCMD="git mv"
    fi

    for f in ${files}; do
      local new_filename=$(echo ${f} | sed "s/${OLD_NAME}/${NEW_NAME}/g;s/${OLD_LOWERCASE_NAME}/${NEW_LOWERCASE_NAME}/g")
      mkdir -p $(dirname "${new_filename}")
      (set -x
      ${mvCMD} "${f}" "${new_filename}"
      )
    done
}

remove_old_ios_dirs() {
    rm -r ${ROOTDIR}/ios/${OLD_NAME}*
}

remove_leftover_empty_dirs() {
  set +e # disable exit on error
  (set -x
  rmdir -p $(find "${ROOT}" -ipath "*${OLD_LOWERCASE_NAME}*" -type d -empty) 2>/dev/null
  )
  set -e
}

print_done_message() {
  printf "Done renaming ${OLD_NAME} to ${NEW_NAME}"
}

if [[ ! $1 ]]; then
  usage
  exit 2
fi

clean
replace_name_in_files
rename_files
remove_old_ios_dirs
remove_leftover_empty_dirs
print_done_message
