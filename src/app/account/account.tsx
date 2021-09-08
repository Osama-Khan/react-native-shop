import React from 'react';
import Profile from './profile';
import Login from './login';
import storageService from '../services/storage.service';
import {AppStateType} from '../store/state';
import {connect} from 'react-redux';
import userActions from '../store/actions/user.actions';
import Register from './register';

type S = {showingLogin: boolean};
class Account extends React.Component<any, S> {
  state = {showingLogin: true};
  passwordRef: any;

  render() {
    return this.props.user.token ? (
      <Profile
        onLogout={() => {
          this.props.dispatch(userActions.clearUser());
          storageService.clearUserToken();
        }}
        navigation={this.props.navigation}
      />
    ) : this.state.showingLogin ? (
      <Login
        navigation={this.props.navigation}
        createAccount={() => this.setState({showingLogin: false})}
      />
    ) : (
      <Register backToLogin={() => this.setState({showingLogin: true})} />
    );
  }
}

function mapStateToProps(state: AppStateType) {
  return {user: state.user};
}

export default connect(mapStateToProps)(Account);
