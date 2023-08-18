import React from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthApi } from '@/hooks';
import { Button } from 'react-native-paper';

export const ProfileScreen = ({ navigation }) => {
    const { deleteLogout } = useAuthApi();
    const handleLogOut = async () => {
        await deleteLogout()
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button mode="outlined" onPress={handleLogOut}>Log out</Button>
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