import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Card,
  Divider,
  TextInput as TI,
  Title,
} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import s from '../../styles/styles';
import DatePickerModal from '../components/modal/date-picker.modal';
import themeService from '../services/theme.service';
import uiService from '../services/ui.service';
import userService from '../services/user.service';

type P = {backToLogin: () => void};
type S = {
  datePickerShown: boolean;
  loading: boolean;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
};

export default class Register extends React.Component<P, S> {
  state: S = {
    datePickerShown: false,
    loading: false,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
  };
  render() {
    return (
      <View style={s.flex}>
        <ScrollView>
          <Card style={[s.p8, s.m8]}>
            <Title style={[s.m4, s.textBold]}>Register</Title>
            <Divider />
            <View style={[s.row, s.mt8, {justifyContent: 'space-between'}]}>
              <TextInput
                label="First Name"
                style={{width: '48%'}}
                value={this.state.firstName}
                onChangeText={firstName =>
                  this.setState({
                    ...this.state,
                    firstName,
                  })
                }
              />
              <TextInput
                label="Last Name"
                style={{width: '48%'}}
                value={this.state.lastName}
                onChangeText={lastName =>
                  this.setState({
                    ...this.state,
                    lastName,
                  })
                }
              />
            </View>
            <TextInput
              label="Username"
              value={this.state.username}
              onChangeText={username =>
                this.setState({
                  ...this.state,
                  username,
                })
              }
            />
            <TextInput
              label="Email"
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={email =>
                this.setState({
                  ...this.state,
                  email,
                })
              }
            />
            <TextInput
              label="Password"
              value={this.state.password}
              onChangeText={password =>
                this.setState({
                  ...this.state,
                  password,
                })
              }
              secureTextEntry
            />
            <TouchableOpacity
              onPress={() =>
                this.setState({...this.state, datePickerShown: true})
              }>
              <TextInput
                label="Date of Birth"
                editable={false}
                value={
                  this.state.dateOfBirth
                    ? new Date(this.state.dateOfBirth).toLocaleDateString()
                    : ''
                }
              />
            </TouchableOpacity>
            <Button
              icon="check"
              mode="contained"
              onPress={this.register}
              disabled={this.isFormInvalid || this.state.loading}
              loading={this.state.loading}>
              Register
            </Button>
            <Button
              icon="chevron-left"
              mode="contained"
              style={s.mt8}
              disabled={this.state.loading}
              color={themeService.currentTheme.colors.border}
              onPress={this.props.backToLogin}>
              Back to Login
            </Button>
          </Card>
        </ScrollView>
        <DatePickerModal
          onDismiss={() =>
            this.setState({...this.state, datePickerShown: false})
          }
          onPick={date => {
            const dateOfBirth = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
            this.setState({
              ...this.state,
              dateOfBirth,
              datePickerShown: false,
            });
          }}
          visible={this.state.datePickerShown}
        />
      </View>
    );
  }

  register = () => {
    const {datePickerShown, loading, ...registerData} = this.state;
    if (this.isFormInvalid) {
      uiService.toast('Please fill in all the fields!');
      return;
    }
    this.setState({...this.state, loading: true});
    userService
      .register(registerData)
      .then(() => {
        uiService.toast(
          'Your account has been registered, you may now log in!',
        );
        this.setState({loading: false, datePickerShown: false});
        return;
      })
      .catch(e =>
        uiService.toast(
          'Account registration failed! Error: ' + e.response.status,
        ),
      );
  };

  get isFormInvalid() {
    const {datePickerShown, loading, ...registerData} = this.state as any;
    return Object.keys(registerData).some(k => !registerData[k]);
  }
}

const TextInput = (props: Partial<TextInputProps>) => (
  <TI {...props} style={[s.my8, ...[props.style]]} />
);
