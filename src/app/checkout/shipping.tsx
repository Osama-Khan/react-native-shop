import React from 'react';
import {createRef} from 'react';
import {List, Menu, ProgressBar} from 'react-native-paper';
import {connect} from 'react-redux';
import {AddressType} from '../models/types/address.type';
import addressService from '../services/address.service';
import settingService from '../services/setting.service';
import uiService from '../services/ui.service';
import {AppStateType} from '../store/state';

type PropType = {
  onSelectAddress: (address: AddressType) => void;
  readonly userId?: number;
};

type StateType = {
  address?: AddressType;
  addresses?: AddressType[];
  loaded: boolean;
  menuOpen: boolean;
};

class Shipping extends React.Component<PropType, StateType> {
  editAddressRef: any;

  constructor(props: PropType) {
    super(props);
    this.state = {loaded: false, menuOpen: false};
    this.editAddressRef = createRef();
  }
  componentDidMount() {
    const user = this.props.userId;
    if (user) {
      settingService
        .getDefaultAddress(user)
        .then(setRes => {
          this.changeAddress(setRes.data);
        })
        .catch(() => uiService.toast('Failed to fetch default address'));
      addressService
        .getAddresses(user)
        .then(res => {
          this.setState({...this.state, addresses: res.data.data});
        })
        .catch(() => uiService.toast('Failed to fetch addresses'));
    }
  }

  render() {
    if (!this.state.loaded) {
      return <ProgressBar indeterminate={true} />;
    }
    const adr = this.state.address;
    const noAddr = !adr && this.state.loaded;
    const title = noAddr
      ? 'No default address'
      : `Order will be shipped to ${adr?.tag}`;
    const desc = noAddr ? 'Tap to choose one' : `${adr?.address}, ${adr?.city}`;
    return (
      <List.Section title="Shipping">
        <List.Item
          title={title}
          right={() => <this.AddressSelectionMenu />}
          description={desc}
          onPress={() => {
            this.setState({...this.state, menuOpen: true});
          }}
        />
      </List.Section>
    );
  }

  AddressSelectionMenu = () => (
    <Menu
      anchor={<List.Icon icon="pencil" />}
      onDismiss={() => this.setState({...this.state, menuOpen: false})}
      visible={this.state.menuOpen}>
      {this.state.addresses?.map(addr => (
        <Menu.Item
          key={addr.id}
          title={addr.tag}
          onPress={() => {
            this.changeAddress(addr);
            this.setState({...this.state, menuOpen: false});
          }}
        />
      )) || <Menu.Item title="Loading" disabled />}
    </Menu>
  );

  changeAddress = (address: AddressType) => {
    this.setState({...this.state, loaded: false});
    addressService
      .getAddress(address.id)
      .then(addRes => {
        this.setState({address: addRes.data, loaded: true});
        this.props.onSelectAddress(addRes.data);
      })
      .catch(() => uiService.toast('Failed to fetch address'));
  };
}

const mapStateToProps = (state: AppStateType) => {
  return {userId: state.user.id};
};

export default connect(mapStateToProps)(Shipping);
