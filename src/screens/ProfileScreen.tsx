import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthApi } from '@/hooks';

export const ProfileScreen = ({ navigation }) => {
    const { deleteLogout } = useAuthApi();

    const handleLogOut = async () => {
        await deleteLogout()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleLogOut}>
                    <View style={styles.btnXL}>
                        <Text style={styles.btnXLText}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        justifyContent: 'center',
    },
    btnXL: {
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        backgroundColor: '#f75249',
        borderColor: '#f75249',
    },
    btnXLText: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: '#fff',
    },
});