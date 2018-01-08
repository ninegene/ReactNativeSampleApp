import Metrics from './Metrics';
import Colors from './Colors';

const Styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  bgImage: {
    flex: 1,
    // https://facebook.github.io/react-native/docs/image.html
    // resizeMode: "cover", // or 'stretch',
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
};

export default Styles;
