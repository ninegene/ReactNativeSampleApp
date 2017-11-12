import React from "react";
import { Text, Platform } from "react-native";
import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../Themes";

const styles = StyleSheet.create({
  instructions: {
    textAlign: "center",
    marginBottom: 5,
    color: Colors.primaryText,
    fontSize: Fonts.size.small
  }
});

// See functional component:
// https://facebook.github.io/react/docs/components-and-props.html
function IOSInstructions(props) {
  return (
    <Text {...props} style={[styles.instructions, props.style]}>
      Press Cmd+R to reload,{"\n"}
      Cmd+D or shake for dev menu
    </Text>
  );
}

function AndroidInstructions(props) {
  return (
    <Text {...props} style={[styles.instructions, props.style]}>
      Double tap R on your keyboard to reload,{"\n"}
      Shake or press menu button for dev menu
    </Text>
  );
}

function GeneralInstructions(props) {
  return (
    <Text {...props} style={[styles.instructions, props.style]}>
      {Platform.OS} is not supported!
    </Text>
  );
}

export default class Instructions extends React.Component {
  render() {
    let comp = <GeneralInstructions {...this.props} />;
    switch (Platform.OS) {
      case "ios":
        comp = <IOSInstructions {...this.props} />;
        break;
      case "android":
        comp = <AndroidInstructions {...this.props} />;
        break;
    }
    return comp;
  }
}
