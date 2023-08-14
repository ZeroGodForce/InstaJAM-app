import React, { useEffect, useLayoutEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';
import { MaterialHeaderButton } from '@/components'
import { useApi } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = ({ navigation }) => {
  const { getImages } = useApi();
  const [images, setImages] = React.useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item title="Upload" onPress={() => navigation.navigate('UploadForm')} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const imageGrid = images.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imagePath: item.imagePath,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        {imageGrid.length > 0 ? imageGrid.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image
              source={{ uri: item.imagePath }}
              style={styles.photo}
              accessibilityIgnoresInvertColors
            />
          </View>
        )) : null}
      </View>
      <StatusBar style="auto" />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    backgroundColor: '#aeaeae',
  },
  item: {
    height: Dimensions.get('window').width / 2,
    width: '50%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
});