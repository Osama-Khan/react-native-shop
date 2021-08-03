import {StyleSheet} from 'react-native';
import backgroundStyle from './background/background.style';
import textStyle from './text/text.style';
import utilityStyle from './utility/utility.style';

const styles = StyleSheet.create({
  ...backgroundStyle,
  ...textStyle,
  ...utilityStyle,
});

export default styles;
