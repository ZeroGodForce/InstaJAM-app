import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavouritesScreen, HomeScreen } from '@/screens';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HeaderButtonsProvider stackType='native'>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favourites" component={FavouritesScreen} />
        </Tab.Navigator>
      </HeaderButtonsProvider>
    </NavigationContainer>
  );
}

