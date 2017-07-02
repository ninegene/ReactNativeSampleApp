import { StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../themes/index";

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

export default styles;
