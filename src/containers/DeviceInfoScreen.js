import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Icons, Images, Styles } from '../themes';
import DeviceInfo from '../components/DeviceInfo';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    color: 'white',
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
        <DeviceInfo />
      </ImageBackground>
    );
  }
}

export default DeviceInfoScreen;
