import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import {View} from 'react-native';
import {
  Caption,
  Divider,
  Title,
  Text,
  Button,
  Switch,
} from 'react-native-paper';
import colors from '../../../../styles/colors';
import s from '../../../../styles/styles';
import {ProductType} from '../../../models/types/product.types';
import DropDown from '../../dropdown/dropdown';
import Modal from '../../modal/modal';

type PropType = {
  onApply: (filters: StateType) => void;
  onClear: () => void;
  onDismiss: () => void;
  visible: boolean;
};
type StateType = {
  sortBy: keyof ProductType;
  sortByOrder: 'ASC' | 'DESC';
  maxPrice: number;
  outOfStock: boolean;
};
type SortByType = {name: string; value: keyof ProductType; icon: string};
type SortByOrderType = {
  name: string;
  value: 'ASC' | 'DESC';
  icon: string;
};

export default class ProductFiltersModal extends React.Component<
  PropType,
  StateType
> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      sortBy: 'title',
      sortByOrder: 'ASC',
      maxPrice: 100000,
      outOfStock: true,
    };
  }

  render() {
    return (
      <Modal visible={this.props.visible} onDismiss={this.props.onDismiss}>
        <View style={s.m8}>
          <Title style={s.textBold}>Filters</Title>
          <Divider />
          <this.SortFilter />
          <this.PriceRangeFilter />
          <View style={[s.row, s.mb8]}>
            <Text>Show out of stock</Text>
            <Switch
              style={s.mlAuto}
              value={this.state.outOfStock}
              onValueChange={outOfStock =>
                this.setState({...this.state, outOfStock})
              }
            />
          </View>
          <Divider />
          <View style={[s.row, s.mt8]}>
            <Button
              icon="backup-restore"
              color={colors.red}
              onPress={() => this.props.onClear()}>
              Reset
            </Button>
            <Button
              mode="contained"
              icon="check"
              style={s.mlAuto}
              onPress={() => this.props.onApply(this.state)}>
              Apply
            </Button>
          </View>
        </View>
      </Modal>
    );
  }

  SortFilter = () => (
    <>
      <Text>Sort by</Text>
      <View style={[s.row]}>
        <View style={s.col8}>
          <DropDown
            options={sortOptions}
            onSelect={v => this.setState({...this.state, sortBy: v.value})}
          />
        </View>
        <View style={s.col4}>
          <DropDown
            options={sortOrderOptions}
            onSelect={v => this.setState({...this.state, sortByOrder: v.value})}
          />
        </View>
      </View>
    </>
  );

  PriceRangeFilter = () => {
    const max = this.state.maxPrice;
    return (
      <>
        <Text>Maximum Price</Text>
        <Caption style={s.textCenter}>Rs. {max === 100000 ? '∞' : max}</Caption>
        <MultiSlider
          containerStyle={s.center}
          values={[max]}
          selectedStyle={{backgroundColor: colors.primaryLight}}
          markerStyle={{backgroundColor: colors.primaryLight}}
          min={5000}
          max={100000}
          enabledOne={true}
          step={100}
          snapped={true}
          onValuesChange={v => this.setState({...this.state, maxPrice: v[0]})}
        />
      </>
    );
  };
}

const sortOptions: SortByType[] = [
  {
    name: 'Title',
    value: 'title',
    icon: 'format-color-text',
  },
  {
    name: 'Price',
    value: 'price',
    icon: 'currency-usd',
  },
  {
    name: 'Rating',
    value: 'rating',
    icon: 'star',
  },
  {
    name: 'Likes',
    value: 'favorites',
    icon: 'heart',
  },
];

const sortOrderOptions: SortByOrderType[] = [
  {
    name: 'Ascending',
    value: 'ASC',
    icon: 'sort-alphabetical-ascending',
  },
  {
    name: 'Descending',
    value: 'DESC',
    icon: 'sort-alphabetical-descending',
  },
];
