import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import { TabNavigator } from './TabNavigator';
import { RootNavigatorParams } from '@/types';

export const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootNavigatorParams>();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <HeaderButtonsProvider stackType="native">
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </HeaderButtonsProvider>
    </NavigationContainer>
  );
}