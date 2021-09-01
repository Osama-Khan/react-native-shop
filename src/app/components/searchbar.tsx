import React from 'react';
import {TextInput} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import s from '../../styles/styles';

type P = {onSearch: (query: string) => void};
type S = {query: string};

export default class Searchbar extends React.Component<P, S> {
  state = {query: ''};

  render() {
    return (
      <Card style={[s.row, s.roundedFull]}>
        <TextInput
          value={this.state.query}
          style={inputStyle}
          onChangeText={query => this.setState({query})}
          placeholder="Search..."
        />
        <FAB
          icon="magnify"
          style={s.right}
          onPress={() => this.props.onSearch(this.state.query)}
        />
      </Card>
    );
  }
}

const inputStyle = {marginLeft: 8, height: 54, marginRight: 58};
