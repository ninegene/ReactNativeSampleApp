## ReactNativeSampleApp
Minimal react native boilerplate/sample app with the following:
* react-navigation
* react-redux
* react-native-code-push
* react-native-device-info


Provide [scripts](./scripts/) to
* rename the app
* set the version
* build and release with code-push

### Setting as new app called `MyNewApp`
```
$ git clone https://github.com/ninegene/ReactNativeSampleApp.git MyNewApp
$ cd MyNewApp
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
