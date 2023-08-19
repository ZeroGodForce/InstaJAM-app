import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const ImageModal = ({ navigation, route }) => {
    const { image } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: image.title,
            headerLargeTitle: false,
        });
    }, [navigation]);

    return (
        <View>
            <Text>{image.description}</Text>
            <Text>{image.width} x {image.height}</Text>
            <Text>Size: {image.filesize}</Text>
            <Text>{image.createdAt}</Text>
            <Image
                source={{ uri: image.imagePath }}
                style={styles.photo}
                accessibilityIgnoresInvertColors
            />
        </View>
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
    photo: {
        height: '100%',
        width: '100%',
        padding: 4,
    },
});