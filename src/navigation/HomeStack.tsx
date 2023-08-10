import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from '@/types';
import { HomeScreen, UploadFormScreen } from '@/screens';

export const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParams>();
  const screenOptions = {
    headerShown: true,
    headerLargeTitle: true,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="UploadForm"
        component={UploadFormScreen}
        options={{
          title: 'Upload Photo'
        }} />
    </Stack.Navigator>
  );
}