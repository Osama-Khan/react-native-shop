import axios from 'axios';
import Criteria from '../models/criteria';
import {MessageType} from '../models/types/message.type';
import ApiService from './api.service';

class MessageService extends ApiService {
  endpoint = this.domain + '/messages';

  async fetchMessages(criteria?: Criteria<MessageType>) {
    const critStr = criteria?.getUrlParameters() || '';
    const ret = await axios.get(this.endpoint + critStr);
    return ret;
  }
}

export default new MessageService();
