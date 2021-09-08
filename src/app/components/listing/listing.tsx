import {AxiosResponse} from 'axios';
import React from 'react';
import {
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Criteria from '../../models/criteria';
import {LoadingCircles} from '../svg/loading';

type P<I> = {
  /** Criteria used to filter results */
  criteria?: Criteria<I>;

  /** React element used to display the data */
  container: (item: I) => React.ReactElement;

  /** Method used to fetch data and populate listing */
  fetchMethod: (
    criteria?: Criteria<I>,
  ) => Promise<AxiosResponse<{data: I[]; meta: any}>>;

  /** View shown when no results are found */
  noResultsView?: () => React.ReactElement;

  /** Gaps to show at the top and bottom of the scrollview */
  padding?: {top?: number; bottom?: number};

  /** Can be incremented to force a data update. Should be linked with
   * a state property to allow multiple updates */
  updateCount?: number;
};

type S<I> = {items?: I[]; loading: boolean; refreshing: boolean};

/** A generic component that can be used to fetch and list items */
export default class ListingComponent<ItemType> extends React.PureComponent<
  P<ItemType>,
  S<ItemType>
> {
  private page = 0;
  private maxPage = 1;
  private criteria: Criteria<ItemType> = new Criteria<ItemType>(
    this.props.criteria,
  );
  private currentUpdate = 0;

  state: S<ItemType> = {loading: false, refreshing: false};

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate() {
    if (!this.props.criteria) {
      return;
    }
    let shouldUpdate =
      this.props.criteria?.getUrlParameters() !==
      this.criteria?.getUrlParameters();
    if (this.props.updateCount) {
      shouldUpdate =
        shouldUpdate || this.props.updateCount > this.currentUpdate;
    }
    if (shouldUpdate) {
      this.criteria = new Criteria(this.props.criteria);
      this.page = 0;
      this.maxPage = 1;
      this.currentUpdate++;
      this.fetch();
    }
  }

  render() {
    if (this.page === 0) {
      return <ProgressBar indeterminate={true} />;
    }

    const paddingTop = this.props.padding?.top;
    const paddingBottom = this.props.padding?.bottom;

    return this.state.items!.length > 0 ? (
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (this.isScrollAtEnd(nativeEvent)) {
            if (!this.state.loading && this.page < this.maxPage) {
              this.page++;
              this.fetch(true);
            }
          }
        }}
        refreshControl={
          <RefreshControl
            onRefresh={() => this.fetch(false, true)}
            refreshing={this.state.refreshing}
          />
        }>
        {paddingTop ? <View style={{paddingTop}} /> : <></>}
        {this.state.items!.map(this.props.container)}
        {this.state.loading ? <LoadingCircles /> : <></>}
        {paddingBottom ? <View style={{paddingBottom}} /> : <></>}
      </ScrollView>
    ) : this.props.noResultsView ? (
      <this.props.noResultsView />
    ) : (
      <></>
    );
  }

  /** Checks if current scroll position is almost at the bottom */
  private isScrollAtEnd = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  /** Fetches data and updates state
   * @param append Appends new data to the end of the current items list if true
   */
  private fetch = (append = false, refreshing = false) => {
    const criteria = new Criteria(this.criteria);
    if (refreshing) {
      this.setState({...this.state, refreshing: true});
      criteria.setPage(1);
    } else {
      this.setState({...this.state, loading: true});
      if (this.page) {
        criteria.setPage(this.page);
      }
    }
    this.props.fetchMethod(criteria).then(res => {
      let items = this.state.items || [];
      items = append ? [...items, ...res.data.data] : res.data.data;
      this.page = res.data.meta.currentPage;
      this.maxPage = res.data.meta.totalPages;
      this.setState({items, refreshing: false, loading: false});
    });
  };
}
