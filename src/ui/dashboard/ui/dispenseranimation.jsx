import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { motion } from 'framer-motion';

export default function DispenserAnimation() {
    const radius = 23.5; // Adjusted radius for smaller circle (half of w-20)
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Updates every minute

        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <View style={styles.container}>
            <View style={styles.dispenser}>
                {/* Blue Background */}
                <View style={styles.blueBackground} />

                {/* White Circle */}
                <View style={styles.whiteCircle}>
                    {/* Black Screen with Time */}
                    <View style={styles.blackScreen}>
                        <Text style={styles.timeText}>{formattedTime}</Text>
                    </View>

                    {/* Animated Blue Capsule */}
                    <motion.View
                        style={{
                            ...styles.blueCapsule,
                            transformOrigin: `${radius}px center`,
                            left: '50%',
                            marginLeft: -radius,
                            top: '50%',
                            marginTop: -6, // Adjusted marginTop
                        }}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                </View>

                {/* Button at the bottom */}
                <View style={styles.bottomButton} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6', // Equivalent to bg-white-100
    },
    dispenser: {
        width: 128, // Equivalent to w-32 * 4
        height: 176, // Equivalent to h-44 * 4
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 12, // Equivalent to rounded-xl
        padding: 12, // Equivalent to p-3
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blueBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '60%', // Adjusted for h-3/5
        backgroundColor: '#3B82F6', // Equivalent to bg-blue-500
        borderTopLeftRadius: 12, // Equivalent to rounded-t-xl
        borderTopRightRadius: 12, // Equivalent to rounded-t-xl
    },
    whiteCircle: {
        position: 'absolute',
        top: '11.36%', // Equivalent to top-4 / 44 * 100
        left: '50%',
        transform: [{ translateX: -40 }, { translateY: -40 }], // Equivalent to transform -translate-x-1/2 with adjusted size
        width: 80, // Equivalent to w-20 * 4
        height: 80, // Equivalent to h-20 * 4
        backgroundColor: 'white',
        borderRadius: 40, // Equivalent to rounded-full
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blackScreen: {
        width: 56, // Equivalent to w-14 * 4
        height: 28, // Equivalent to h-7 * 4
        backgroundColor: 'black',
        borderRadius: 4, // Equivalent to rounded-md
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        color: '#6EE7B7', // Equivalent to text-green-400
        fontSize: 10, // Equivalent to text-xs * 4 (adjust as needed)
        fontFamily: 'monospace', // Equivalent to font-mono
    },
    blueCapsule: {
        position: 'absolute',
        width: 14, // Equivalent to w-3.5 * 4
        height: 14, // Equivalent to h-3.5 * 4
        backgroundColor: '#60A5FA', // Equivalent to bg-blue-300
        borderRadius: 7, // Equivalent to rounded-full
    },
    bottomButton: {
        position: 'absolute',
        bottom: '6.8%', // Equivalent to bottom-3 / 44 * 100
        left: '50%',
        transform: [{ translateX: -28 }], // Equivalent to transform -translate-x-1/2 with adjusted size
        width: 56, // Equivalent to w-14 * 4
        height: 16, // Equivalent to h-4 * 4
        backgroundColor: '#27272A', // Equivalent to bg-gray-800
        borderRadius: 4, // Equivalent to rounded-md
    },
});