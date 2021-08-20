import UserState from '../../state/user-state';
import {ActionType} from '../actions/action.type';

const initialState = new UserState();

export default function UserReducer(
  state = initialState,
  action: ActionType<string, any>,
) {
  switch (action.type) {
    case 'user/set':
      return new UserState(action.payload);
    case 'user/clear':
      return new UserState();
  }
  return state;
}
