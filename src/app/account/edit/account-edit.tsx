import React from 'react';
import {View} from 'react-native';
import {Button, Caption, Divider, TextInput} from 'react-native-paper';
import s from '../../../styles/styles';
import DatePicker from 'react-native-date-picker';
import Modal from '../../components/modal/modal';
import colors from '../../../styles/colors';
import UserState from '../../store/state/user-state';
import userService from '../../services/user.service';
import uiService from '../../services/ui.service';
import ImageEditor from './account-edit-image';
import {AppStateType} from '../../store/state';
import {connect} from 'react-redux';
import userActions from '../../store/actions/user.actions';
import themeService from '../../services/theme.service';

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

class AccountEdit extends React.Component<any, StateType> {
  modifiedDate: Date;

  constructor(props: any) {
    super(props);
    const u = this.props.user;
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
    this.modifiedDate = u.dateOfBirth!;
  }

  render() {
    const data = this.state.data;
    const DateModal = () => (
      <Modal
        visible={this.state.dobModalShown}
        onDismiss={() => {
          this.setState({
            ...this.state,
            dobModalShown: false,
          });
        }}>
        <>
          <DatePicker
            date={data.dateOfBirth}
            androidVariant={
              themeService.currentThemeName === 'dark'
                ? 'nativeAndroid'
                : 'iosClone'
            }
            maximumDate={this.getMaxDate()}
            style={s.alignCenter}
            onDateChange={dateOfBirth => {
              this.modifiedDate = dateOfBirth;
            }}
            mode="date"
          />
          <Divider style={s.my8} />
          <Button
            style={[s.mlAuto, s.m4]}
            onPress={() =>
              this.setState({
                ...this.state,
                dobModalShown: false,
                data: {...data, dateOfBirth: this.modifiedDate},
              })
            }>
            Apply
          </Button>
        </>
      </Modal>
    );
    return (
      <>
        <View style={s.center}>
          <ImageEditor
            currentImg={data.profileImage!}
            userImage={this.props.user.profileImage}
            onPick={profileImage =>
              this.setState({...this.state, data: {...data, profileImage}})
            }
          />
        </View>
        <Divider />
        <Caption style={[s.m8, s.mt8]}>Personal Information</Caption>
        <View style={s.row}>
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
        <View>
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
    this.props.user.dateOfBirth?.toDateString();

  isFieldChanged = (fieldName: keyof UserStateEditable) =>
    this.state.data[fieldName] !== this.props.user[fieldName];

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
      .update(this.props.user.id!, data)
      .then(() => {
        const user = {...this.props.user, ...data};
        this.props.dispatch(userActions.setUser(user));
      })
      .catch(() => {
        uiService.toast('Failed to save changes!');
      })
      .finally(() => this.setState({...this.state, saving: false}));
  };
}

const mapStateToProps = (state: AppStateType) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(AccountEdit);
