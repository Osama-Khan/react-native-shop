import React from 'react';
import {View} from 'react-native';
import {Button, Divider, TextInput} from 'react-native-paper';
import {Title} from 'react-native-paper';
import s from '../../../styles/styles';
import ListSelect from '../../components/list-select';
import LoadingSpinner from '../../components/loading/loading-spinner';
import Modal from '../../components/modal';
import {
  CityType,
  CountryType,
  StateType,
} from '../../models/types/address.type';
import locationService from '../../services/location.service';
import uiService from '../../services/ui.service';

type P = {
  visible: boolean;

  /** Called when modal is dismissed */
  onDismiss: () => void;

  /** Called when user adds an address */
  onAdd: (data: {tag: string; address: string; city: number}) => void;
};

type S = {
  address: string;
  tag: string;
  city?: number;
  state?: number;
  country?: number;
  cities?: CityType[];
  states?: StateType[];
  countries?: CountryType[];
};
type LocationType = CityType | StateType | CountryType;

/** Modal for adding an address */
export default class AddModal extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {address: '', tag: ''};
  }

  componentDidMount() {
    this.fetchCountries();
  }

  render() {
    return (
      <Modal visible={this.props.visible} onDismiss={this.props.onDismiss}>
        <View style={s.m8}>
          <Title>Add Address</Title>
          <Divider />
          <TextInput
            mode="outlined"
            label="Tag"
            value={this.state.tag}
            onChangeText={tag => this.setState({...this.state, tag})}
          />
          <TextInput
            mode="outlined"
            label="Street Address"
            value={this.state.address}
            onChangeText={address => this.setState({...this.state, address})}
          />
          <View style={s.my8} />
          <this.CountrySelect />
          <this.StateSelect />
          <this.CitySelect />
          <Divider style={s.my8} />
          <Button
            style={s.mlAuto}
            onPress={() => {
              const {tag, address, city} = this.state;
              this.props.onAdd({tag, address, city: city!});
            }}
            icon="plus"
            disabled={!this.isValid}>
            Add
          </Button>
        </View>
      </Modal>
    );
  }

  CountrySelect = () =>
    this.state.countries ? (
      <ListSelect
        onSelect={v => {
          const country = parseInt(v.value, 10);
          this.setState({
            ...this.state,
            country,
            state: undefined,
            states: undefined,
            city: undefined,
            cities: undefined,
          });
          this.fetchStates(country);
        }}
        options={this.locationsToOptions(
          this.state.countries,
          'Select a Country',
          this.state.country,
        )}
      />
    ) : (
      <LoadingSpinner />
    );

  StateSelect = () =>
    this.state.country !== undefined ? (
      this.state.states ? (
        <ListSelect
          onSelect={v => {
            const state = parseInt(v.value, 10);
            this.setState({
              ...this.state,
              state,
              city: undefined,
              cities: undefined,
            });
            this.fetchCities(state);
          }}
          options={this.locationsToOptions(
            this.state.states,
            'Select a State',
            this.state.state,
          )}
        />
      ) : (
        <LoadingSpinner />
      )
    ) : (
      <></>
    );
  CitySelect = () =>
    this.state.state !== undefined ? (
      this.state.cities ? (
        <ListSelect
          onSelect={v => {
            this.setState({
              ...this.state,
              city: parseInt(v.value, 10),
            });
          }}
          options={this.locationsToOptions(
            this.state.cities,
            'Select a City',
            this.state.city,
          )}
        />
      ) : (
        <LoadingSpinner />
      )
    ) : (
      <></>
    );
  locationsToOptions = (
    locs: LocationType[],
    defaultName: string,
    selectedId?: number,
  ) => {
    const defaultOption = {
      name: defaultName,
      value: '',
      disabled: true,
      selected: !!selectedId,
    };
    return [
      defaultOption,
      ...locs.map(l => this.locationToOption(l, selectedId === l.id)),
    ];
  };

  locationToOption = (l: LocationType, selected: boolean) => {
    return {
      name: l.name,
      value: '' + l.id,
      key: '' + l.id,
      selected: selected,
    };
  };

  fetchCountries = () => {
    locationService
      .getCountries()
      .then(res => {
        this.setState({...this.state, countries: res.data.data});
      })
      .catch(() => uiService.toast('Failed to fetch countries!'));
  };

  fetchStates = (country: number) => {
    if (country !== undefined) {
      locationService
        .getStates(country)
        .then(res => {
          this.setState({...this.state, states: res.data.data});
        })
        .catch(() => uiService.toast('Failed to fetch States!'));
    }
  };

  fetchCities = (state: number) => {
    if (state !== undefined) {
      locationService
        .getCities(state)
        .then(res => {
          this.setState({...this.state, cities: res.data.data});
        })
        .catch(() => uiService.toast('Failed to fetch Cities!'));
    }
  };

  get isValid() {
    return (
      this.state.tag &&
      this.state.address &&
      this.state.city !== undefined &&
      this.state.country !== undefined &&
      this.state.state !== undefined
    );
  }
}
