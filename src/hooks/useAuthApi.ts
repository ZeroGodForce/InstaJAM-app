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
        dispatch({ type: 'SIGN_IN', token: data });
        await SecureStore.setItemAsync('userToken', data);
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' });
        await SecureStore.deleteItemAsync('userToken');
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: data });
        await SecureStore.setItemAsync('userToken', data);
      },
    }),
    []
  );

  // REGISTER NEW USER
  const postRegister = async (formikValues?: any): Promise<void> => {
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

      // Log the new user in
      const userToken = response.data.data.token;
      authContext.signUp(userToken);

    } catch (error) {
      console.error('Error submitting registration:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // LOGIN USER
  const postLogin = async (formikValues?: any): Promise<void> => {
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

      // Save the token and log the user in
      const userToken = response.data.data.token;
      authContext.signIn(userToken);

    } catch (error) {
      console.error('Error submitting registration:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // LOGOUT USER
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

      authContext.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { authContext, authState, dispatch, postRegister, postLogin, deleteLogout };
};