import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import DatePickerModal from '../modal/date-picker.modal';

export type DatePickerInputPropsType = Partial<
  Omit<TextInputProps, 'editable'>
> & {
  /** Called when a date is picked through DatePickerModal */
  onPick?: (date: Date) => void;
};

/** Provides a pressable TextInput based DatePicker */
export default function DatePickerInput({
  onPick,
  ...props
}: DatePickerInputPropsType) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState('');
  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput value={date} {...props} editable={false} />
      </TouchableOpacity>
      <DatePickerModal
        onDismiss={() => setShow(false)}
        onPick={date => {
          const dateOfBirth = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
          if (onPick) onPick(date);
          setDate(dateOfBirth);
          setShow(false);
        }}
        visible={show}
      />
    </>
  );
}
