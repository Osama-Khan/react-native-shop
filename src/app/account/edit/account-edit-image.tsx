import React from 'react';
import s from '../../../styles/styles';
import appState from '../../state/state';
import colors from '../../../styles/colors';
import Icon from '../../components/icon';
import {View} from 'react-native';
import ImagePicker from '../../components/image-picker/image-picker';

type PropType = {currentImg: string; onPick: (img: string) => void};
export default ({currentImg, onPick}: PropType) => {
  return (
    <>
      <ImagePicker thumb={currentImg} onPick={onPick} />
      {currentImg !== appState.user.profileImage ? (
        <View
          style={[
            s.topRight,
            s.rounded,
            s.m8,
            {backgroundColor: colors.greenTransparent},
          ]}>
          <Icon name="check" size={24} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
