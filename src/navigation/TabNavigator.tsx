import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParams } from '@/types';
import { FavouritesScreen, HomeScreen } from '@/screens';
import { HomeStack } from './HomeStack';

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator<TabNavigatorParams>();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="FavouritesStack" component={FavouritesScreen} />
    </Tab.Navigator>
  );
}