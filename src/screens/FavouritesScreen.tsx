import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useApi } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageData } from '@/types';


export const FavouritesScreen = ({ navigation }) => {
  const { getFavourites } = useApi();
  const [images, setImages] = useState<ImageData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:true,
      headerLargeTitle: true,
    });
  }, [navigation]);

  useEffect(() => {
    fetchAndSetImages();
  }, []);

  const fetchAndSetImages = async () => {
    try {
      const fetchedImages = await getFavourites();
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
      <Pressable
        onPress={() => navigation.navigate('Image', {
          image: item,
          options: {
            headerShown: false
          }
        })}
        style={styles.item}
      >
        <Image
          source={{ uri: item.imagePath }}
          style={styles.photo}
          accessibilityIgnoresInvertColors
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
});