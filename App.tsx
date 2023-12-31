import React, { useEffect, useReducer, useState } from 'react';
import { TabNavigator } from '@/navigation';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import { RootNavigatorParams } from '@/types';
import { ImageModal, LoginScreen, RegisterScreen, SplashScreen } from '@/screens';
import { authReducer } from '@/reducers/authReducer';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/providers/AuthProvider';

export default function App({ navigation }) {
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });
  const [showSplash, setShowSplash] = useState(true);

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

      // Give a bit of extra time for promises to resolve and tokens to be loaded
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      
    };

    bootstrapAsync();
  }, []);

  const Stack = createNativeStackNavigator<RootNavigatorParams>();
  const screenOptions = {
    headerShown: false,
    animationTypeForReplace: authState.isSignout ? 'pop' : 'push',
  };

  if (showSplash) {
    return <SplashScreen />;
  } else {
    return (
      <AuthProvider authState={authState} dispatch={dispatch}>
        <PaperProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            <HeaderButtonsProvider stackType="native">
              <Stack.Navigator screenOptions={screenOptions}>
                {authState.userToken == null ? (
                  <Stack.Group key="unauthorized">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'InstaJAM' }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true, }} />
                  </Stack.Group>
                ) : (
                  <Stack.Group key="authorized">
                    <Stack.Screen name="TabNavigator" component={TabNavigator} />
                    <Stack.Screen name="Image" component={ImageModal} options={{ presentation: 'modal', headerShown: true, }} />
                  </Stack.Group>
                )}
              </Stack.Navigator>
            </HeaderButtonsProvider>
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    );
  }
}