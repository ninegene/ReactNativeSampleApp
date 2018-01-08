import React from 'react';
import { View, Text, Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts } from '../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingTop: 30,
    paddingBottom: 30,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: Fonts.size.large,
    color: 'white',
  }
});

// See functional component:
// https://facebook.github.io/react/docs/components-and-props.html
function IOSInstructions(props) {
  return (
    <Text {...props} style={[styles.instructions, props.style]}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
    </Text>
  );
}

function AndroidInstructions(props) {
  return (
    <Text {...props} style={[styles.instructions, props.style]}>
      Double tap R on your keyboard to reload,{'\n'}
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
      case 'ios':
        comp = <IOSInstructions {...this.props} />;
        break;
      case 'android':
        comp = <AndroidInstructions {...this.props} />;
        break;
    }

    return (
      <View style={styles.container}>
        {comp}
      </View>
    );
  }
}
