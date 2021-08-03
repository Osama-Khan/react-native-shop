import React from 'react';
import {StyleSheet, View, ScrollView, ToastAndroid} from 'react-native';
import {Text, Button} from 'react-native-paper';
import colors from '../../styles/colors';

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle]}>Hello</Text>
        <Text style={[styles.sectionDescription]}>
          Welcome to&nbsp;
          <Text style={styles.highlight}>Shop</Text>
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Button
          color={colors.primary}
          onPress={() => ToastAndroid.show('Hello', ToastAndroid.SHORT)}>
          Products
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
