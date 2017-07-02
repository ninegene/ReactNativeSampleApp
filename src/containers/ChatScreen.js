import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles/ChatScreenStyles";

class ChatScreen extends Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>
          Chat with {params.user}
        </Text>
      </View>
    );
  }
}

export default ChatScreen;
