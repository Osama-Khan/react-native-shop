import {EntityType} from './abstract.type';
import {MessageType} from './message.type';
import {UserType} from './user.types';

export type ThreadType = EntityType & {
  /** ID of the thread */
  id: number;

  /** Messages in the thread */
  messages?: MessageType[];

  /** Latest message of the thread */
  latestMessage?: MessageType;

  /** User that received the thread */
  to?: UserType;

  /** User that started the thread by sending the first message */
  from?: UserType;

  /** Time the thread was created at */
  createdAt: Date;

  /** Time of the last update to the thread */
  updatedAt: Date;
};
