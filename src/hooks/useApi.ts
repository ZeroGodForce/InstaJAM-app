import axios from 'axios';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

export const useApi = () => {
  const baseURL = API_URL;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const postUpload = async (formikValues?: any): Promise<void> => {
    console.log('=========== POST =============');
    console.log('VALUES', formikValues);
    console.log('==============================');

    try {
      const userToken = await SecureStore.getItemAsync('userToken');

      setIsProcessing(true);

      const form = new FormData();
      form.append('title', formikValues.title);
      form.append('description', formikValues.description);
      form.append('image', {
        uri: formikValues.image,
        type: 'image/jpg',
        name: 'file_image.jpg'
      } as any);

      const response = await axios.post(`${baseURL}/upload`, form, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`
        }
      })

      console.log('=========== POST =============');
      console.log('RESPONSE', response.data.data);
      console.log('==============================');

    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getImages = async (): Promise<any[]> => {
    try {
      const userToken = await SecureStore.getItemAsync('userToken');
      const response = await axios.get(`${baseURL}/images`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`
        }
      });
      console.log('=========== GET IMAGES =========');
      console.log('GET RESPONSE', response.data.data);
      console.log('================================');

      return response.data.data;
    } catch (error) {
      console.error('Error retrieving images:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return { postUpload, getImages };
};