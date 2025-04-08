import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleBar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                <Text style={styles.dose}>Dose</Text>
                <Text style={styles.buddy}>Buddy</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 27,
        fontWeight: '900', // Changed from 'bold' to '900' for thicker text
    },
    dose: {
        color: '#004E64',
        fontWeight: '900', // Added fontWeight here
    },
    buddy: {
        color: '#00AEEF',
        fontWeight: '900', // Added fontWeight here
    },
});

export default TitleBar;
