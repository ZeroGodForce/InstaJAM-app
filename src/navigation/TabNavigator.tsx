import React, { useCallback } from 'react'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParams } from '@/types';
import { ProfileScreen } from '@/screens';
import { HomeStack } from './HomeStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FavouritesStack } from './FavouritesStack';

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator<TabNavigatorParams>();

  const screenOptions = useCallback(
    ({ route }): BottomTabNavigationOptions => ({
      tabBarIcon: ({ color, size }) => {
        const icons = {
          HomeStack: 'home',
          FavouritesStack: 'star',
          Profile: 'account-circle',
        }
        return <MaterialCommunityIcons name={icons[route.name]} size={24} color={color} />
      },
      headerShown: false,
    }),
    []
  )

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="FavouritesStack" component={FavouritesStack} options={{ title: 'Favourites' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}