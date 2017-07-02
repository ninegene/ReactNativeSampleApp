import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles/LaunchScreenStyles";
import Images from "../themes/Images";

class LaunchScreen extends React.Component {
  static navigationOptions = {
    title: "Launch Screen"
  };
  render() {
    return (
      <Image
        style={styles.container}
        source={Images.launchScreenBackground}
      >
        <View style={{flex: 1, marginTop: 30}}><Text>Launching ...</Text></View>
      </Image>
    );
  }
}

export default LaunchScreen;
