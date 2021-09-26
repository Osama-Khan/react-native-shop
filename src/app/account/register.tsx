import {Formik, FormikContext} from 'formik';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Caption, TextInput as TI, Title} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import s from '../../styles/styles';
import {DatePickerInputFormik} from '../components/pickers';
import themeService from '../services/theme.service';
import uiService from '../services/ui.service';
import userService from '../services/user.service';

type P = {backToLogin: () => void};
type S = {
  datePickerShown: boolean;
  loading: boolean;
  valid: boolean;
};

const initialFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  dateOfBirth: '',
};

export default class Register extends React.Component<P, S> {
  static contextType = FormikContext;

  state: S = {
    datePickerShown: false,
    loading: false,
    valid: false,
  };
  render() {
    return (
      <View style={s.flex}>
        <ScrollView style={s.p16}>
          <Title style={s.textBold}>Register</Title>
          <Caption>Create an account </Caption>
          <Formik
            initialValues={initialFormValues}
            onSubmit={this.register}
            validate={this.validateForm}>
            {({
              handleChange,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              values,
            }) => (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    label="First Name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    error={touched.firstName && !!errors.firstName}
                    style={[s.flex, s.mr4]}
                  />
                  <TextInput
                    label="Last Name"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    error={touched.lastName && !!errors.lastName}
                    value={values.lastName}
                    style={[s.flex, s.ml4]}
                  />
                </View>
                <TextInput
                  label="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={touched.username && !!errors.username}
                />
                <TextInput
                  label="Email"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && !!errors.email}
                />
                <TextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && !!errors.password}
                  secureTextEntry
                />
                <DatePickerInputFormik
                  propKey="dateOfBirth"
                  label="Date Of Birth"
                />
                <Button
                  icon="check"
                  mode="contained"
                  style={s.mt8}
                  onPress={handleSubmit}
                  disabled={!this.state.valid || this.state.loading}
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
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }

  register = (data: typeof initialFormValues) => {
    this.setState({...this.state, loading: true});
    userService
      .register(data)
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

  validateForm = (values: {[key: string]: string}) => {
    const errors: any = {};
    let hasError = false;

    Object.keys(values).forEach(k => {
      if (!values[k]) {
        hasError = true;
        errors[k] = 'Required';
      }
    });

    // Trigger setState only when validity state changes
    if (this.state.valid && hasError) {
      this.setState({...this.state, valid: false});
    }
    if (!this.state.valid && !hasError) {
      this.setState({...this.state, valid: true});
    }

    return errors;
  };
}

const TextInput = (props: Partial<TextInputProps>) => (
  <TI {...props} style={[s.my8, ...[props.style]]} />
);
