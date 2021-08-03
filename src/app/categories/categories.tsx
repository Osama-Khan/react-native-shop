import React from 'react';
import {ScrollView} from 'react-native';
import {ProgressBar, List} from 'react-native-paper';
import styles from '../../styles/styles';
import Criteria from '../models/criteria';
import categoryService from '../services/category.service';
import {getChildrenOf, icons} from './categories.helper';

export default class Categories extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {categories: undefined};
  }

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
    return cats ? (
      <ScrollView>
        <this.CategoryList categories={cats} />
      </ScrollView>
    ) : (
      <ProgressBar indeterminate={true} />
    );
  }

  CategoryList = ({categories, level = 0}) => {
    return (
      <List.AccordionGroup>
        {categories.map((c: any) => {
          const icon = () => (
            <List.Icon icon={icons[c.name.toLowerCase()]} style={styles.m0} />
          );
          return c.childCategories?.length > 0 ? (
            <List.Accordion id={c.id} key={c.id} title={c.name} left={icon}>
              {this.CategoryList({
                categories: getChildrenOf(c, this.state.categories),
              })}
            </List.Accordion>
          ) : (
            <List.Item
              title={c.name}
              key={c.id}
              left={icon}
              onPress={() => {}}
            />
          );
        })}
      </List.AccordionGroup>
    );
  };

  getRootCategories = (categories: any[]) =>
    categories?.filter(c => !c.parentCategory);
}
