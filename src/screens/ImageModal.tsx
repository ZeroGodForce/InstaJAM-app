import React, { useLayoutEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

export const ImageModal = ({ navigation, route }) => {
    const { title, description, imagePath } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
            description: description,
            imagePath: imagePath,
            headerLargeTitle: false,
        });
    }, [navigation]);

    return (
        <View>
            <Image
                source={{ uri: imagePath }}
                style={styles.photo}
                accessibilityIgnoresInvertColors
            />
            <Text>{description}</Text>
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