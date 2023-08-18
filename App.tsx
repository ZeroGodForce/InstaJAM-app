import React, { useEffect, useReducer } from 'react';
import { TabNavigator } from '@/navigation';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '@/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import { RootNavigatorParams } from '@/types';
import { LoginScreen, RegisterScreen } from '@/screens';
import { useAuthApi } from '@/hooks';
import { authReducer } from '@/reducers/authReducer';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App({ navigation }) {
  // const { authState, dispatch, authContext } = useAuthApi();
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });


  // useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await SecureStore.getItemAsync('userToken');
  //     } catch (e) {
  //       // Restoring token failed
  //       console.log('========== RESTORE TOKEN ==========');
  //       console.log('Restoring token failed', e);
  //       console.log('===================================');
  //     }

  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log('========== RESTORE TOKEN ==========');
        console.log('Restoring token failed', e);
        console.log('===================================');
      }

      dispatch({ type: 'INITIALIZE', token: userToken });
    };

    bootstrapAsync();
  }, []);

  console.log('========== APP AUTH STATE ==========');
  console.log('VALUE', authState);
  console.log('TIME', Date().toString());
  console.log('====================================');
  const Stack = createNativeStackNavigator<RootNavigatorParams>();
  const screenOptions = {
    headerShown: true,
    headerLargeTitle: true,
    animationTypeForReplace: authState.isSignout ? 'pop' : 'push',
  };
  return (
    // <AuthContext.Provider value={authContext}>
    <PaperProvider>
      <StatusBar style="auto" />
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
    </PaperProvider>
    // </AuthContext.Provider>
  );
}