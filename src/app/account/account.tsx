import React from 'react';
import Profile from './profile';
import Login from './login';
import storageService from '../services/storage.service';
import {AppStateType} from '../store/state';
import {connect} from 'react-redux';
import userActions from '../store/actions/user.actions';

class Account extends React.Component<any, any> {
  passwordRef: any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.user.token ? (
      <Profile
        onLogout={() => {
          this.props.dispatch(userActions.clearUser());
          storageService.clearUserToken();
        }}
        navigation={this.props.navigation}
      />
    ) : (
      <Login onLogin={() => this.setState({})} />
    );
  }
}

function mapStateToProps(state: AppStateType) {
  return {user: state.user};
}

export default connect(mapStateToProps)(Account);
