import {StyleSheet} from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  textCenter: {textAlign: 'center'},
  textBold: {fontWeight: 'bold'},
  textBadge: {
    borderRadius: 8,
    padding: 4,
    fontWeight: 'bold',
  },
  textPrice: {
    color: colors.green,
    backgroundColor: colors.greenSubtle,
  },
  textOutOfStock: {
    color: colors.red,
    backgroundColor: colors.redSubtle,
  },
  textMuted: {color: colors.gray},
});
