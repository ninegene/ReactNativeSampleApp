## ReactNativeSampleApp
React native boilerplate/sample app with the following:
* react-navigation
* react-redux
* redux-persist
* redux-thunk
* react-native-code-push
* react-native-vector-icons
* react-native-device-info


Provide [scripts](./scripts/) to
* rename the app
* set the version
* build and release with code-push

### Setting as new app called `MyNewApp`
```
$ git clone https://github.com/ninegene/ReactNativeSampleApp.git
$ cd ReactNativeSampleApp
$ cd scripts
$ ./rename-app.sh MyNewApp

$ cd ..
$ git remote set-url origin <git_url>
OR
$ cd ..
$ rm -rf .git
$ git init

$ git add --all . 
$ git diff --staged
$ git commit -m "Inital base app"
```
