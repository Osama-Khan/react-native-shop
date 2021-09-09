import React from 'react';
import {View} from 'react-native-animatable';
import {Card, Divider, Text, Title} from 'react-native-paper';
import Criteria from '../../../models/criteria';
import {CategoryType} from '../../../models/types/category.type';
import categoryService from '../../../services/category.service';
import BreadCrumbs from '../../breadcrumbs';
import Icon from '../../icon';
import {BottomUpModal} from '../../modal';
import {LoadingCircles} from '../../svg/loading';

type P = {selected?: CategoryType; onSelect: (selected: CategoryType) => void};
type S = {
  visible: boolean;
  categories?: CategoryType[];
  selectedParents?: CategoryType[];
};

export default class CategorySelect extends React.Component<P, S> {
  state: S = {visible: false};

  componentDidMount() {
    const crit = new Criteria<CategoryType>();
    crit.addRelation('parentCategory');
    crit.addRelation('childCategories');
    crit.setLimit(10000);
    categoryService.fetchCategories(crit).then(res => {
      const categories = res.data.data;
      this.setState({...this.state, categories});
    });
  }

  render() {
    return this.state.categories ? (
      <>
        <Card onPress={this.show} style={{padding: 8}}>
          <Text>{this.props.selected?.name || 'Choose a category... '}</Text>
        </Card>
        <BottomUpModal visible={this.state.visible} onDismiss={this.hide}>
          <View style={{paddingHorizontal: 8}}>
            <Title>Choose a category... </Title>
            <Divider />
            <View style={{margin: 4}}>
              <BreadCrumbs
                crumbs={
                  this.state.selectedParents?.map(c => {
                    return {
                      key: c.id + '',
                      text: c.name,
                      onPress: () => this.handleSelect(c),
                    };
                  }) || []
                }
              />
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {this.categoriesToShow!.map(c => (
                <this.CategoryCard key={c.id} c={c} />
              ))}
            </View>
          </View>
        </BottomUpModal>
      </>
    ) : (
      <LoadingCircles />
    );
  }

  CategoryCard = ({c}: {c: CategoryType}) => {
    const isLeaf = c.childCategories?.length === 0;
    return (
      <Card
        style={{padding: 8, margin: 4}}
        onPress={() => {
          if (isLeaf) {
            this.handleSelect(c);
            return;
          }
          let selectedParents = this.state.selectedParents || [];
          selectedParents.push(c);
          this.setState({...this.state, selectedParents});
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>{c.name}</Text>
          {!isLeaf ? <Icon name="chevron-down" size={16} /> : <></>}
        </View>
      </Card>
    );
  };

  get categoriesToShow() {
    const {categories, selectedParents} = this.state;
    const lastParent = selectedParents?.slice(-1)[0];
    return lastParent
      ? categories?.filter(c => c.parentCategory?.id === lastParent.id)
      : categories!.filter(c => c.parentCategory === undefined);
  }

  handleSelect = (c: CategoryType) => {
    this.props.onSelect(c);
    this.hide();
  };

  hide = () => this.setState({...this.state, visible: false});
  show = () =>
    this.setState({...this.state, selectedParents: [], visible: true});
}
