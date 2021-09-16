import {AxiosResponse} from 'axios';
import React from 'react';
import {
  ImageStyle,
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  TextStyle,
  ActivityIndicator,
  View,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import {
  createAnimatableComponent,
  CustomAnimation,
} from 'react-native-animatable';
import Criteria from '../../models/criteria';

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

  animation?: string | CustomAnimation<TextStyle & ViewStyle & ImageStyle>;

  /** Can be incremented to force a data update. Should be linked with
   * a state property to allow multiple updates */
  updateCount?: number;

  /** Props for the scroll view container */
  scrollViewProps?: ScrollViewProps;
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
      return (
        <ActivityIndicator
          style={{flex: 1, alignSelf: 'center'}}
          size="large"
        />
      );
    }

    const paddingTop = this.props.padding?.top;
    const paddingBottom = this.props.padding?.bottom;

    return this.state.items!.length > 0 ? (
      <ScrollView
        {...this.props.scrollViewProps}
        onScroll={event => {
          if (this.isScrollAtEnd(event.nativeEvent)) {
            if (!this.state.loading && this.page < this.maxPage) {
              this.page++;
              this.fetch(true);
            }
          }
          if (this.props.scrollViewProps?.onScroll) {
            this.props.scrollViewProps.onScroll(event);
          }
        }}
        refreshControl={
          <RefreshControl
            onRefresh={() => this.fetch(false, true)}
            refreshing={this.state.refreshing}
          />
        }>
        {paddingTop ? <View style={{paddingTop}} /> : <></>}
        <AnimatedView animation={this.props.animation}>
          {this.state.items!.map(this.props.container)}
        </AnimatedView>
        {this.state.loading ? <ActivityIndicator /> : <></>}
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

const AnimatedView = createAnimatableComponent(View);
