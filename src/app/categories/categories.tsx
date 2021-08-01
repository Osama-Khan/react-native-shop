import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card, ProgressBar, Title, IconButton} from 'react-native-paper';
import {catIconMap} from '../../data/category-icon-map';
import Criteria from '../models/criteria';
import categoryService from '../services/category.service';

export default class Categories extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {categories: undefined};
  }

  componentDidMount() {
    const criteria = new Criteria<any>();
    criteria.addRelation('parentCategory');
    criteria.setLimit(1000);
    categoryService.fetchCategories(criteria).then(res => {
      const categories = res.data.data;
      this.setState({...this.state, categories});
    });
  }

  render() {
    const categories = this.state.categories;
    const cats = this.getRootCategories(categories)?.map((c: any) => {
      const icon = catIconMap[c.name.toLowerCase()];
      return (
        <Card
          key={'cat-' + c.name}
          style={styles.card}
          focusable={true}
          onPress={() => {}}>
          <View style={styles.row}>
            {icon ? <IconButton icon={icon} /> : ''}
            <Title style={styles.alignCenter}>{c.name}</Title>
            <IconButton style={styles.mlAuto} icon="chevron-down" />
          </View>
        </Card>
      );
    }) || <ProgressBar indeterminate={true} />;
    return <ScrollView>{cats}</ScrollView>;
  }

  getRootCategories = (categories: any[]) =>
    categories?.filter(c => !c.parentCategory);
}

const styles = {
  card: {margin: 1, padding: 8},
  row: {flexDirection: 'row'},
  alignCenter: {alignSelf: 'center'},
  mlAuto: {marginLeft: 'auto'},
};
