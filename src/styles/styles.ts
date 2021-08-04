import {StyleSheet} from 'react-native';
import backgroundStyle from './background/background.style';
import bordersStyle from './borders/borders.style';
import textStyle from './text/text.style';
import utilityStyle from './utility/utility.style';

const styles = StyleSheet.create({
  ...backgroundStyle,
  ...bordersStyle,
  ...textStyle,
  ...utilityStyle,
});

export default styles;
