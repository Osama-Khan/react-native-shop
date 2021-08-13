import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {IconButton} from 'react-native-paper';
import colors from '../../../styles/colors';
import favoriteService from '../../services/favorite.service';
import uiService from '../../services/ui.service';

type PropType = {
  style: StyleProp<ViewStyle>;
  productId: number;
  userId: number;
};
type StateType = {loading: boolean; liked: boolean};
export default class ProductLikeAction extends React.Component<
  PropType,
  StateType
> {
  constructor(props: PropType) {
    super(props);
    this.state = {loading: true, liked: false};
  }

  componentDidMount() {
    this.fetchIsLiked();
  }

  render() {
    return (
      <IconButton
        {...this.props}
        color={this.state.liked ? colors.primary : colors.gray}
        icon={this.state.liked ? 'heart' : 'heart-outline'}
        onPress={this.toggleLike}
        disabled={this.state.loading}
      />
    );
  }

  fetchIsLiked = () => {
    this.setState({...this.state, loading: true});
    favoriteService
      .isProductFavoriteOfUser(this.props.productId, this.props.userId)
      .then(res => {
        const liked = res.data.data.length > 0;
        this.setState({loading: false, liked});
      });
  };

  toggleLike = () => {
    this.setState({...this.state, loading: true});
    const user = this.props.userId;
    const prod = this.props.productId;
    const method = this.state.liked
      ? () => favoriteService.unsetFavorite(user, prod)
      : () => favoriteService.setFavorite(user, prod);
    method().then(() => {
      const liked = !this.state.liked;
      let msg = 'Product ';
      msg += liked ? 'added to' : 'removed from';
      msg += ' likes.';
      uiService.toast(msg);
      this.setState({loading: false, liked});
    });
  };
}
