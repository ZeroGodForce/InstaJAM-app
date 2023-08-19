import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={splashStyles.container}>
      <Text style={splashStyles.text}>InstaJAM</Text>
    </View>
  );
};

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007aff',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
});