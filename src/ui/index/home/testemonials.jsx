import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const testimonials = [
    {
        id: '1',
        quote: "My grandmother never forgets her medicine now. This has made her life so much easier!",
        name: "Sarah Johnson",
        role: "Granddaughter & Caregiver",
        image: require('./assets/placeholder.svg'),
    },
    {
        id: '2',
        quote: "As a doctor, I can now ensure my patients take their medicine on time. The remote monitoring feature has improved adherence significantly.",
        name: "Dr. Michael Chen",
        role: "Geriatric Physician",
        image: require('./assets/placeholder.svg'),
    },
    {
        id: '3',
        quote: "I manage multiple medications for my condition, and this device has eliminated all the confusion. The alerts are a lifesaver!",
        name: "Robert Garcia",
        role: "Patient with Chronic Condition",
        image: require('./assets/placeholder.svg'),
    },
    {
        id: '4',
        quote: "Even though I live across the country, I can monitor my father's medication schedule. It gives me peace of mind.",
        name: "Jennifer Kim",
        role: "Remote Caregiver",
        image: require('./assets/placeholder.svg'),
    },
];

const Testimonials = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const flatListRef = useRef(null);


    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.quote}>"{item.quote}"</Text>
            <View style={styles.profileContainer}>
                <Image source={item.image} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                </View>
            </View>
        </View>
    );

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (screenWidth * 0.85));
        if (index !== activeSlide) {
            setActiveSlide(index);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>What People Are Saying</Text>
            <FlatList
                ref={flatListRef}
                data={testimonials}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={screenWidth * 0.85 + 20} // item width + padding
                snapToAlignment="center"
                decelerationRate="fast"
                contentContainerStyle={styles.flatListContent}
                onMomentumScrollEnd={handleScroll}
                getItemLayout={(data, index) => ({
                    length: screenWidth * 0.85,
                    offset: (screenWidth * 0.85 + 20) * index,
                    index,
                })}
            />
            <View style={styles.paginationContainer}>
                {testimonials.map((_, index) => (
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
    card: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 20,
        width: screenWidth * 0.85,
        marginHorizontal: 10,
        elevation: 3,
    },
    quote: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#374151',
        textAlign: 'center',
        marginBottom: 16,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#e5e7eb',
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    role: {
        fontSize: 14,
        color: '#6b7280',
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

export default Testimonials;