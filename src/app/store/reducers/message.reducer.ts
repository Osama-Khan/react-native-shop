import {MessageState} from '../state';
import {ActionType} from '../actions/action.type';

const initialState = new MessageState();

export default function MessageReducer(
  state = initialState,
  action: ActionType<string, any>,
) {
  switch (action.type) {
    case 'message/receive':
      const newState = new MessageState(state.newMessages);
      newState.newMessages.push(action.payload);
      return newState;
  }
  return state;
}
