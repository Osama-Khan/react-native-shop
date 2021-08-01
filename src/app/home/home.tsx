import React from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  ScrollView,
  Button,
  ToastAndroid,
} from 'react-native';
import {Text} from '../components/react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../styles/colors';

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle]}>Hello</Text>
        <Text style={[styles.sectionDescription]}>
          Welcome to
          <Text style={styles.highlight}> Shop</Text>
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Button
          title="Products"
          color={colors.primary}
          onPress={e => ToastAndroid.show('Hello', ToastAndroid.SHORT)}
        />
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
