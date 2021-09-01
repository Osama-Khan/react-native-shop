import React, {useRef} from 'react';
import {Dimensions} from 'react-native';
import Animated, {EasingNode} from 'react-native-reanimated';
import Searchbar from '../components/searchbar';

type P = {
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function AnimatedSearchbar({onSearch, onFocus, onBlur}: P) {
  const screenW = Dimensions.get('screen').width;
  const shrinkSize = screenW * 0.55;
  const expandSize = screenW * 0.9;
  const width = useRef(new Animated.Value(shrinkSize)).current;
  const expand = () => {
    Animated.timing(width, {
      toValue: expandSize,
      duration: 500,
      easing: EasingNode.elastic(),
    }).start();
  };

  const shrink = () => {
    Animated.timing(width, {
      toValue: shrinkSize,
      duration: 500,
      easing: EasingNode.elastic(),
    }).start();
  };

  return (
    <Animated.View style={[{marginLeft: 8, width}]}>
      <Searchbar
        onSearch={onSearch}
        onFocus={() => {
          if (onFocus) {
            onFocus();
          }
          expand();
        }}
        onBlur={() => {
          if (onBlur) {
            onBlur();
          }
          shrink();
        }}
      />
    </Animated.View>
  );
}
