// import "react-native";
import React from "react";
import App from "../src/containers/App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

jest.mock("react-native-code-push", () => {
  return {
    InstallMode: {},
    CheckFrequency: {},
    SyncStatus: {},
    UpdateState: {},
    DeploymentStatus: {},
    DEFAULT_UPDATE_DIALOG: {},

    checkForUpdate: jest.fn(),
    codePushify: jest.fn(),
    getConfiguration: jest.fn(),
    getCurrentPackage: jest.fn(),
    getUpdateMetadata: jest.fn(),
    log: jest.fn(),
    notifyAppReady: jest.fn(),
    notifyApplicationReady: jest.fn(),
    sync: jest.fn(),
  };
});

it("renders correctly", () => {
  renderer.create(
    <App />
  );
});
