import axios from 'axios';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';
import { useAuth } from '@/providers/AuthProvider';

export const useAuthApi = () => {
  const baseURL = API_URL;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { authState, dispatch } = useAuth();

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
      signUp(userToken);

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
      signIn(userToken);

    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // LOGOUT USER
  const deleteLogout = async (): Promise<void> => {
    const userToken = await SecureStore.getItemAsync('userToken');
    try {
      setIsProcessing(true);

      const response = await axios.delete(`${baseURL}/logout`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        }
      })

      signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const signIn = async (data) => {
    dispatch({ type: 'SIGN_IN', token: data });
    await SecureStore.setItemAsync('userToken', data);
  };

  const signOut = async () => {
    dispatch({ type: 'SIGN_OUT' });
    await SecureStore.deleteItemAsync('userToken');
  };

  const signUp = async (data) => {
    dispatch({ type: 'SIGN_IN', token: data });
    await SecureStore.setItemAsync('userToken', data);
  };

  return { signIn, signOut, signUp, postRegister, postLogin, deleteLogout };
};