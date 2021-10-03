import {MessageState} from '../state';
import {ActionType} from '../actions/action.type';
import {MessageActionType} from '../actions/message.actions';

const initialState = new MessageState();

export default function MessageReducer(
  state = initialState,
  action: MessageActionType | ActionType<'', undefined>,
) {
  switch (action.type) {
    case 'message/receive':
      const newState = new MessageState(state.newMessages);
      newState.newMessages.push(action.payload);
      return newState;
    case 'message/seen':
      const ids: number[] = action.payload;
      const seenRemoved = new MessageState(
        state.newMessages.filter(m => !ids.includes(m.id)),
      );
      return seenRemoved;
  }
  return state;
}
