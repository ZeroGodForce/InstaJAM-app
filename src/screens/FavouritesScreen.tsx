import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native';
import { ToggleButton, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Fruits = 'watermelon' | 'strawberries';

export const FavouritesScreen = () => {
  const [fruit, setFruit] = React.useState<Fruits>('watermelon');
  const handleFruit = (value: Fruits) => setFruit(value);

  return (
    <SafeAreaView>
      <List.Section title="Custom & union types">
        <View style={[styles.padding, styles.row]}>
          <ToggleButton.Group value={fruit} onValueChange={handleFruit}>
            <ImageBackground
              style={styles.customImage}
              source={{
                uri: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              }}
            >
              <ToggleButton
                value="watermelon"
                size={24}
                style={styles.customButton}
                iconColor="white"
                icon={fruit === 'watermelon' ? 'heart' : 'heart-outline'}
              />
            </ImageBackground>
            <ImageBackground
              style={styles.customImage}
              source={{
                uri: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
              }}
            >
              <ToggleButton
                value="strawberries"
                size={24}
                style={styles.customButton}
                iconColor="white"
                icon={fruit === 'strawberries' ? 'heart' : 'heart-outline'}
              />
            </ImageBackground>
          </ToggleButton.Group>
        </View>
      </List.Section>
    </SafeAreaView>
  );
};

FavouritesScreen.title = 'Toggle Button';

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
  },
  customImage: {
    width: 143,
    height: 153,
    margin: 2,
  },
  customButton: {
    position: 'absolute',
    right: 0,
  },
});