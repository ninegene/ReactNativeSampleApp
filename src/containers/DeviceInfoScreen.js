import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Images from "../images";
import DeviceInfo from "../components/DeviceInfo";

const styles = StyleSheet.create({
  bgImageContainer: {
    flex: 1,
    // https://facebook.github.io/react-native/docs/image.html
    // resizeMode: "cover", // or 'stretch',
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textColor: {
    color: 'white',
  },
});

class DeviceInfoScreen extends Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    console.log('params', params);
    return (
      <ImageBackground
        style={styles.bgImageContainer}
        source={Images.mobilePhoneBg}
      >
        <DeviceInfo />
      </ImageBackground>
    );
  }
}

export default DeviceInfoScreen;
