import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavouritesStackParams } from '@/types';
import { FavouritesScreen, ImageModal } from '@/screens';

export const FavouritesStack = () => {
  const Stack = createNativeStackNavigator<FavouritesStackParams>();
  const screenOptions = {
    headerShown: true,
    headerLargeTitle: true,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Image" component={ImageModal} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}