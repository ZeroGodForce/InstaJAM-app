import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@/components'
import { useApi } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

type ImageData = {
  uuid: string;
  title: string;
  description: string;
  imagePath: string;
};

export const HomeScreen = ({ navigation }) => {
  const { getImages } = useApi();
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAndSetImages();
    setRefreshing(false);
  };

  const imageGrid = images.map(item => ({
    uuid: item.uuid,
    title: item.title,
    description: item.description,
    imagePath: item.imagePath,
  }));

  const renderItem = ({ item }: { item: ImageData }) => {
    return (
      <TouchableOpacity onPress={() => alert(item.uuid)} style={styles.item}>
        <Image
          source={{ uri: item.imagePath }}
          style={styles.photo}
          accessibilityIgnoresInvertColors
        />
      </TouchableOpacity>
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