import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { DebugBar } from '@/components';
import { useApi } from '@/hooks';

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
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.8;
  const imageHeight = imageWidth / 1.5; // Use the aspect ratio to calculate the height.


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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ image: '', title: '', description: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              await postUpload(values);
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
            <View style={styles.form}>
              <DebugBar data={values} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {!preview ? (
                  <Image style={{ width: imageWidth, height: imageHeight }} source={require('@/images/placeholder-image.jpg')} />
                ) : (
                  <Image style={{ width: imageWidth, height: imageHeight }} source={{ uri: preview }} />
                )}
              </View>
              <View style={styles.btnGroup}>
                <Pressable
                  onPress={() => selectImage(handleChange('image'), true)}
                  style={{ flex: 1, paddingHorizontal: 6 }}>
                  <View style={styles.btnImagePicker}>
                    <Text style={styles.btnImagePickerText}>Photo Library</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => selectImage(handleChange('image'), false)}
                  style={{ flex: 1, paddingHorizontal: 6 }}>
                  <View style={styles.btnOpenCamera}>
                    <Text style={styles.btnOpenCameraText}>Capture Image</Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                  placeholder="Art Deco Placeholder"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={values.title}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Photo Description</Text>
                <TextInput
                  multiline={true}
                  onBlur={handleBlur('description')}
                  onChangeText={handleChange('description')}
                  placeholder="Tahiti is a magical place..."
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={values.description}
                />
              </View>
              <View style={styles.formAction}>
                <Pressable onPress={handleSubmit}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Upload</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  form: {
    marginBottom: 24,
    paddingTop: Platform.OS === 'ios' ? 96 : 4,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
    marginBottom: 18,
  },
  btnOpenCamera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#266EF1',
  },
  btnOpenCameraText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#266EF1',
  },
  btnImagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
  },
  btnImagePickerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
});