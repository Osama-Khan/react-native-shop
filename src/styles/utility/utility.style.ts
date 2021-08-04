import {StyleSheet} from 'react-native';
import colsStyle from './cols.style';
import marginsStyle from './margins.style';
import paddingsStyle from './paddings.style';
import positioningStyle from './positioning.style';

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
  overflowHidden: {
    overflow: 'hidden',
  },
  overflowVisible: {
    overflow: 'visible',
  },
  overflowScroll: {
    overflow: 'scroll',
  },
  ...paddingsStyle,
  ...positioningStyle,
  row: {flexDirection: 'row'},
});
