import React from 'react';
import {View} from 'react-native';
import {
  Surface,
  Divider,
  Caption,
  Button,
  Title,
  FAB,
  ToggleButton,
} from 'react-native-paper';
import s from '../../../styles/styles';
import Modal from '../../components/modal/modal';
import Criteria from '../../models/criteria';
import {OrderType} from '../../models/types/order.types';
import appState from '../../state/state';
import orderRoutes from './order.routes';
import colors from '../../../styles/colors';
import ListingComponent from '../../components/listing/listing';
import orderService from '../../services/order.service';
import OrderCard from './order-card';
import IconMessageView from '../../components/icon-message-view/icon-message-view';
import ListSelect from '../../components/list-select';

type StateType = {
  navIndex: number;
  criteria: Criteria<OrderType>;
  showFilters: boolean;
};
type FilterType = {
  orderBy: keyof OrderType;
  orderDir: 'ASC' | 'DESC';
};

export default class extends React.Component<any, StateType> {
  filters: FilterType = {
    orderBy: 'updatedAt',
    orderDir: 'DESC',
  };

  constructor(props: any) {
    super(props);
    this.state = {
      navIndex: 0,
      criteria: this.generateCriteria(),
      showFilters: false,
    };
    this.props.navigation.setOptions({title: 'Orders In Progress'});
  }

  componentDidUpdate(_: any, prevState: StateType) {
    if (this.state.navIndex !== prevState.navIndex) {
      this.props.navigation.setOptions({
        title: 'Orders ' + orderRoutes[this.state.navIndex].title,
      });
    }
  }

  render() {
    return (
      <>
        <View style={s.flex}>
          <ListingComponent
            criteria={this.state.criteria}
            fetchMethod={c => orderService.getOrders(c)}
            container={o => <OrderCard order={o} key={o.id} />}
            noResultsView={() => (
              <IconMessageView
                icon="receipt"
                title="No Orders"
                caption="You haven't placed any orders... yet?"
                btnProps={{
                  text: 'Order products',
                  icon: 'receipt',
                  action: () => this.props.navigation.navigate('Search'),
                }}
              />
            )}
          />
          <FAB
            icon="filter"
            style={[s.bottomRight, s.m8]}
            disabled={this.state.showFilters}
            onPress={() => this.setState({...this.state, showFilters: true})}
          />
        </View>
        <Surface style={s.row}>
          {orderRoutes.map((o, i) => {
            const selected = this.state.navIndex === i;
            return (
              <ToggleButton
                style={[s.flex, s.center]}
                color={selected ? undefined : colors.gray}
                icon={o.icon}
                key={o.key}
                status={selected ? 'checked' : 'unchecked'}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    navIndex: i,
                    criteria: this.generateCriteria(i),
                  })
                }
              />
            );
          })}
        </Surface>
        <this.FiltersModal />
      </>
    );
  }

  FiltersModal = () => (
    <Modal
      visible={this.state.showFilters}
      onDismiss={() => {
        this.setState({...this.state, showFilters: false});
      }}>
      <View style={s.m8}>
        <Title style={s.textBold}>Filters</Title>
        <Divider />
        <View style={[s.row, s.py8]}>
          <Caption style={s.alignCenter}>Sort By: </Caption>
          <View style={[s.row, s.mlAuto]}>
            <ListSelect
              options={[
                {
                  name: 'Updated on',
                  value: 'updatedAt',
                  selected: this.filters.orderBy === 'updatedAt',
                },
                {
                  name: 'Placed on',
                  value: 'createdAt',
                  selected: this.filters.orderBy === 'createdAt',
                },
              ]}
              onSelect={option => {
                this.filters.orderBy = option.value as keyof OrderType;
              }}
            />
            <ListSelect
              options={[
                {
                  name: 'Latest First',
                  value: 'DESC',
                  selected: this.filters.orderDir === 'DESC',
                },
                {
                  name: 'Oldest First',
                  value: 'ASC',
                  selected: this.filters.orderDir === 'ASC',
                },
              ]}
              onSelect={option => {
                this.filters.orderDir = option.value as 'ASC' | 'DESC';
              }}
            />
          </View>
        </View>
        <Divider />
        <Button
          mode="contained"
          style={[s.mlAuto, s.mt8]}
          icon="check"
          onPress={() => {
            this.setState({
              ...this.state,
              showFilters: false,
              criteria: this.generateCriteria(),
            });
          }}>
          Apply
        </Button>
      </View>
    </Modal>
  );

  /** Regenerates criteria based on selected filters and navIndex */
  private generateCriteria = (navIndex?: number) => {
    const ind = navIndex !== undefined ? navIndex : this.state?.navIndex || 0;
    const criteria = new Criteria<OrderType>();
    if (ind === 0) {
      criteria.addFilter('orderState', 2, '<');
    } else {
      const id = ind + 1;
      criteria.addFilter('orderState', id, '=');
    }
    criteria.addRelation('orderProducts');
    criteria.addRelation('orderState');
    criteria.addFilter('user', appState.user.id!);
    criteria.setOrderBy(this.filters.orderBy);
    criteria.setOrderDir(this.filters.orderDir);
    return criteria;
  };
}
