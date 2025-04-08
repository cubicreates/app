import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Calendar from 'react-native-calendars/Calendar';
import PropTypes from 'prop-types';

const medicines = [
    { id: 1, name: 'Aspirin', letter: 'A', color: '#81E6D9' }, // bg-medical-500 equivalent
    { id: 2, name: 'Metformin', letter: 'M', color: '#63B381' }, // bg-medical-600 equivalent
    { id: 3, name: 'Crocin', letter: 'C', color: '#81E6D9' }, // bg-medical-500 equivalent
    { id: 4, name: 'Diprolene', letter: 'D', color: '#63B381' }, // bg-medical-600 equivalent
];

const doseData = {
    '2024-04-05': 'taken',
    '2024-04-04': 'missed',
    '2024-04-03': 'pending',
    '2024-04-02': 'selected', // Add this line for April 2nd
};

const Monitor = ({ setActiveComponent }) => {
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleMedicineClick = (medicine) => {
        setSelectedMedicine(medicine);
        setShowCalendar(true);
    };

    const handleDayPress = (day) => {
        setSelectedDate(new Date(day.year, day.month - 1, day.day));
        setShowModal(true);
    };

    const getDayBackgroundColor = (date) => {
        const dateStr = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        const status = doseData[dateStr];
        if (status === 'taken') return '#A7F3D0'; // bg-green-200 equivalent
        if (status === 'missed') return '#FECACA'; // bg-red-200 equivalent
        if (status === 'selected') return '#BAE6FD'; // bg-sky-200 equivalent
        if (status === 'pending') return '#BAE6FD'; // bg-sky-200 equivalent
        return undefined;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Medicine Report</Text>
                    <Text style={styles.headerSubtitle}>Track your medication history</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setActiveComponent('dashboard')}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>{'<'} Back to Dashboard</Text>
                </TouchableOpacity>
            </View>

            {/* Medicine Cards */}
            {!showCalendar && (
                <>
                    <Text style={styles.medicineTitle}>Your Medicine</Text>
                    <ScrollView horizontal style={styles.medicineList}>
                        {medicines.map((medicine) => (
                            <TouchableOpacity
                                key={medicine.id}
                                onPress={() => handleMedicineClick(medicine)}
                                style={styles.medicineCard}
                            >
                                <View style={[styles.medicineIconContainer, { backgroundColor: medicine.color }]}>
                                    <Text style={styles.medicineIcon}>{medicine.letter}</Text>
                                </View>
                                <Text style={styles.medicineName}>{medicine.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </>
            )}

            {/* Calendar View */}
            {showCalendar && selectedMedicine && (
                <View style={styles.calendarContainer}>
                    <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.backButton}>
                        <Text style={styles.backButtonText}>{'<'} Back to Medicines</Text>
                    </TouchableOpacity>
                    <View style={styles.calendarCard}>
                        <Text style={styles.calendarTitle}>{selectedMedicine.name} Dose History</Text>
                        <Calendar
                            onDayPress={handleDayPress}
                            style={styles.calendar}
                            theme={{
                                calendarBackground: '#fff',
                                dayTextColor: '#4A5568',
                                textDisabledColor: '#CBD5E0',
                                monthTextColor: '#2D3748',
                                arrowColor: '#4A5568',
                                todayBackgroundColor: '#EDF2F7',
                                selectedDayBackgroundColor: '#63B381',
                                selectedDayTextColor: '#fff',
                            }}
                            dayComponent={({ date, state }) => {
                                const backgroundColor = getDayBackgroundColor(date);
                                return (
                                    <TouchableOpacity
                                        style={[styles.dateTile, backgroundColor && { backgroundColor }]}
                                        onPress={() => handleDayPress(date)}
                                        disabled={state === 'disabled'}
                                    >
                                        <Text style={{ color: state === 'disabled' ? '#CBD5E0' : '#4A5568' }}>{date.day}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendColor, { backgroundColor: '#A7F3D0' }]} />
                                <Text style={styles.legendText}>Taken</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendColor, { backgroundColor: '#FECACA' }]} />
                                <Text style={styles.legendText}>Missed</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendColor, { backgroundColor: '#BAE6FD' }]} />
                                <Text style={styles.legendText}>Pending</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendColor, { backgroundColor: '#BAE6FD' }]} />
                                <Text style={styles.legendText}>Selected</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}

            {/* Modal */}
            <Modal visible={showModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {selectedMedicine?.name} - {selectedDate?.toDateString()}
                        </Text>
                        <View style={styles.modalDetail}>
                            <Text style={styles.modalDetailLabel}>Status</Text>
                            <Text style={styles.modalDetailValue}>Taken</Text>
                        </View>
                        <View style={styles.modalDetail}>
                            <Text style={styles.modalDetailLabel}>Time</Text>
                            <Text style={styles.modalDetailValue}>8:00 AM</Text>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

Monitor.propTypes = {
    setActiveComponent: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#718096',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0F2FE',
        backgroundColor: '#E0F2FE',
    },
    backButtonText: {
        color: '#1E88E5',
        fontSize: 14,
        fontWeight: 'medium',
    },
    medicineTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#2D3748',
        marginBottom: 16,
    },
    medicineList: {
        marginBottom: 24,
    },
    medicineCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginRight: 16,
        width: 120,
        alignItems: 'center',
    },
    medicineIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    medicineIcon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    medicineName: {
        fontSize: 16,
        fontWeight: 'semibold',
        color: '#4A5568',
        textAlign: 'center',
    },
    calendarContainer: {
        gap: 16,
    },
    calendarCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        padding: 16,
    },
    calendarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 16,
        textAlign: 'center',
    },
    calendar: {
        borderRadius: 8,
    },
    dateTile: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    legendText: {
        fontSize: 12,
        color: '#718096',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#EDF2F7',
    },
    modalDetailLabel: {
        fontSize: 16,
        color: '#718096',
    },
    modalDetailValue: {
        fontSize: 16,
        fontWeight: 'medium',
        color: '#2D3748',
    },
    modalCloseButton: {
        backgroundColor: '#63B381',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    modalCloseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Monitor;