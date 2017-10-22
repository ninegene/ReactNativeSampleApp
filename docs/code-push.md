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

##### Create the code-push app
```
$ code-push app add <AppName>-iOS ios react-native

E.g.
$ code-push app add ReactNativeSampleApp-iOS ios react-native
```

```
$ code-push app add <AppName>-iOS ios react-native

E.g.
$ code-push app add ReactNativeSampleApp-Android android react-native
```

#### List Deployment Keys
```
$ code-push deployment ls <AppName>-iOS -k
$ code-push deployment ls <AppName>-Android -k
```

#### Install code-push
```
$ yarn add react-native-code-push
```

```
$ react-native link react-native-code-push
```

Based on: https://microsoft.github.io/code-push/docs/react-native.html#link-3
More info: https://www.youtube.com/watch?v=b_Q1apn63q0

#### Use Staging Deployment Key
To get started, use Staging deployment key for testing first and change it later in `strings.xml` for android and `info.plist` for ios.

#### Release via code-push
```
$ code-push release-react <AppName>-Android android
$ code-push release-react <AppName>-iOS ios
```

List Deployment Status
```
$ code-push deployment ls <AppName>-iOS
$ code-push deployment ls <AppName>-Android
```

