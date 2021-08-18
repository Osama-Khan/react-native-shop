import {AxiosResponse} from 'axios';
import React from 'react';
import {List} from 'react-native-paper';
import {BottomUpModal as Modal} from '../../components/modal';
import addressService from '../../services/address.service';
import settingService from '../../services/setting.service';
import uiService from '../../services/ui.service';
import appState from '../../state/state';

type PropType = {
  visible: boolean;
  /** Called with id of the new address when default address is changed */
  onDefault: (id: number) => void;

  /** Called with axios response when an address is deleted */
  onDelete: (res: AxiosResponse) => void;

  /** Called when "Close" is selected from the popup or modal is dismissed */
  onDismiss: () => void;

  /** ID of the address being managed */
  addressId?: number;
};

/** Modal for managing addresses */
export default class ManageModal extends React.Component<PropType> {
  render() {
    if (!this.props.addressId) {
      return <></>;
    }
    return (
      <Modal visible={this.props.visible} onDismiss={this.props.onDismiss}>
        <List.Item
          title="Set as Default"
          left={() => <List.Icon icon="check" />}
          onPress={this.onDefault}
        />
        <List.Item
          title="Delete"
          onPress={this.onDelete}
          left={() => <List.Icon icon="trash-can" />}
        />
        <List.Item
          title="Close"
          left={() => <List.Icon icon="close" />}
          onPress={this.props.onDismiss}
        />
      </Modal>
    );
  }

  onDefault = () => {
    settingService
      .setDefaultAddress(appState.user.id!, this.props.addressId!)
      .then(() => this.props.onDefault(this.props.addressId!))
      .catch(() => uiService.toast('Could not set default address!'));
  };
  onDelete = () => {
    addressService
      .deleteAddress(this.props.addressId!)
      .then(this.props.onDelete)
      .catch(() => uiService.toast('Could not delete address!'));
  };
}
