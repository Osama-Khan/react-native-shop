import React from 'react';
import {ScrollView} from 'react-native';
import {Searchbar} from 'react-native-paper';

export default class Search extends React.Component {
  render() {
    return (
      <>
        <Searchbar style={{marginTop: 4}} value="" placeholder="Search..." />
        <ScrollView></ScrollView>
      </>
    );
  }
}
