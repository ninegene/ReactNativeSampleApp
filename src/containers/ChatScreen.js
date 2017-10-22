import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { Fonts, Colors } from "../Themes";
import Images from "../images";

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

class ChatScreen extends Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <ImageBackground
        style={styles.bgImageContainer}
        source={Images.mobilePhoneBg}
      >
        <View style={styles.container}>
          <Text style={styles.textColor}>
            Chat with {params.user}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default ChatScreen;
