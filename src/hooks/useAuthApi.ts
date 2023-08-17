import axios from 'axios';
import { useMemo, useReducer, useState } from 'react';
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
      console.log('========== OLD AUTH STATE ==========');
      console.log('OLD VALUE', authState);
      console.log('====================================');
      const userToken = response.data.data.token;
      await SecureStore.setItemAsync('userToken', userToken);
      dispatch({ type: 'SIGN_IN', token: userToken });
      console.log('========== NEW AUTH STATE ==========');
      console.log('NEW VALUE', authState);
      console.log('====================================');
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
      console.log('========== OLD AUTH STATE ==========');
      console.log('OLD VALUE', authState);
      console.log('====================================');
      const userToken = response.data.data.token;
      await SecureStore.setItemAsync('userToken', userToken);
      dispatch({ type: 'SIGN_IN', token: userToken });
      console.log('========== NEW AUTH STATE ==========');
      console.log('NEW VALUE', authState);
      console.log('====================================');
    } catch (error) {
      console.error('Error submitting registration:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteLogout = async (): Promise<void> => {
    try {
      setIsProcessing(true);
      const userToken = await SecureStore.getItemAsync('userToken');

      const response = await axios.delete(`${baseURL}/logout`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        }
      })

      console.log('======= LOGOUT RESPONSE =======');
      console.log('RESPONSE', JSON.stringify(response.data.data, null, 2));
      console.log('===============================');
      console.log('========== OLD AUTH STATE ==========');
      console.log('OLD VALUE', authState);
      console.log('====================================');
      await SecureStore.deleteItemAsync('userToken');
      dispatch({ type: 'SIGN_OUT' });
      console.log('========== NEW AUTH STATE ==========');
      console.log('NEW VALUE', authState);
      console.log('====================================');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { authState, dispatch, postRegister, postLogin, deleteLogout };
};