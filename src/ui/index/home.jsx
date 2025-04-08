import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Start from './home/start';
import Tutorial from './home/tutorial';
import Features from './home/features';
import Testimonials from './home/testemonials';

export default function Home() {
    const handleViewDemoUser = () => {
        // Add your demo user view logic here
        console.log('View Demo User button pressed');
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Start />

                <TouchableOpacity
                    style={styles.demoButton}
                    onPress={handleViewDemoUser}
                >
                    <Text style={styles.demoButtonText}>View Demo User</Text>
                </TouchableOpacity>

                <Tutorial />
                <Features />
                <Testimonials />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    demoButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 15,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    demoButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});