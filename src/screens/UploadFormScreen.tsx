import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { DebugBar } from '@/components';

const imagesDirectory = FileSystem.documentDirectory + 'images/';

const checkDirectoryExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imagesDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imagesDirectory, { intermediates: true });
  }
};

export const UploadFormScreen = (props) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await checkDirectoryExists();
    const files = await FileSystem.readDirectoryAsync(imagesDirectory);
    if (files.length > 0) {
      setImages(files.map((f) => imagesDirectory + f));
    }
  };

  const selectImage = async (useLibrary: boolean) => {
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

    console.log('====================================');
    console.log('PHOTO SELECTION RESULT', result);
    console.log('====================================');

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  }

  const saveImage = async (uri: string) => {
    await checkDirectoryExists();
    const filename = new Date().getTime() + '.jpeg';
    const dest = imagesDirectory + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);

    await FileSystem.uploadAsync('http://192.168.1.111:8888/upload.php', uri, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file'
    });

    setUploading(false);
  };

  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Formik
        initialValues={{ title: '', description: '' }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <DebugBar data={values} />
            <TextInput
              placeholder="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            <TextInput
              placeholder="Photo description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline={true}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
              <Button title="Photo Library" onPress={() => selectImage(true)} />
              <Button title="Capture Image" onPress={() => selectImage(false)} />
            </View>
            <Button onPress={handleSubmit} title="Submit" />
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