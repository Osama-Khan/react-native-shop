import React from 'react';
import {FAB, List} from 'react-native-paper';
import s from '../../../styles/styles';
import ListingComponent from '../../components/listing/listing';
import Criteria from '../../models/criteria';
import IconMessageView from '../../components/icon-message-view/icon-message-view';
import {AddressType} from '../../models/types/address.type';
import addressService from '../../services/address.service';
import styles from '../../../styles/styles';
import ManageModal from './manage-modal';
import AddModal from './add-modal';
import uiService from '../../services/ui.service';
import settingService from '../../services/setting.service';
import {connect} from 'react-redux';
import {AppStateType} from '../../store/state';
import {View} from 'react-native-animatable';

type P = {readonly userId?: number};
type S = {
  defaultId?: number;
  addVisible: boolean;
  manageVisible: boolean;
  updateCount: number;
  /** Holds ID of the address currently being managed using ManageModal */
  selectedAddress?: number;
};

class UserAddresses extends React.Component<P, S> {
  criteria: Criteria<AddressType>;

  constructor(props: any) {
    super(props);
    this.criteria = new Criteria<AddressType>();
    this.criteria.addFilter('user', this.props.userId!);
    this.state = {
      addVisible: false,
      manageVisible: false,
      updateCount: 0,
    };
  }

  componentDidMount() {
    this.fetchDefaultAddress();
  }

  render() {
    return (
      <>
        <ListingComponent
          container={address => (
            <this.Item address={address} key={address.id} />
          )}
          fetchMethod={c => addressService.getAddresses(this.props.userId!, c)}
          criteria={this.criteria}
          listProps={{
            ListFooterComponent: () => <View style={{paddingTop: 64}} />,
          }}
          noResultsView={() => (
            <IconMessageView
              icon="home-group"
              title="No Addresses"
              caption="You don't have any addresses stored"
              btnProps={{
                text: 'Add Address',
                icon: 'home-plus',
                action: this.showAddModal,
              }}
            />
          )}
          updateCount={this.state.updateCount}
        />
        <FAB
          style={[styles.bottomRight, styles.m8]}
          icon="plus"
          onPress={this.showAddModal}
        />
        <ManageModal
          visible={this.state.manageVisible}
          onDismiss={this.hideManageModal}
          onDefault={defaultId => {
            this.setState({...this.state, defaultId});
            this.hideManageModal();
          }}
          onDelete={() => {
            this.triggerUpdate();
            this.hideManageModal();
          }}
          addressId={this.state.selectedAddress}
          userId={this.props.userId}
        />
        <AddModal
          visible={this.state.addVisible}
          onAdd={data => {
            addressService
              .addAddress({user: this.props.userId!, ...data})
              .then(() => {
                this.triggerUpdate();
                this.hideAddModal();
              })
              .catch(() => uiService.toast('Could not add address!'));
          }}
          onDismiss={this.hideAddModal}
        />
      </>
    );
  }

  Item = ({address}: {address: AddressType}) => {
    const isDefault = address.id === this.state.defaultId;
    return (
      <List.Item
        style={s.card}
        title={address.tag}
        titleStyle={isDefault ? s.textBold : {}}
        description={address.address}
        onPress={() => this.showManageModal(address.id)}
        onLongPress={() => this.showManageModal(address.id)}
        right={() => (isDefault ? <List.Icon icon="check-bold" /> : <></>)}
      />
    );
  };

  fetchDefaultAddress = () => {
    settingService
      .getDefaultAddress(this.props.userId!)
      .then(res => {
        this.setState({...this.state, defaultId: res.data.id});
      })
      .catch(() => {
        uiService.toast('Could not fetch default address');
      });
  };

  triggerUpdate = () => {
    this.setState({
      ...this.state,
      updateCount: this.state.updateCount + 1,
    });
  };

  showAddModal = () => this.setState({...this.state, addVisible: true});
  hideAddModal = () => this.setState({...this.state, addVisible: false});
  showManageModal = (forId: number) =>
    this.setState({...this.state, selectedAddress: forId, manageVisible: true});
  hideManageModal = () => this.setState({...this.state, manageVisible: false});
}

const mapStateToProps = (state: AppStateType) => {
  return {userId: state.user.id};
};

export default connect(mapStateToProps)(UserAddresses);
