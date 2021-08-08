import React from 'react';
import appState from '../state/state';
import Profile from './profile';
import UserState from '../state/user-state';
import Login from './login';

export default class Account extends React.Component<any, any> {
  passwordRef: any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return appState.user.token ? (
      <Profile
        onLogout={() => {
          appState.user = new UserState();
          this.setState({...this.state});
        }}
        navigation={this.props.navigation}
      />
    ) : (
      <Login onLogin={() => this.setState({})} />
    );
  }
}
