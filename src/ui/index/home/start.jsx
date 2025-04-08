import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Start() {
    const scrollToHowItWorks = () => {
        // Navigation logic placeholder
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Never miss <Text style={styles.highlight}>a dose again</Text>
            </Text>
            <Text style={styles.subtitle}>Smart, Secure, Automated.</Text>
            <Text style={styles.description}>
                The DoseBuddy revolutionizes medication management with intelligent dispensing, real-time notifications,
                and caregiver monitoring to ensure perfect medication adherence.
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={scrollToHowItWorks}>
                    <Text style={styles.secondaryButtonText}>See How It Works</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.benefitsContainer}>
                <View style={styles.benefitsRow}>
                    <View style={styles.benefitItem}>
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="clock-outline" size={20} color="#00AEEF" />
                        </View>
                        <Text style={styles.benefitText}>Automated Dispensing</Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="bell-outline" size={20} color="#00AEEF" />
                        </View>
                        <Text style={styles.benefitText}>Real-Time Alerts</Text>
                    </View>
                </View>

                <View style={styles.benefitsRow}>
                    <View style={styles.benefitItem}>
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="account-check-outline" size={20} color="#00AEEF" />
                        </View>
                        <Text style={styles.benefitText}>Remote Monitoring</Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="bell-ring-outline" size={20} color="#00AEEF" />
                        </View>
                        <Text style={styles.benefitText}>AI-Based Smart Alerts</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f9ff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 10,
    },
    highlight: {
        color: '#00AEEF',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4b5563',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#4b5563',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#00AEEF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#00AEEF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    secondaryButtonText: {
        color: '#00AEEF',
        fontWeight: '600',
    },
    benefitsContainer: {
        marginTop: 10,
    },
    benefitsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
    },
    iconWrapper: {
        backgroundColor: '#e0f2fe',
        padding: 6,
        borderRadius: 100,
        marginRight: 8,
    },
    benefitText: {
        color: '#374151',
        fontSize: 15,
        flexShrink: 1,
    },
});