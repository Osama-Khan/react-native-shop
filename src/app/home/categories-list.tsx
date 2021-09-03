import React from 'react';
import {Card, Text} from 'react-native-paper';
import {ScrollView, View, Image} from 'react-native';
import s from '../../styles/styles';
import {NavigationProp} from '@react-navigation/native';
import {CategoryType} from '../models/types/category.type';
import categoryService from '../services/category.service';
import Icon from '../components/icon';
import {icons} from '../categories/categories.helper';
import {categoryProductRoute} from '../app.routes';
import {LoadingCircles} from '../components/svg/loading';

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
          <LoadingCircles />
        )}
      </View>
    );
  }

  CategoryCard = ({name, icon, onPress}: CategoryCardProps) => (
    <View>
      <Card style={[s.m8, s.roundedFull]} onPress={onPress} elevation={8}>
        <Icon name={icon} size={32} style={[s.m16, s.alignCenter]} />
      </Card>
      <Text style={[s.textBold, s.textCenter]}>{name}</Text>
    </View>
  );
}
