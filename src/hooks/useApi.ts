import axios from 'axios';
import { useState } from 'react';

export const useApi = () => {
  const baseURL = 'http://192.168.1.111:3000';
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const postUpload = async (formikValues?: any): Promise<void> => {
    console.log('=========== POST =============');
    console.log('VALUES', formikValues);
    console.log('==============================');

    try {
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
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('=========== POST =============');
      console.log('RESPONSE', response.data);
      console.log('==============================');

    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getImages = async (): Promise<any[]> => {
    try {
      const response = await axios.get(`${baseURL}/images`);
      console.log('=========== GET IMAGES =========');
      console.log('GET RESPONSE', response.data);
      console.log('================================');

      return response.data;
    } catch (error) {
      console.error('Error retrieving images:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return { postUpload, getImages };
};