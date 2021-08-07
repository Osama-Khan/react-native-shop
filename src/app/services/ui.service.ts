import {ToastAndroid} from 'react-native';

/**
 * Service that provides methods related to UI feedback
 */
class UiService {
  toast = (msg: string, short = true) =>
    ToastAndroid.show(msg, short ? ToastAndroid.SHORT : ToastAndroid.LONG);
}

export default new UiService();
