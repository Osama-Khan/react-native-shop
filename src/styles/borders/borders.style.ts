import {StyleSheet} from 'react-native';
import variables from '../abstract/app.variables';

export default StyleSheet.create({
  roundedNone: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: variables.borderRadius,
  },
  roundedFull: {
    borderRadius: 10000,
  },
  roundedTop: {
    borderTopLeftRadius: variables.borderRadius,
    borderTopRightRadius: variables.borderRadius,
  },
  roundedBottom: {
    borderBottomLeftRadius: variables.borderRadius,
    borderBottomRightRadius: variables.borderRadius,
  },
  roundedLeft: {
    borderTopLeftRadius: variables.borderRadius,
    borderBottomLeftRadius: variables.borderRadius,
  },
  roundedRight: {
    borderTopRightRadius: variables.borderRadius,
    borderBottomRightRadius: variables.borderRadius,
  },
  roundedTopRight: {
    borderTopRightRadius: variables.borderRadius,
  },
  roundedTopLeft: {
    borderTopLeftRadius: variables.borderRadius,
  },
  roundedBottomRight: {
    borderBottomRightRadius: variables.borderRadius,
  },
  roundedBottomLeft: {
    borderBottomLeftRadius: variables.borderRadius,
  },
});
