import React from 'react';
import {Card, ProgressBar, Text} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import s from '../../styles/styles';
import {NavigationProp} from '@react-navigation/native';
import {CategoryType} from '../models/types/category.type';
import categoryService from '../services/category.service';
import Icon from '../components/icon';
import {icons} from '../categories/categories.helper';
import {categoryProductRoute} from '../app.routes';

type P = {navigation: NavigationProp<any>};
type S = {categories?: CategoryType[]};
type CategoryCardProps = {name: string; icon: string; onPress: () => void};

export default class CategoriesList extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    categoryService.fetchRootCategories().then(res => {
      this.setState({categories: res.data.data});
    });
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View>
        {this.state.categories ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.categories.map(c => (
              <this.CategoryCard
                key={c.id}
                onPress={() =>
                  navigate(categoryProductRoute.name, {category: c})
                }
                name={c.name}
                icon={icons[c.name.toLowerCase()]}
              />
            ))}
            <this.CategoryCard
              key="more"
              name="More"
              icon="arrow-right"
              onPress={() => navigate('Categories')}
            />
          </ScrollView>
        ) : (
          <ProgressBar />
        )}
      </View>
    );
  }

  CategoryCard = ({name, icon, onPress}: CategoryCardProps) => (
    <Card style={[s.m8, s.p8]} onPress={onPress}>
      <Icon name={icon} size={32} style={[s.m16, s.alignCenter]} />
      <Text style={[s.textBold, s.textCenter]}>{name}</Text>
    </Card>
  );
}
