import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {createRef} from 'react';
import {List, Menu, ProgressBar} from 'react-native-paper';
import {connect} from 'react-redux';
import {addressesRoute} from '../account/account.routes';
import {AddressType} from '../models/types/address.type';
import addressService from '../services/address.service';
import settingService from '../services/setting.service';
import uiService from '../services/ui.service';
import {AppStateType} from '../store/state';

type PropType = {
  onSelectAddress: (address: AddressType) => void;
  navigation: NavigationProp<any>;
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
    this.props.navigation.addListener('focus', () => {
      this.state = {loaded: false, menuOpen: false};
      this.fetchAddresses();
    });
    this.state = {loaded: false, menuOpen: false};
    this.editAddressRef = createRef();
  }

  fetchAddresses() {
    const user = this.props.userId;
    if (user) {
      settingService
        .getDefaultAddress(user)
        .then(setRes => {
          this.changeAddress(setRes.data);
        })
        .catch(() => {
          uiService.toast('Failed to fetch default address');
          this.setState({...this.state, loaded: true});
        });
      addressService
        .getAddresses(user)
        .then(res => {
          this.setState({...this.state, addresses: res.data.data});
        })
        .catch(() => uiService.toast('Failed to fetch addresses'));
    }
  }

  render() {
    if (!this.state.loaded || !this.state.addresses) {
      return <ProgressBar indeterminate={true} />;
    }
    const adr = this.state.address;
    const noAddr = !adr && this.state.loaded;
    const title = noAddr ? 'No default address' : `Shipping to ${adr?.tag}`;
    const desc = noAddr
      ? 'Tap to select shipping address'
      : `${adr?.address}, ${adr?.city}`;
    return (
      <List.Section title="Shipping">
        {this.state.addresses.length > 0 ? (
          <List.Item
            title={title}
            right={() => <this.AddressSelectionMenu />}
            description={desc}
            onPress={() => {
              this.setState({...this.state, menuOpen: true});
            }}
          />
        ) : (
          <List.Item
            title={"You don't have any addresses"}
            right={() => <List.Icon icon="plus" />}
            description={'Tap to add an address'}
            onPress={() => {
              this.props.navigation.navigate(addressesRoute.name);
            }}
          />
        )}
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
