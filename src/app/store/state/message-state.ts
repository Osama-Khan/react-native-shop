import {MessageType} from '@app/models/types/message.type';
import {ThreadType} from '@app/models/types/thread.type';
import {UserType} from '@app/models/types/user.types';

/** Type that contains an optimized version of Message relations to reduce
 * data usage
 */
export type NewMessageType = MessageType & {
  /** Object with ID of the user who sent the message */
  sender: Pick<UserType, 'id'>;
  /** Object with ID of the thread the message was sent to */
  thread: Pick<ThreadType, 'id'>;
};

export default class MessageState {
  /** Object containing details of new messages */
  newMessages: NewMessageType[];

  constructor(messages: NewMessageType[] = []) {
    this.newMessages = messages;
  }
}
