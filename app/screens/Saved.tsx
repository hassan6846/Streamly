import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

const Saved = () => {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <Icon name="alert-circle-outline" type="material-community" size={80} color="#999" />

      {/* Heading */}
      <Text style={styles.heading}>Oops!</Text>

      {/* Subheading */}
      <Text style={styles.subheading}>Nothing can be found here right now.</Text>
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});
