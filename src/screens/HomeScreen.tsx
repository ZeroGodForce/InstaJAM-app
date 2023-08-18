import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '@/components'
import { useApi } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, ToggleButton } from 'react-native-paper';

type ImageData = {
  uuid: string;
  title: string;
  description: string;
  imagePath: string;
  favourite: boolean;
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
    // TODO: ACCEPT OPTIONAL PARAM TO SET FETCHED IMAGES IF PASSED DATA MANUALLY
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

  const onButtonToggle = (item: ImageData) => {
    console.log('======= FAVOURITE TOGGLE =======');
    console.log('VALUE', JSON.stringify(item, null, 2));
    console.log('CURRENT FAVOURITE VALUE', item.favourite);
    // TODO: INSTEAD OF DOING THIS LOCAL, JUST MAKE SERVER CALL AND TRIGGER A REFRESH AT THE END
    item.favourite = !item.favourite;

    console.log('NEW FAVOURITE VALUE', item.favourite);
    console.log('================================');
  };

  const imageGrid = images.map(item => ({
    uuid: item.uuid,
    title: item.title,
    description: item.description,
    imagePath: item.imagePath,
    favourite: item.favourite,
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
          onPress={()=> onButtonToggle(item)}
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
      <FAB
        icon="plus"
        size="small"
        style={styles.fab}
        onPress={() => navigation.navigate('UploadForm')}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  customButton: {
    position: 'absolute',
    right: 0,
  },
});