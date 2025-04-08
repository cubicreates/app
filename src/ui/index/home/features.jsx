import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: screenWidth } = Dimensions.get('window');

const features = [
    {
        id: '1',
        name: 'Smart Dispenser',
        description:
            'Automated medication dispensing with real-time monitoring and alerts.',
        icon: 'pill',
    },
    {
        id: '2',
        name: 'Family Sync',
        description:
            'Keep your loved ones informed about your medication schedule and adherence.',
        icon: 'account-group',
    },
    {
        id: '3',
        name: 'Doctor Dashboard',
        description:
            'Enable healthcare providers to monitor and adjust treatment remotely.',
        icon: 'stethoscope',
    },
    {
        id: '4',
        name: 'Mobile Access',
        description:
            'Manage and track medications from anywhere using our intuitive mobile app.',
        icon: 'cellphone',
    },
];

const advancedFeatures = [
    {
        id: '5',
        name: 'AI Medication Assistant',
        description: 'Uses AI to suggest dosage adjustments based on patient history and health data.',
        icon: 'robot',
    },
    {
        id: '6',
        name: 'Emergency Alerts',
        description: 'Sends alerts to emergency contacts and doctors on missed critical doses.',
        icon: 'alert-circle-outline',
    },
    {
        id: '7',
        name: 'Integration with Smart Devices',
        description: 'Syncs with smartwatches and fitness trackers for holistic health tracking.',
        icon: 'watch-variant',
    },
    {
        id: '8',
        name: 'Multi-language Support',
        description: 'Accessible to users across different languages and regions.',
        icon: 'translate',
    },
];

const FeatureCard = ({ item }) => (
    <View style={styles.card}>
        <MaterialCommunityIcons name={item.icon} size={28} color="#00AEEF" style={styles.icon} />
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
);

export default function Features() {
    // Completely replacing the carousel with a native FlatList component
    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <FeatureCard item={item} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>What DoseBuddy Offers</Text>
            <Text style={styles.subtext}>
                Designed for patients, families, and healthcare providers, DoseBuddy bridges the gap between care and technology.
            </Text>

            <Text style={styles.sectionTitle}>Features</Text>
            <FlatList
                data={features}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={screenWidth * 0.85}
                decelerationRate="fast"
                contentContainerStyle={styles.listContent}
            />

            <Text style={styles.sectionTitle}>Advanced Features</Text>
            <FlatList
                data={advancedFeatures}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={screenWidth * 0.85}
                decelerationRate="fast"
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 8,
    },
    subtext: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00AEEF',
        marginBottom: 12,
        textAlign: 'center',
    },
    listContent: {
        paddingHorizontal: 8,
        paddingBottom: 16,
    },
    cardContainer: {
        width: screenWidth * 0.8,
        paddingHorizontal: 8,
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: '100%',
    },
    icon: {
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
    },
});