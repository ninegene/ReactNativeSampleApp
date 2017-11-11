const isDevMode = !!__DEV__;
import React, { Component } from "react";
import codePush from "react-native-code-push";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import AppNavigator from "../navigators/AppNavigator";

// See: https://microsoft.github.io/code-push/docs/react-native.html#link-6
// See: https://microsoft.github.io/code-push/docs/react-native.html#link-10
// When an update is available, prompt the end user for permission
// before downloading it, and then immediately apply the update.
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  // installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

class App extends Component {

  // someEvent() {
  //   // call navigate for AppNavigator here if necessary from top level component only
  //   this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName, params });
  // }

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(
      progress.receivedBytes + " of " + progress.totalBytes + " received."
    );
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator
            ref={nav => {
              this.navigator = nav;
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}

if (!isDevMode) {
  // eslint-disable-next-line no-class-assign
  App = codePush(codePushOptions)(App);
}

export default App;
