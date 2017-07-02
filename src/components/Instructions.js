import React from "react";
import { Text, Platform } from "react-native";
import styles from "./styles/InstructionsStyles";

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
      Press Cmd+R to reload,{"\n"}
      Cmd+D or shake for dev menu
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
