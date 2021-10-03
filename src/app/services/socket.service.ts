import messageActions from '../store/actions/message.actions';
import {io} from 'socket.io-client';
import store from '../store';
import {UserState} from '../store/state';
import ApiService from './api.service';

/** Service to provide a single socket for the entire application */
class SocketService extends ApiService {
  socket = io(this.domain);
  currentUser?: UserState;

  constructor() {
    super();
    store.subscribe(this.onUpdate);
  }

  private onUpdate = () => {
    const user = store.getState().user;
    if (user.token) {
      const userChanged = this.currentUser && user.id !== this.currentUser.id;
      if (userChanged) {
        // Refresh the socket since user has changed
        this.socket = io(super.domain);
      }
      if (!this.currentUser || userChanged) {
        this.currentUser = user;
        this.doPostLogin();
      }
    }
  };

  private doPostLogin = () => {
    this.socket.emit('login', this.currentUser!.id);
    this.socket.on('receiveMessage', dto => {
      store.dispatch(messageActions.receiveMessage(dto));
    });
  };
}

export default new SocketService();
