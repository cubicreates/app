import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
                <MaterialCommunityIcons name="home-outline" size={24} color="#00AEEF" />
                <Text style={[styles.label, { color: '#00AEEF' }]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Product')}>
                <MaterialCommunityIcons name="shopping" size={24} color="#333" />
                <Text style={styles.label}>Product</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('WebApp')}>
                <MaterialCommunityIcons name="web" size={24} color="#333" />
                <Text style={styles.label}>Web App</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('User')}>
                <MaterialCommunityIcons name="account-outline" size={24} color="#333" />
                <Text style={styles.label}>User</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        marginTop: 2,
        color: '#333',
    },
});

export default BottomBar;
