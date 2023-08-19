import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@/components'
import { useApi } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, ToggleButton } from 'react-native-paper';
import { ImageData } from '@/types';


export const HomeScreen = ({ navigation }) => {
  const { getImages, putFavourite } = useApi();
  const [images, setImages] = useState<ImageData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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
    fetchAndSetImages();
  }, []);

  const fetchAndSetImages = async () => {
    try {
      const fetchedImages = await getImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleRefresh = async (imageSet: ImageData[] | null = null) => {
    setRefreshing(true);
    if (imageSet) {
      setImages(imageSet);
    } else {
      await fetchAndSetImages();
    }
    setRefreshing(false);
  };

  const onButtonToggle = async (item: ImageData) => {
    item.favourite = !item.favourite;
    const updatedImages = await putFavourite(item);

    handleRefresh(updatedImages);
  };

  const imageGrid = images.map(item => ({
    uuid: item.uuid,
    title: item.title,
    description: item.description,
    imagePath: item.imagePath,
    favourite: item.favourite,
    height: item.height,
    width: item.width,
    filesize: item.filesize,
    createdAt: item.createdAt,
  }));

  const renderItem = ({ item }: { item: ImageData }) => {
    return (
      <Pressable onPress={() => alert(item.uuid)} style={styles.item}>
        <Image
          source={{ uri: item.imagePath }}
          style={styles.photo}
          accessibilityIgnoresInvertColors
        />
        <ToggleButton
          value={item.uuid}
          size={24}
          style={styles.customButton}
          iconColor="white"
          icon={item.favourite === true ? 'heart' : 'heart-outline'}
          status={item.favourite === true ? 'checked' : 'unchecked'}
          onPress={() => onButtonToggle(item)}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        <FlatList
          data={imageGrid}
          renderItem={renderItem}
          keyExtractor={item => item.uuid}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    flex: 1,
    padding: 4,
    backgroundColor: '#aeaeae',
    paddingTop: Platform.OS === 'ios' ? 96 : 4,
  },
  item: {
    flex: 0.5,
    aspectRatio: 1,
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  customButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});