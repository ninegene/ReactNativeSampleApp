import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Icons } from '../Themes';
import Images from '../images';
import DeviceInfo from '../components/DeviceInfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  bgImageContainer: {
    flex: 1,
    // https://facebook.github.io/react-native/docs/image.html
    // resizeMode: "cover", // or 'stretch',
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
        style={styles.bgImageContainer}
        source={Images.mobilePhoneBg}
      >
        <DeviceInfo />
      </ImageBackground>
    );
  }
}

export default DeviceInfoScreen;
