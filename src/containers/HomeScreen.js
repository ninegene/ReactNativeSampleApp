import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Fonts, Colors } from "../Themes";
import Metrics from "../Metrics";
import Instruction from "../components/Instructions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBackground
  },
  welcome: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.primaryText,
    textAlign: "center",
    margin: Metrics.baseMargin
  },
  instructions: {
    textAlign: "center",
    marginBottom: 5,
    color: Colors.primaryText,
    fontSize: Fonts.size.medium
  }
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleChatClick = () => {
    const { navigate } = this.props.navigation;
    navigate("Chat", { user: "Lucy" });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit src/*.js</Text>
        <Instruction />
        <Button onPress={this.handleChatClick} title="Chat with Lucy" />
      </View>
    );
  }
}

export default HomeScreen;
