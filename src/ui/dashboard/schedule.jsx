import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const Schedule = ({ setActiveComponent }) => {
    // Sample data structure for the weekly schedule
    const weeklySchedule = [
        {
            day: 'Monday',
            date: 'April 8, 2024',
            medicines: [
                { time: '08:00 AM', name: 'Aspirin', dosage: '10mg - 1 pill' },
                { time: '02:00 PM', name: 'Vitamin C', dosage: '500mg - 2 pills' },
            ],
        },
        {
            day: 'Tuesday',
            date: 'April 9, 2024',
            medicines: [
                { time: '09:00 AM', name: 'Ibuprofen', dosage: '20mg - 1 pill' },
                { time: '03:00 PM', name: 'Calcium', dosage: '600mg - 1 pill' },
            ],
        },
        // Add more days as needed
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setActiveComponent('dashboard')}
                style={styles.backButton}
            >
                <Text style={styles.appTitle}>
                    Dose<Text style={styles.appSubtitle}>Buddy</Text>
                </Text>
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerIconText}>
                    <FontAwesomeIcon icon={faCalendarAlt} size={24} color="#2C7A7B" />
                    <Text style={styles.headerTitle}>Weekly Schedule</Text>
                </View>
            </View>

            {/* Schedule Content */}
            <ScrollView style={styles.scheduleContent}>
                {weeklySchedule.map((day, dayIndex) => (
                    <View key={dayIndex} style={styles.daySchedule}>
                        <View style={styles.dayHeader}>
                            <Text style={styles.dayTitle}>{day.day}</Text>
                            <Text style={styles.dateText}>{day.date}</Text>
                        </View>

                        {/* Timeline */}
                        <View style={styles.timelineContainer}>
                            <View style={styles.timelineLine} />

                            {day.medicines.map((medicine, medIndex) => (
                                <View key={medIndex} style={[styles.medicineItem, medIndex === day.medicines.length - 1 && styles.lastMedicineItem]}>
                                    {/* Timeline dot */}
                                    <View style={styles.timelineDot} />

                                    {/* Medicine details */}
                                    <View style={styles.medicineDetails}>
                                        <View style={styles.medicineTime}>
                                            <FontAwesomeIcon icon={faClock} size={16} color="#2C7A7B" style={styles.clockIcon} />
                                            <Text style={styles.timeText}>{medicine.time}</Text>
                                        </View>
                                        <Text style={styles.medicineName}>{medicine.name}</Text>
                                        <Text style={styles.dosageText}>{medicine.dosage}</Text>
                                    </View>

                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>Scheduled</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        right: 16,
        padding: 8,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C7A7B',
    },
    appSubtitle: {
        color: '#81E6D9',
    },
    header: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerIconText: {
        flexDirection: 'row',
        alignItems: 'center',
        spaceX: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C7A7B',
    },
    scheduleContent: {
        flex: 1,
        padding: 16,
    },
    daySchedule: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
        padding: 16,
        marginBottom: 16,
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#4A5568',
    },
    dateText: {
        fontSize: 14,
        color: '#718096',
    },
    timelineContainer: {
        position: 'relative',
        paddingLeft: 24,
    },
    timelineLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 8,
        width: 2,
        backgroundColor: '#81E6D9',
    },
    medicineItem: {
        position: 'relative',
        marginBottom: 16,
        paddingLeft: 24,
    },
    lastMedicineItem: {
        marginBottom: 0,
    },
    timelineDot: {
        position: 'absolute',
        left: 6,
        top: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2C7A7B',
        borderWidth: 2,
        borderColor: 'white',
    },
    medicineDetails: {
        backgroundColor: '#F7FAFC',
        borderRadius: 6,
        padding: 12,
        marginLeft: 16,
    },
    medicineTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        spaceX: 4,
    },
    clockIcon: {
        marginRight: 4,
    },
    timeText: {
        fontSize: 12,
        fontWeight: 'medium',
        color: '#2C7A7B',
    },
    medicineName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    dosageText: {
        fontSize: 14,
        color: '#4A5568',
    },
    statusBadge: {
        backgroundColor: '#E6FFFA',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginLeft: 16,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    statusText: {
        color: '#38A169',
        fontSize: 10,
        fontWeight: 'medium',
    },
});

export default Schedule;