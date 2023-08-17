import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { DebugBar } from '@/components';
import { useApi } from '@/hooks';
import { Button, Divider, TextInput } from 'react-native-paper';

const imagesDirectory = FileSystem.documentDirectory + 'images/';

const checkDirectoryExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imagesDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imagesDirectory, { intermediates: true });
  }
};

export const UploadFormScreen = ({ navigation }) => {
  const [images, setImages] = useState<any[]>([])
  const [preview, setPreview] = useState<string>();
  const { postUpload } = useApi();

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    previewImage(preview);
  }, [preview]);

  const loadImages = async () => {
    await checkDirectoryExists();
    const files = await FileSystem.readDirectoryAsync(imagesDirectory);
    if (files.length > 0) {
      setImages(files.map((f) => imagesDirectory + f));
    }
  };

  const previewImage = async (imageResult: string) => {
    await checkDirectoryExists();
    let uploadedImg = await imageResult;
    if (uploadedImg) {
      setPreview(uploadedImg);
    }
  };

  const selectImage = async (handleChange, useLibrary: boolean) => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (result.assets) {
      previewImage(result.assets[0].uri);
    }

    if (!result.canceled) {
      handleChange(result.assets[0].uri);
    }
  }

  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Formik
        initialValues={{ image: '', title: '', description: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          try {
            await postUpload(values);
            console.log('====================================');
            console.log('SUBMITTED FORMIK VALUES', JSON.stringify(values, null, 2));
            console.log('====================================');
            navigation.goBack();
          } catch (error) {
            alert('An error occurred while uploading the photo. Please try again.');

            console.error('Error uploading file', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <DebugBar data={values} />
            <Image style={{ width: 80, height: 80 }} source={{ uri: preview }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
              <Button mode="contained" onPress={() => selectImage(handleChange('image'), true)}>
                Photo Library
              </Button>
              <Button mode="contained" onPress={() => selectImage(handleChange('image'), false)}>
                Capture Image
              </Button>
            </View>
            <TextInput
              mode="outlined"
              placeholder="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            <TextInput
              mode="outlined"
              placeholder="Photo description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline={true}
            />
            <Button mode="contained" onPress={handleSubmit}>Submit</Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});