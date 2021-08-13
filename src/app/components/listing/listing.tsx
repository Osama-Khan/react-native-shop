import {AxiosResponse} from 'axios';
import React from 'react';
import {NativeScrollEvent, ScrollView, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Criteria from '../../models/criteria';
import LoadingSpinner from '../loading/loading-spinner';

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
};

type S<I> = {items?: I[]; loading: boolean};

/** A generic component that can be used to fetch and list items */
export default class ListingComponent<ItemType> extends React.PureComponent<
  P<ItemType>,
  S<ItemType>
> {
  private page = 0;
  private maxPage = 1;
  private criteria: Criteria<ItemType>;

  constructor(props: P<ItemType>) {
    super(props);
    this.state = {loading: false};
    this.criteria = new Criteria<ItemType>(props.criteria);
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate() {
    if (!this.props.criteria) {
      return;
    }
    if (
      this.props.criteria?.getUrlParameters() !==
      this.criteria?.getUrlParameters()
    ) {
      this.criteria = new Criteria(this.props.criteria);
      this.page = 0;
      this.maxPage = 1;
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
        }}>
        {paddingTop ? <View style={{paddingTop}} /> : <></>}
        {this.state.items!.map(this.props.container)}
        {this.state.loading ? <LoadingSpinner /> : <></>}
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
  private fetch = (append = false) => {
    this.setState({...this.state, loading: true});
    const criteria = new Criteria(this.criteria);
    if (this.page) {
      criteria.setPage(this.page);
    }
    this.props.fetchMethod(criteria).then(res => {
      let items = this.state.items || [];
      items = append ? [...items, ...res.data.data] : res.data.data;
      this.page = res.data.meta.currentPage;
      this.maxPage = res.data.meta.totalPages;
      this.setState({items, loading: false});
    });
  };
}
