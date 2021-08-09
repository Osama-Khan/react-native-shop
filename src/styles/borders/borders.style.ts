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
});
