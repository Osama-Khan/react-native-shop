import {MessageState} from '../state';
import {ActionType} from '../actions/action.type';

const initialState = new MessageState();

export default function MessageReducer(
  state = initialState,
  action: ActionType<string, any>,
) {
  switch (action.type) {
    case 'message/receive':
      const state = new MessageState(action.payload);
      state.newMessages.push(action.payload);
      return state;
  }
  return state;
}
