import axios from 'axios';
import React, { useMemo, useReducer, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';
import { authReducer } from '@/reducers/authReducer';

export const useAuthApi = () => {
  const baseURL = API_URL;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  const postRegister = async (formikValues?: any): Promise<void> => {
    console.log('========== REGISTER ==========');
    console.log('VALUES', formikValues);
    console.log('==============================');

    try {
      setIsProcessing(true);

      const data = {
        name: formikValues.name,
        email: formikValues.email,
        password: formikValues.password,
      }

      const response = await axios.post(`${baseURL}/register`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      console.log('======= REGISTER RESPONSE =======');
      console.log('RESPONSE', JSON.stringify(response.data.data, null, 2));
      console.log('=================================');

      const userToken = response.data.data.token;
      await SecureStore.setItemAsync('userToken', userToken);
      dispatch({ type: 'SIGN_IN', token: userToken });

    } catch (error) {
      console.error('Error submitting registration:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const postLogin = async (formikValues?: any): Promise<void> => {
    console.log('========== LOGIN ==========');
    console.log('VALUES', formikValues);
    console.log('==============================');

    try {
      setIsProcessing(true);

      const data = {
        email: formikValues.email,
        password: formikValues.password,
      }

      const response = await axios.post(`${baseURL}/login`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      console.log('======= LOGIN RESPONSE =======');
      console.log('RESPONSE', JSON.stringify(response.data.data, null, 2));
      console.log('==============================');

      const userToken = response.data.data.token;
      await SecureStore.setItemAsync('userToken', userToken);
      dispatch({ type: 'SIGN_IN', token: userToken });

    } catch (error) {
      console.error('Error submitting registration:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const postLogout = async (): Promise<void> => {
    try {
      setIsProcessing(true);

      const data = {
        email: 'logout',
      }

      const response = await axios.post(`${baseURL}/logout`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      console.log('======= LOGOUT RESPONSE =======');
      console.log('RESPONSE', JSON.stringify(response.data.data, null, 2));
      console.log('===============================');

      dispatch({ type: 'SIGN_OUT' });

    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { authState, dispatch, authContext, postRegister, postLogin, postLogout };
};