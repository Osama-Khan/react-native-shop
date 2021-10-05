import {EntityType} from './abstract.type';
import {ThreadType} from './thread.type';
import {UserType} from './user.types';

export type MessageType = EntityType & {
  /** ID of the message */
  id: number;

  /** Content of the message */
  message: string;

  /** Thread the message belongs to */
  thread?: ThreadType;

  /** User that sent the message */
  sender?: UserType;

  /** Time the message was seen at */
  seenAt?: Date;
};
