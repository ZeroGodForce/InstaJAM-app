import React, { useLayoutEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';

export const ImageModal = ({ navigation, route }) => {
    const { image } = route.params;
    const imageWidth = Dimensions.get('window').width;
    const imageHeight = (image.width && image.height) ? (image.height / image.width) * imageWidth : imageWidth;
    const [showBlackout, setShowBlackout] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: image.title,
            headerLargeTitle: false,
        });
    }, [navigation]);

    const toggleBlackout = () => {
        setShowBlackout(!showBlackout);
    };

    return (
        <Pressable onPress={toggleBlackout} style={{ flex: 1 }}>
            <ImageBackground
                source={{ uri: image.imagePath }}
                style={[styles.photo, { height: imageHeight }]}
                resizeMode="contain"
                accessibilityIgnoresInvertColors
            >
                {showBlackout && (
                    <View style={styles.blackout}>
                        <Text style={styles.text}>{image.description}</Text>
                        <Text style={styles.text}>{image.width} x {image.height}</Text>
                        <Text style={styles.text}>Size: {image.filesize}</Text>
                        <Text style={styles.text}>{image.createdAt}</Text>
                    </View>
                )}
            </ImageBackground>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    photo: {
        width: '100%',
        justifyContent: 'flex-end',
    },
    textOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: 16,
    },
    text: {
        color: 'white',
        fontSize: 10,
        marginBottom: 8,
    },
    blackout: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
