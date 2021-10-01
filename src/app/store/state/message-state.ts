type NewMessageType = {
  /** ID of the user who sent the message */
  sender: number;
  /** Content of the message */
  message: string;
  /** Time the message was sent at */
  time: Date;
};

export default class MessageState {
  /** Object containing details of new messages */
  newMessages: NewMessageType[];

  constructor(messages: NewMessageType[] = []) {
    this.newMessages = messages;
  }
}
