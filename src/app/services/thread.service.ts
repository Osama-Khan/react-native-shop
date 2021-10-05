import axios from 'axios';
import Criteria from '../models/criteria';
import {ThreadType} from '../models/types/thread.type';
import ApiService from './api.service';

class ThreadService extends ApiService {
  endpoint = this.domain + '/threads';

  /** Fetches threads where the given user is a participant
   * @param id ID of the user to fetch threads of
   * @param criteria Criteria to filter the results
   */
  async fetchThreadsOf(id: number, criteria?: Criteria<ThreadType>) {
    const endpoint = this.endpoint + '/user/' + id;
    const critStr = criteria?.getUrlParameters() || '';
    const ret = await axios.get(endpoint + critStr);
    return ret;
  }

  /** Starts a thread with the given message */
  async startThread(thread: {from: number; to: number}, message: string) {
    const ret = await axios.put(this.endpoint, {thread, message});
    return ret;
  }
}

export default new ThreadService();
