import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Button, Divider} from 'react-native-paper';
import Modal from '.';
import themeService from '../../services/theme.service';

export type DatePickerPropsType = {
  visible: boolean;
  startingDate?: Date;
  maxDate?: Date;
  onPick: (date: Date) => void;
  onDismiss: () => void;
  onDateChange?: (date: Date) => void;
};

export default function DatePickerModal(props: DatePickerPropsType) {
  const [date, setDate] = useState(props.startingDate || new Date());
  return (
    <Modal visible={props.visible} onDismiss={props.onDismiss}>
      <DatePicker
        date={date}
        androidVariant={
          themeService.currentThemeName === 'dark'
            ? 'nativeAndroid'
            : 'iosClone'
        }
        maximumDate={props.maxDate}
        style={{alignSelf: 'center'}}
        onDateChange={date => {
          setDate(date);
          props.onDateChange && props.onDateChange(date);
        }}
        mode="date"
      />
      <Divider style={{marginVertical: 8}} />
      <Button
        style={{margin: 8, marginLeft: 'auto'}}
        onPress={() => props.onPick(date)}>
        Apply
      </Button>
    </Modal>
  );
}
