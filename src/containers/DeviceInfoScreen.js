import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Icons, Images, Styles } from '../themes';
import DeviceInfo from '../components/DeviceInfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  static navigationOptions = {
    title: 'Device Info',
    tabBarIcon: (props) => (
      <Icon name="perm-device-information" size={Icons.medium} color={props.tintColor} />
    ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#39babd',
    }
  }

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
