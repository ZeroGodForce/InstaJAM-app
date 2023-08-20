import axios from 'axios';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

export const useApi = () => {
  const baseURL = API_URL;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const postUpload = async (formikValues?: any): Promise<void> => {
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

      const response = await axios.post(`${baseURL}/images`, form, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`
        }
      })
    } catch (error) {
      console.log('Error uploading:', error);
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });

      return response.data.data;
    } catch (error) {
      if (error.response) {
        if (error.response && error.response.status === 401) {
          alert('Unable to retrieve images. Please try again');
          console.log('============ RESPONSE ERROR ============');
          console.log('DATA', JSON.stringify(error.response.data, null, 2));
          console.log('STATUS CODE', error.response.status);
          console.log('========================================');
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('ERROR MESSAGE', error.message);
      }

      throw error;
    }
  };


  const getFavourites = async (): Promise<any[]> => {
    try {
      const userToken = await SecureStore.getItemAsync('userToken');
      const response = await axios.get(`${baseURL}/images?filter=favourites`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });

      return response.data.data;
    } catch (error) {
      console.log('Error retrieving images:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const putFavourite = async (image): Promise<any[]> => {
    const userToken = await SecureStore.getItemAsync('userToken');

    try {
      setIsProcessing(true);

      const data = {
        uuid: image.uuid,
        favourite: image.favourite,
      }

      const response = await axios.put(`${baseURL}/images/${image.uuid}/favourite`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      })

      return response.data.data;
    } catch (error) {
      alert('Error updating favourite image');
      console.log('Error updating favourite image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { postUpload, getImages, getFavourites, putFavourite };
};