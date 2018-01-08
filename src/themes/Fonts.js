const type = {
  normal: 'Avenir-Book',
  bold: 'Avenir-Black',
};

const size = {
  large: 24,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
  input: 18,
};

const style = {
  normal: {
    fontFamily: type.normal,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.normal,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
};
