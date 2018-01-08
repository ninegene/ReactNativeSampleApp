import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import d from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    // flexWrap: "nowrap",
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderColor: '#ccc',
    borderBottomWidth: 0.3,
    paddingBottom: 2,
    marginBottom: 2,
  },
  nameText: {
    fontSize: 12,
    paddingRight: 10,
    width: 120,
    textAlign: 'right',
    color: 'white',
  },
  valueText: {
    fontSize: 12,
    color: 'white',
  },
});

class DeviceInfo extends Component {

  render() {
    const { style, ...rest } = this.props;

    return (
      <ScrollView {...rest} style={[style, styles.container]}>
        <Row name="Unique ID" value={d.getUniqueID()} />
        <Row name="Manufacturer" value={d.getManufacturer()} />
        <Row name="Brand" value={d.getBrand()} />
        <Row name="Model" value={d.getModel()} />
        <Row name="DeviceID" value={d.getDeviceId()} />
        <Row name="System Name" value={d.getSystemName()} />
        <Row name="System Version" value={d.getSystemVersion()} />
        <Row name="Bundle ID" value={d.getBundleId()} />
        <Row name="Build Number" value={d.getBuildNumber()} />
        <Row name="App Version" value={d.getVersion()} />
        <Row name="App Version (Readable)" value={d.getReadableVersion()} />
        <Row name="Running in Emulator" value={d.isEmulator() + ''} />
        <Row name="Running on Tablet" value={d.isTablet() + ''} />
        <Row name="Instance ID (Android)" value={d.getInstanceID && d.getInstanceID()} />
        <Row name="Phone Number (Android)" value={d.getPhoneNumber && d.getPhoneNumber()} />
        <Row name="First Install Time (Android)" value={d.getFirstInstallTime && d.getFirstInstallTime()} />
        <Row name="Last Install Time (Android)" value={d.getLastUpdateTime && d.getLastUpdateTime()} />
      </ScrollView>
    );
  }
}

function Row(props) {
  let { name, value } = props;
  return (
    <View style={styles.row}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
}

export default DeviceInfo;
