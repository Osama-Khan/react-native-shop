import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Title,
  Text,
  Divider,
  TextInput,
  Switch,
  Button,
  FAB,
  Card,
  Caption,
} from 'react-native-paper';
import {connect} from 'react-redux';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import Logo from '../components/svg/logo';
import uiService from '../services/ui.service';
import userService from '../services/user.service';
import userActions from '../store/actions/user.actions';
import UserState from '../store/state/user-state';
import {settingsRoute} from './account.routes';

type PropType = {
  dispatch: any;
  navigation: NavigationProp<any>;
};
type StateType = {
  username: string;
  password: string;
  remember: boolean;
  loading: boolean;
};

class Login extends React.Component<PropType, StateType> {
  passwordRef: any;

  constructor(props: PropType) {
    super(props);
    this.state = {username: '', password: '', remember: false, loading: false};
    this.passwordRef = React.createRef();
  }

  render() {
    const logoSize = 92;
    return (
      <View style={s.flex}>
        <ScrollView
          style={[s.p8, {minHeight: '100%'}]}
          contentContainerStyle={{justifyContent: 'center'}}>
          <Card style={[s.p8, {marginTop: logoSize * 0.8}]} mode="outlined">
            <Card
              mode="outlined"
              style={[
                s.alignCenter,
                s.center,
                s.top,
                s.p8,
                s.roundedFull,
                {
                  top: -logoSize * 0.84,
                  width: logoSize * 1.24,
                  height: logoSize * 1.24,
                },
              ]}>
              <Logo size={logoSize} />
            </Card>
            <Title style={[s.textCenter, {marginTop: logoSize * 0.64}]}>
              Login
            </Title>
            <Text style={[s.textCenter, s.textMuted]}>
              Please enter your account details.
            </Text>
            <Divider style={s.mt8} />
            <TextInput
              label="Username"
              style={s.mt8}
              value={this.state.username}
              mode="outlined"
              onSubmitEditing={() => this.passwordRef.current.focus()}
              onChangeText={username =>
                this.setState({
                  ...this.state,
                  username,
                })
              }
            />
            <TextInput
              label="Password"
              style={s.mt8}
              value={this.state.password}
              mode="outlined"
              secureTextEntry={true}
              onSubmitEditing={this.login}
              ref={this.passwordRef}
              onChangeText={password =>
                this.setState({
                  ...this.state,
                  password,
                })
              }
            />
            <View style={[s.m4, s.row]}>
              <Text style={[s.m4]}>Remember me</Text>
              <Switch
                value={this.state.remember}
                onValueChange={remember =>
                  this.setState({
                    ...this.state,
                    remember,
                  })
                }
              />
              <Caption style={[s.mlAuto, {textDecorationLine: 'underline'}]}>
                Forgot Password?
              </Caption>
            </View>
            <Button
              mode="contained"
              loading={this.state.loading}
              disabled={
                this.state.loading ||
                !this.state.username ||
                !this.state.password
              }
              style={s.mt8}
              color={colors.primary}
              onPress={this.login}>
              Login
            </Button>
          </Card>
        </ScrollView>
        <FAB
          icon="cog"
          style={[s.bottomRight, s.m8]}
          onPress={() => this.props.navigation.navigate(settingsRoute.name)}
        />
      </View>
    );
  }
  login = () => {
    this.setState({...this.state, loading: true});
    const {username, password, remember} = this.state;
    if (!username || !password) {
      ToastAndroid.show('Please fill in both fields.', ToastAndroid.SHORT);
      return;
    }

    userService
      .login(username, password, remember)
      .then(res => {
        const user = UserState.fromJson(res.data);
        this.setState({...this.state, loading: false});
        this.props.dispatch(userActions.setUser(user));
      })
      .catch(e => {
        const rc = e.response.status;
        uiService.toast(
          rc === 401
            ? 'Username and password combination is not valid!'
            : "We couldn't log you in!",
        );
        this.setState({...this.state, loading: false});
      });
  };
}

export default connect()(Login);
