## CodePush Setup

Based on: https://microsoft.github.io/code-push/docs/getting-started.html

```
$ npm install -g code-push-cli
```

```
$ code-push register
```

```
$ cat ~/.code-push.config
```

#### Install code-push
```
$ cd ReactNativeSampleApp
$ yarn add react-native-code-push
```

```
$ react-native link react-native-code-push
```
To get started, use Staging deployment key for testing first and change it later in `strings.xml` for android and `info.plist` for ios.
Or hit <ENTER> to ignore.

Based on: https://microsoft.github.io/code-push/docs/react-native.html#link-3
More info: https://www.youtube.com/watch?v=b_Q1apn63q0

#### Add code-push app for iOS and Android
```
$ code-push app add IdeaNota-iOS ios react-native
$ code-push app add IdeaNota-Android android react-native
```

#### List Deployment Keys
```
$ code-push deployment ls ReactNativeSampleApp-iOS -k
$ code-push deployment ls ReactNativeSampleApp-Android -k
```

#### Release via code-push

Set the deployment key in `strings.xml` for android and `info.plist` for ios.
```
$ cd scripts/
$ ./set-deployment-key.sh Staging
OR
$ ./set-deployment-key.sh Production
```

```
$ code-push release-react ReactNativeSampleApp-Android android
$ code-push release-react ReactNativeSampleApp-iOS ios
```

List Deployment Status
```
$ code-push deployment ls ReactNativeSampleApp-iOS
$ code-push deployment ls ReactNativeSampleApp-Android
```

Push to code-push server as for Staging or Production deployment
```
$ cd scripts
$ ./code-push.sh stage
OR
$ ./code-push.sh prod
```

