import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import {View} from 'react-native-animatable';
import {Title, Text, Switch, Button, Caption, Card} from 'react-native-paper';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import ListSelect from '../components/list-select';
import {ScreenProps} from '../components/stacked-screens';
import {CategoryType} from '../models/types/category.type';
import {ProductType} from '../models/types/product.types';

type PropType = ScreenProps & {
  onApply: (filters: StateType) => void;
  onClear: () => void;
};

type StateType = {
  sortBy: keyof ProductType;
  sortByOrder: 'ASC' | 'DESC';
  maxPrice: number;
  outOfStock: boolean;
  category?: CategoryType;
};

type SortByType = {name: string; value: keyof ProductType; icon: string};

type SortByOrderType = {
  name: string;
  value: 'ASC' | 'DESC';
  icon: string;
};

export default class FiltersScreen extends React.Component<
  PropType,
  StateType
> {
  state: StateType = {
    sortBy: 'title',
    sortByOrder: 'ASC',
    maxPrice: 100000,
    outOfStock: true,
  };

  render() {
    return (
      <View style={s.m16}>
        <Title style={s.textBold}>Filters</Title>
        <Caption>Adjust the filters and press apply.</Caption>
        <Card style={[s.p8]} mode="outlined">
          <this.SortFilter />
          <this.PriceRangeFilter />
          <View style={[s.row, s.my8]}>
            <Text>Show out of stock</Text>
            <Switch
              style={s.mlAuto}
              value={this.state.outOfStock}
              onValueChange={outOfStock =>
                this.setState({...this.state, outOfStock})
              }
            />
          </View>
        </Card>
        <View style={[s.row, s.mt8]}>
          <Button
            icon="backup-restore"
            color={colors.red}
            onPress={() => this.props.onClear()}>
            Reset
          </Button>
          <Button
            icon="check"
            style={s.mlAuto}
            onPress={() => this.props.onApply(this.state)}>
            Apply
          </Button>
        </View>
      </View>
    );
  }
  SortFilter = () => (
    <>
      <Text>Sort by</Text>
      <View style={[s.row]}>
        <View style={s.col8}>
          <ListSelect
            options={sortOptions}
            onSelect={v => this.setState({...this.state, sortBy: v.value})}
          />
        </View>
        <View style={s.col4}>
          <ListSelect
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
