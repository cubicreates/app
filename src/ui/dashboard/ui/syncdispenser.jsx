import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWifi, faBatteryFull, faExclamationTriangle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const SyncDispenser = () => {
    const getProgressBarColor = (color) => {
        switch (color) {
            case 'blue':
                return '#81E6D9'; // Equivalent to bg-medical-500
            case 'red':
                return '#F56565'; // Equivalent to bg-red-500
            default:
                return '#A0AEC0'; // Equivalent to bg-gray-500
        }
    };

    const pills = {
        A: { name: 'Aspirin', current: 15, total: 30, color: 'blue' },
        B: { name: 'Metformin', current: 8, total: 30, color: 'blue' },
        C: { name: 'Atorvastatin', current: 4, total: 30, color: 'red' },
        D: { name: 'Diprolene', current: 3, total: 30, color: 'red' },
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Bedroom Dispenser</Text>
                </View>
                <View style={styles.headerIcons}>
                    <View style={styles.iconText}>
                        <FontAwesomeIcon icon={faBatteryFull} size={12} color="#718096" />
                        <Text style={styles.iconValue}>78%</Text>
                    </View>
                    <View style={styles.iconText}>
                        <FontAwesomeIcon icon={faWifi} size={12} color="#718096" />
                        <Text style={styles.iconValue}>92%</Text>
                    </View>
                </View>
            </View>

            {/* Status */}
            <View style={styles.statusContainer}>
                <View style={styles.statusDot} backgroundColor="#48BB78" /> {/* Equivalent to bg-green-500 */}
                <Text style={styles.statusText}>Online</Text>
                <Text style={styles.statusTime}>• 10m ago</Text>
            </View>

            {/* Pills Remaining */}
            <View style={styles.pillsRemaining}>
                <Text style={styles.pillsRemainingTitle}>Pills Remaining</Text>

                {Object.keys(pills).map((compartment) => {
                    const pill = pills[compartment];
                    const percentage = (pill.current / pill.total) * 100;
                    const isLow = percentage <= 20;

                    return (
                        <View key={compartment} style={styles.pillContainer}>
                            <View style={styles.pillInfo}>
                                <Text style={styles.pillName}>{`${compartment} (${pill.name})`}</Text>
                                <Text style={styles.pillCount}>{`${pill.current}/${pill.total}`}</Text>
                            </View>
                            <View style={styles.progressBarBackground}>
                                <View
                                    style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: getProgressBarColor(pill.color) }]}
                                />
                            </View>
                            {isLow && (
                                <View style={styles.lowPillIndicator}>
                                    <FontAwesomeIcon icon={faExclamationTriangle} size={12} color="#F56565" style={styles.lowPillIcon} />
                                    <Text style={styles.lowPillText}>Low</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>

            {/* Sync Button */}
            <TouchableOpacity style={styles.syncButton}>
                <FontAwesomeIcon icon={faSyncAlt} size={12} color="#718096" style={styles.syncIcon} />
                <Text style={styles.syncButtonText}>Sync Dispenser</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 12, // Equivalent to p-3
        maxWidth: 360, // Equivalent to max-w-xs * some scaling
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8, // Equivalent to mb-1
    },
    headerTitle: {
        fontSize: 14, // Equivalent to text-sm
        fontWeight: 'bold',
        color: '#2D3748', // Equivalent to text-gray-800
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 4, // Equivalent to space-x-1
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 10, // Equivalent to text-[10px]
        color: '#718096', // Equivalent to text-gray-600
    },
    iconValue: {
        marginLeft: 2, // Equivalent to ml-0.5
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12, // Equivalent to text-xs
        color: '#718096', // Equivalent to text-gray-600
        marginBottom: 8, // Equivalent to mb-2
    },
    statusDot: {
        width: 6, // Equivalent to w-1.5
        height: 6, // Equivalent to h-1.5
        borderRadius: 3,
        marginRight: 4, // Equivalent to mr-1
    },
    statusText: {
        fontSize: 12,
    },
    statusTime: {
        marginLeft: 4, // Equivalent to ml-1
    },
    pillsRemaining: {
        marginBottom: 12, // Equivalent to mb-3
    },
    pillsRemainingTitle: {
        fontSize: 14, // Equivalent to text-sm
        fontWeight: 'medium',
        color: '#4A5568', // Equivalent to text-gray-700
        marginBottom: 8, // Equivalent to mb-2
    },
    pillContainer: {
        marginBottom: 6, // Equivalent to mb-1.5
    },
    pillInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12, // Equivalent to text-xs
        color: '#4A5568', // Equivalent to text-gray-700
        marginTop: 16, // Equivalent to mt-4
    },
    pillName: {
        flexShrink: 1,
        marginRight: 8,
    },
    pillCount: {
        marginLeft: 8,
    },
    progressBarBackground: {
        backgroundColor: '#EDF2F7', // Equivalent to bg-gray-200
        borderRadius: 4,
        height: 6, // Equivalent to h-1.5 * 4 (adjust as needed)
        overflow: 'hidden',
    },
    progressBar: {
        borderRadius: 4,
        height: 6,
    },
    lowPillIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12, // Equivalent to text-xs
        color: '#F56565', // Equivalent to text-red-500
        marginTop: 2, // Equivalent to mt-0.5
    },
    lowPillIcon: {
        marginRight: 4, // Equivalent to mr-1
    },
    lowPillText: {
        fontSize: 12,
    },
    syncButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 8, // Equivalent to py-2
        backgroundColor: 'white',
        borderRadius: 6, // Equivalent to rounded-md
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    syncIcon: {
        marginRight: 4, // Equivalent to mr-1
        color: '#718096', // Equivalent to text-gray-500
    },
    syncButtonText: {
        fontSize: 12, // Equivalent to text-xs
        fontWeight: 'medium',
        color: '#4A5568', // Equivalent to text-gray-700
    },
});

export default SyncDispenser;