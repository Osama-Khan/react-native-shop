import React from 'react';
import {View} from 'react-native';
import {Button, Caption, Divider, TextInput} from 'react-native-paper';
import s from '../../../styles/styles';
import appState from '../../state/state';
import DatePicker from 'react-native-date-picker';
import Modal from '../../components/modal/modal';
import colors from '../../../styles/colors';
import UserState from '../../state/user-state';
import userService from '../../services/user.service';
import uiService from '../../services/ui.service';
import ImageEditor from './account-edit-image';

type UserStateEditable = Pick<
  UserState,
  'username' | 'firstName' | 'lastName' | 'dateOfBirth' | 'profileImage'
>;

type SubmissionType = UserStateEditable & {password: string};

type StateType = {
  dobModalShown: boolean;
  data: SubmissionType;
  saving: boolean;
};

const minimumAge = 8;

export default class AccountEdit extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    const u = appState.user;
    this.state = {
      dobModalShown: false,
      saving: false,
      data: {
        username: u.username!,
        dateOfBirth: u.dateOfBirth!,
        firstName: u.firstName!,
        lastName: u.lastName!,
        profileImage: u.profileImage!,
        password: '',
      },
    };
  }

  render() {
    const data = this.state.data;
    const DateModal = () => (
      <Modal
        visible={this.state.dobModalShown}
        onDismiss={() => this.setState({...this.state, dobModalShown: false})}>
        <DatePicker
          date={data.dateOfBirth}
          androidVariant="nativeAndroid"
          maximumDate={this.getMaxDate()}
          style={s.alignCenter}
          onDateChange={dateOfBirth =>
            this.setState({
              ...this.state,
              data: {...this.state.data, dateOfBirth},
            })
          }
          mode="date"
        />
      </Modal>
    );
    return (
      <>
        <View style={s.center}>
          <ImageEditor
            currentImg={data.profileImage!}
            onPick={profileImage =>
              this.setState({...this.state, data: {...data, profileImage}})
            }
          />
        </View>
        <Divider />
        <Caption style={[s.m8, s.mt8]}>Personal Information</Caption>
        <View style={[s.row, {zIndex: 0}]}>
          <TextInput
            style={[s.col6, s.p8]}
            mode="outlined"
            label="First Name"
            value={data.firstName}
            outlineColor={
              this.isFieldChanged('firstName') ? colors.green : undefined
            }
            onChangeText={firstName =>
              this.setState({...this.state, data: {...data, firstName}})
            }
            dense
          />
          <TextInput
            style={[s.col6, s.p8]}
            mode="outlined"
            label="Last Name"
            value={data.lastName}
            outlineColor={
              this.isFieldChanged('lastName') ? colors.green : undefined
            }
            onChangeText={lastName =>
              this.setState({...this.state, data: {...data, lastName}})
            }
            dense
          />
        </View>
        <View style={[s.row, s.center]}>
          <Caption style={[s.m8, s.alignCenter]}>Date of Birth: </Caption>
          <Button
            mode="outlined"
            color={this.isDobChanged() ? colors.green : colors.gray}
            compact
            style={s.m8}
            uppercase={false}
            onPress={() => this.setState({...this.state, dobModalShown: true})}>
            {data.dateOfBirth!.toDateString()}
          </Button>
        </View>
        <Caption style={[s.m8, s.mt8]}>Login Credentials</Caption>
        <View style={{zIndex: 0}}>
          <TextInput
            style={[s.p8]}
            mode="outlined"
            label="Username"
            value={data.username}
            outlineColor={
              this.isFieldChanged('username') ? colors.green : undefined
            }
            onChangeText={username =>
              this.setState({...this.state, data: {...data, username}})
            }
          />
          <TextInput
            style={s.p8}
            mode="outlined"
            label="New Password"
            value={data.password}
            outlineColor={this.isPassChanged() ? colors.green : undefined}
            onChangeText={password =>
              this.setState({...this.state, data: {...data, password}})
            }
            secureTextEntry
          />
        </View>
        <Button
          mode="contained"
          icon="check"
          style={s.m8}
          disabled={
            this.state.saving || Object.keys(this.submissionData).length === 0
          }
          loading={this.state.saving}
          onPress={this.update}>
          Save
        </Button>
        <DateModal />
      </>
    );
  }

  getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(new Date().getFullYear() - minimumAge);
    return maxDate;
  };

  isDobChanged = () =>
    this.state.data.dateOfBirth?.toDateString() !==
    appState.user.dateOfBirth?.toDateString();

  isFieldChanged = (fieldName: keyof UserStateEditable) =>
    this.state.data[fieldName] !== appState.user[fieldName];

  isPassChanged = () => this.state.data.password !== '';

  /** Returns object with properties that have been edited */
  get submissionData() {
    const data = {} as any;
    if (this.isDobChanged()) {
      data.dateOfBirth = this.state.data.dateOfBirth;
    }
    const keys = Object.keys(this.state.data) as (keyof SubmissionType)[];
    keys.forEach((k: keyof SubmissionType) => {
      if (k === 'dateOfBirth' || k === 'password') {
        return;
      }
      if (this.isFieldChanged(k)) {
        data[k] = this.state.data[k];
      }
    });
    if (this.isPassChanged()) {
      data.password = this.state.data.password;
    }
    return data;
  }

  update = () => {
    this.setState({...this.state, saving: true});
    const data = this.submissionData;
    userService
      .update(appState.user.id!, data)
      .then(res => {
        res.data.dateOfBirth = new Date(res.data.dateOfBirth);
        appState.user = res.data;
      })
      .catch(() => {
        uiService.toast('Failed to save changes!');
      })
      .finally(() => this.setState({...this.state, saving: false}));
  };
}
