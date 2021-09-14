import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ProgressBar, List, Title, Caption} from 'react-native-paper';
import s from '../../styles/styles';
import Criteria from '../models/criteria';
import {CategoryType} from '../models/types/category.type';
import categoryService from '../services/category.service';
import {getChildrenOf, icons} from './categories.helper';
import {View} from 'react-native-animatable';
import colors from '../../styles/colors';

type P = {
  selectedCategory?: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
};
type S = {categories?: CategoryType[]};

export default class CategoriesScreen extends React.Component<P, S> {
  state = {categories: undefined};

  componentDidMount() {
    const criteria = new Criteria<any>();
    criteria.addRelation('parentCategory');
    criteria.addRelation('childCategories');
    criteria.setLimit(1000);
    categoryService.fetchCategories(criteria).then(res => {
      const categories = res.data.data;
      this.setState({...this.state, categories});
    });
  }

  render() {
    const categories = this.state.categories;
    const cats = this.getRootCategories(categories);
    const catsView = cats ? (
      <this.CategoryList categories={cats} />
    ) : (
      <ProgressBar indeterminate={true} />
    );
    return (
      <ScrollView style={s.p16}>
        <Title style={s.textBold}>Categories</Title>
        <Caption>Hold a group item to browse all it's categories</Caption>
        {catsView}
        <View style={s.mt24} />
      </ScrollView>
    );
  }

  setCategory = (category: CategoryType) =>
    this.props.onSelectCategory(category);

  CategoryList = ({categories}: {categories: CategoryType[]}) => {
    return (
      <List.AccordionGroup>
        {categories.map((c: any) => {
          const isSelected = this.props.selectedCategory?.id === c.id;
          const titleStyle = isSelected ? styles.selectedCategory : undefined;
          const icon = () => (
            <List.Icon
              icon={icons[c.name.toLowerCase()]}
              color={isSelected ? colors.primaryLight : undefined}
              style={s.m0}
            />
          );
          return c.childCategories?.length > 0 ? (
            <List.Accordion
              id={c.id}
              key={c.id}
              left={icon}
              title={c.name}
              titleStyle={titleStyle}
              onLongPress={() => this.setCategory(c)}>
              {this.CategoryList({
                categories: getChildrenOf(c.id, this.state.categories!),
              })}
            </List.Accordion>
          ) : (
            <List.Item
              title={c.name}
              key={c.id}
              left={icon}
              titleStyle={titleStyle}
              onPress={() => this.setCategory(c)}
            />
          );
        })}
      </List.AccordionGroup>
    );
  };

  getRootCategories = (categories?: CategoryType[]) =>
    categories?.filter(c => !c.parentCategory);
}

const styles = StyleSheet.create({
  selectedCategory: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
