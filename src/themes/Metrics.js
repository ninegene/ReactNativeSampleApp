import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Metrics = {
  baseMargin: 10,
  smallMargin: 5,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export default Metrics;
