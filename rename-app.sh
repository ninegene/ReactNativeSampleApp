#!/usr/bin/env bash
# Based on pepperoni-app-kit/support/rename.sh
set -e

if [[ -z $1 ]]; then
  printf "\n    Usage: ./$(basename $0) <NEW_NAME>\n\n"
  exit 2
fi

APP_ROOT="."
ABSOLUTE_APP_ROOT=$(cd "$(dirname $0)"; pwd)

NEW_NAME=$1
OLD_NAME=${2:-ReactNativeSampleApp}

NEW_LOWERCASE_NAME=`echo $NEW_NAME | tr '[:upper:]' '[:lower:]'`
OLD_LOWERCASE_NAME=`echo $OLD_NAME | tr '[:upper:]' '[:lower:]'`

clean() {
    if [[ ! -d node_modules ]]; then
        (set -x
        yarn install
        )
    fi
    (set -x
    yarn run android:clean
    yarn run ios:clean
    )
}

replace_name_in_files() {
    local files=$(grep -riIl --exclude-dir={node_modules,build,.git} --exclude=$(basename $0) "${OLD_LOWERCASE_NAME}" ${APP_ROOT}/*)
    local f
    for f in ${files}; do
      (set -x
      sed -i.bak "s/${OLD_NAME}/${NEW_NAME}/g;s/${OLD_LOWERCASE_NAME}/${NEW_LOWERCASE_NAME}/g" ${f}
      )
    done
    (set -x
    find "${APP_ROOT}" -name '*.bak' -exec rm {} \;
    )
}

rename_files() {
    local files=$(find "${APP_ROOT}/ios" "${APP_ROOT}/android" -type f -ipath "*${OLD_LOWERCASE_NAME}*")
    local mvCMD="mv"
    local f
    if [[ -d "${APP_ROOT}/.git" && -x "$(command -v git)" ]]; then
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
    rm -r ${ABSOLUTE_APP_ROOT}/ios/${OLD_NAME}*
}

remove_leftover_empty_dirs() {
  set +e # disable exit on error
  (set -x
  rmdir -p $(find "${APP_ROOT}" -ipath "*${OLD_LOWERCASE_NAME}*" -type d -empty) 2>/dev/null
  )
  set -e
}

print_done_message() {
  printf "Done renaming ${OLD_NAME} to ${NEW_NAME}"
}

clean
replace_name_in_files
rename_files
remove_old_ios_dirs
remove_leftover_empty_dirs
print_done_message
