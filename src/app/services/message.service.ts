import axios from 'axios';
import Criteria from '../models/criteria';
import {MessageType} from '../models/types/message.type';
import ApiService from './api.service';
import socketService from './socket.service';

class MessageService extends ApiService {
  endpoint = this.domain + '/messages';

  fetchMessages = async (criteria?: Criteria<MessageType>) => {
    const critStr = criteria?.getUrlParameters() || '';
    const ret = await axios.get(this.endpoint + critStr);
    return ret;
  };

  /** Emits sendMessage event to the socket
   * @param message Message to emit
   * @param to ID of the thread to send message to
   */
  sendMessage = (message: string, to: string) => {
    socketService.socket.emit('sendMessage', message, to);
  };
}

export default new MessageService();
