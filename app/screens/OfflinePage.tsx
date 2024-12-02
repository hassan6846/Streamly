import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

const OfflinePage = () => {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <Icon name="wifi-off" type="feather" size={80} color="#999" />
      
      {/* Heading */}
      <Text style={styles.heading}>You are offline</Text>
      
      {/* Subheading */}
      <Text style={styles.subheading}>
        Please check your internet connection and try again.
      </Text>
    </View>
  );
};

export default OfflinePage;

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
