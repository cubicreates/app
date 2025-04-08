import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: screenWidth } = Dimensions.get('window');

const Tutorial = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const flatListRef = useRef(null);

    const steps = [
        {
            id: '1',
            icon: 'pill',
            title: 'Load Pills',
            description: 'Patient or caregiver loads medicine into the dispenser.',
            color: '#3B82F6'
        },
        {
            id: '2',
            icon: 'calendar-clock',
            title: 'Set Schedule',
            description: 'Set reminders via the app or voice commands.',
            color: '#10B981'
        },
        {
            id: '3',
            icon: 'bell-outline',
            title: 'Get Alerts',
            description: 'Receive LED, sound, or app notifications.',
            color: '#FACC15'
        },
        {
            id: '4',
            icon: 'check-circle-outline',
            title: 'Take the Pill',
            description: 'Dispenser auto-releases the correct dose.',
            color: '#3B82F6'
        },
        {
            id: '5',
            icon: 'account-eye-outline',
            title: 'Remote Monitoring',
            description: 'Caregivers track and receive alerts through the app.',
            color: '#8B5CF6'
        }
    ];


    const renderItem = ({ item }) => (
        <View style={styles.stepCard}>
            <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color={item.color}
                style={styles.icon}
            />
            <Text style={styles.stepTitle}>{item.title}</Text>
            <Text style={styles.stepDescription}>{item.description}</Text>

            {/* Video space placeholder */}
            <View style={styles.videoContainer}>
                {/* Video will be attached here */}
            </View>
        </View>
    );

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (screenWidth * 0.8));
        if (index !== activeSlide) {
            setActiveSlide(index);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>How It Works</Text>
            <FlatList
                ref={flatListRef}
                data={steps}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={screenWidth * 0.8 + 20} // item width + padding
                snapToAlignment="center"
                decelerationRate="fast"
                contentContainerStyle={styles.flatListContent}
                onMomentumScrollEnd={handleScroll}
                getItemLayout={(data, index) => ({
                    length: screenWidth * 0.8,
                    offset: (screenWidth * 0.8 + 20) * index,
                    index,
                })}
            />
            <View style={styles.paginationContainer}>
                {steps.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeSlide ? styles.dotStyle : styles.inactiveDotStyle
                        ]}
                        onPress={() => {
                            flatListRef.current.scrollToIndex({
                                index,
                                animated: true
                            });
                            setActiveSlide(index);
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        backgroundColor: '#ffffff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1f2937',
        textAlign: 'center',
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    stepCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        width: screenWidth * 0.8,
        marginHorizontal: 10,
        elevation: 3,
    },
    icon: {
        marginBottom: 12,
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    stepDescription: {
        fontSize: 16,
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: 16, // Added margin to create space before video
    },
    videoContainer: {
        width: '100%',
        height: 160, // Adjust height based on your needs
        backgroundColor: '#f0f0f0', // Light gray background to indicate video space
        borderRadius: 8,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    dotStyle: {
        backgroundColor: '#3B82F6',
        width: 10,
        height: 10,
    },
    inactiveDotStyle: {
        backgroundColor: '#d1d5db',
        opacity: 0.4,
        transform: [{ scale: 0.8 }]
    },
});

export default Tutorial;