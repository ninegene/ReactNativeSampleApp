#!/usr/bin/env bash
set -e

readonly PROGDIR=$(cd $(dirname $0); pwd)

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

enable_gradle_daemon() {
    if [[ ! -f ~/.gradle/gradle.properties ]]; then
        touch ~/.gradle/gradle.properties
    fi

    if ! grep -Fxq 'org.gradle.daemon=true' ~/.gradle/gradle.properties; then
        echo "Enabling gradle daemon ..."
        echo "org.gradle.daemon=true" >> ~/.gradle/gradle.properties
    fi
    if ! grep -q 'org.gradle.jvmargs' ~/.gradle/gradle.properties; then
        echo "For faster builds, the maximum heap size for the Gradle daemon is set to 2048 MB."
        echo "org.gradle.jvmargs=-Xmx2048M" >> ~/.gradle/gradle.properties
    fi
}

enable_gradle_daemon

if [[ $1 == '-k' ]]; then
  kill_react_native_packager
  shift
fi

if [[ ! $1 ]]; then
  echo "Usage: ./r [-k] <ios|android>" >&2
  exit 0
fi

if [[ $1 == 'android' ]]; then
  react-native run-android

  # Run only if the above command succeeded
  if [[ $! -eq 0 ]]; then
    adb logcat *:S ReactNative:V ReactNativeJS:V
  fi
fi

if [[ $1 == 'ios' ]]; then
  react-native run-ios
fi
