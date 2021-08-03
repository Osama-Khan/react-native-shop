import {StyleSheet} from 'react-native';
import colsStyle from './cols.style';
import marginsStyle from './margins.style';
import paddingsStyle from './paddings.style';

export default StyleSheet.create({
  alignCenter: {alignSelf: 'center'},
  card: {
    margin: 4,
    overflow: 'hidden',
  },
  ...colsStyle,
  center: {justifyContent: 'center', alignItems: 'center'},
  flexWrap: {flexWrap: 'wrap'},
  flex: {flex: 1},
  ...marginsStyle,
  ...paddingsStyle,
  row: {flexDirection: 'row'},
});
