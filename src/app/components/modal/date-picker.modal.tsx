import React, {useState} from 'react';
import DatePicker from '@react-native-community/datetimepicker';

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
  return props.visible ? (
    <DatePicker
      value={date}
      maximumDate={props.maxDate}
      onChange={({nativeEvent, type}: any) => {
        if (type === 'dismissed') {
          props.onDismiss();
          return;
        }
        const date = nativeEvent?.timestamp;
        props.onPick(date);
        setDate(date);
      }}
    />
  ) : (
    <></>
  );
}
