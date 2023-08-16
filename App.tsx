import React, { useEffect } from 'react';
import { TabNavigator } from '@/navigation';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '@/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import { RootNavigatorParams } from '@/types';
import { LoginScreen, RegisterScreen } from '@/screens';
import { useAuthApi } from '@/hooks';

export default function App({ navigation }) {
  const { authState, dispatch, authContext } = useAuthApi();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const Stack = createNativeStackNavigator<RootNavigatorParams>();
  const screenOptions = {
    headerShown: true,
    headerLargeTitle: true,
  };
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <HeaderButtonsProvider stackType="native">
          <Stack.Navigator screenOptions={screenOptions}>
            {authState.userToken == null ? (
              <Stack.Group key="unauthorized">
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'InstaJam' }} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </Stack.Group>
            ) : (
              <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            )}
          </Stack.Navigator>
        </HeaderButtonsProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}