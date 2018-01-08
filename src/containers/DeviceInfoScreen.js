import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Images, Styles } from '../themes';
import DeviceInfo from '../components/DeviceInfo';
import Instructions from '../components/Instructions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

class DeviceInfoScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        style={Styles.bgImage}
        source={Images.bgMobilePhone}
      >
        <View style={styles.container}>
          <Instructions />
          <DeviceInfo />
        </View>
      </ImageBackground>
    );
  }
}

export default DeviceInfoScreen;
