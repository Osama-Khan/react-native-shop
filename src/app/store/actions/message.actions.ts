import {NewMessageType} from '../state/message-state';
import {ActionType} from './action.type';

type ReceivePayloadType = NewMessageType;
type ReceiveActionType = ActionType<'message/receive', ReceivePayloadType>;
type SeenPayloadType = number[];
type SeenActionType = ActionType<'message/seen', SeenPayloadType>;

export type MessageActionType = ReceiveActionType | SeenActionType;
const messageActions = {
  receiveMessage: (payload: ReceivePayloadType): ReceiveActionType => {
    return {
      type: 'message/receive',
      payload,
    };
  },
  seenMessage: (payload: SeenPayloadType): SeenActionType => {
    return {
      type: 'message/seen',
      payload,
    };
  },
};

export default messageActions;
