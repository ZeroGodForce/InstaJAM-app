import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthApi } from '@/hooks';

export const ProfileScreen = ({ navigation }) => {
    const { deleteLogout } = useAuthApi();
    const handleLogOut = async () => {
        await deleteLogout()
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Button onPress={handleLogOut} title="Log out" />
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
});