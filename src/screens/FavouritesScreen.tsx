import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApi } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageData } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const FavouritesScreen = ({ navigation }) => {
  const { getFavourites } = useApi();
  const [images, setImages] = useState<ImageData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
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
      {!imageGrid || imageGrid.length === 0 ? (
        <View style={styles.empty}>
          <MaterialCommunityIcons name="image-area" size={44} color="black" />
          <Text style={styles.emptyTitle}>No Favourites</Text>
          <Text style={styles.emptyDescription}>
            Select some and pull down to refresh them here
          </Text>
        </View>
      ) : (
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
      )}
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
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#878787',
    marginBottom: 24,
  },
});