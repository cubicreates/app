import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashMenuBar from './dashmenubar';

const DashTitleBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <DashMenuBar navigation={navigation} />
                <Text style={styles.title}>
                    <Text style={styles.dose}>Dose</Text>
                    <Text style={styles.buddy}>Buddy</Text>
                </Text>
                <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Icon name="home" size={24} color="#004E64" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 27,
        fontWeight: '900',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    dose: {
        color: '#004E64',
        fontWeight: '900',
    },
    buddy: {
        color: '#00AEEF',
        fontWeight: '900',
    },
    iconContainer: {
        width: 40,
        padding: 8,
    },
});

export default DashTitleBar;
