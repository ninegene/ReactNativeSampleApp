import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import styles from "./styles/HomeScreenStyles";
import Instruction from "../components/Instructions";

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
