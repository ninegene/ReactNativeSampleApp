const Colors = {
  // Text
  primaryText: '#363841',
  secondaryText: '#E1E1E1',

  // Backgrounds
  primaryBackground: '#F7F7F7',
  secondaryBackground: '#171717',

  // Alerts
  alertPositive: '#363841',
  alertNegative: 'rgba(200, 0, 0, 0.8)',

  // Custom
  charcoal: '#595959',
  coal: '#2d2d2d',
  frost: '#D8D8D8',
  silver: '#F7F7F7',
  steel: '#CCCCCC',
  fire: '#E73536',
};

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
  mm3: 'Myanmar3',
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  large: 22,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

const Fonts = {
  type,
  size,
  style
};

export {Colors, Fonts};
