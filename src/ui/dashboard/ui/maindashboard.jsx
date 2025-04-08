import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCheckCircle, faClock, faChartLine, faPlus } from '@fortawesome/free-solid-svg-icons';

const medications = [
    {
        name: 'Aspirin',
        dosage: '100mg - 1 pill',
        time: '8:00 AM',
        status: 'Taken',
        icon: 'A',
        statusColor: '#E0F7FA', // bg-green-100 equivalent
        textColor: '#1B5E20', // text-green-700 equivalent
        timeIcon: <FontAwesomeIcon icon={faCheckCircle} size={16} color="#4CAF50" />,
    },
    {
        name: 'Metformin',
        dosage: '500mg - 1 pill',
        time: '1:00 PM',
        status: 'Upcoming',
        icon: 'M',
        statusColor: '#E3F2FD', // bg-blue-100 equivalent
        textColor: '#1565C0', // text-blue-700 equivalent
        timeIcon: <FontAwesomeIcon icon={faClock} size={16} color="#757575" />,
    },
    {
        name: 'Atorvastatin',
        dosage: '20mg - 1 pill',
        time: '9:00 PM',
        status: 'Upcoming',
        icon: 'A',
        statusColor: '#E3F2FD', // bg-blue-100 equivalent
        textColor: '#1565C0', // text-blue-700 equivalent
        timeIcon: <FontAwesomeIcon icon={faClock} size={16} color="#757575" />,
    },
    {
        name: 'Crocine',
        dosage: '10mg - 1 pill',
        time: '10:00 PM',
        status: 'Upcoming',
        icon: 'C',
        statusColor: '#E3F2FD', // bg-blue-100 equivalent
        textColor: '#1565C0', // text-blue-700 equivalent
        timeIcon: <FontAwesomeIcon icon={faClock} size={16} color="#757575" />,
    },
];

const MainDashboard = ({ setActiveComponent, name }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Good Morning, {name}</Text>
                    <Text style={styles.subtitle}>Here's your medication schedule for today</Text>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        onPress={() => setActiveComponent('notifications')}
                        style={styles.headerButton}
                    >
                        <FontAwesomeIcon icon={faBell} size={16} color="#4A5568" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveComponent('medicine-report')}
                        style={styles.headerButton}
                    >
                        <FontAwesomeIcon icon={faChartLine} size={16} color="#4A5568" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Medicine Report</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.medicationTitle}>Today's Medications</Text>

            <ScrollView style={styles.medicationList}>
                {medications.map((med, index) => (
                    <View key={index} style={styles.medicationItem}>
                        <View style={styles.medicationInfo}>
                            <View style={styles.medicationIconContainer}>
                                <Text style={styles.medicationIcon}>{med.icon}</Text>
                            </View>
                            <View>
                                <Text style={styles.medicationName}>{med.name}</Text>
                                <Text style={styles.medicationDosage}>{med.dosage}</Text>
                                <View style={styles.medicationTime}>
                                    <Text>{med.time}</Text>
                                    {med.timeIcon}
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.medicationStatus, { backgroundColor: med.statusColor, color: med.textColor }]}>
                                {med.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    onPress={() => setActiveComponent('medicine-doses')}
                    style={styles.addButton}
                >
                    <FontAwesomeIcon icon={faPlus} size={20} color="#4A5568" style={styles.addIcon} />
                    <Text style={styles.addButtonText}>Add Medication</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

MainDashboard.propTypes = {
    setActiveComponent: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

MainDashboard.defaultProps = {
    name: 'User',
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
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    subtitle: {
        fontSize: 14,
        color: '#718096',
    },
    buttonGroup: {
        flexDirection: 'column',
        gap: 8,
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#CBD5E0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        backgroundColor: 'white',
    },
    buttonIcon: {
        width: 16,
        height: 16,
        color: '#4A5568',
    },
    buttonText: {
        fontSize: 14,
        color: '#4A5568',
    },
    medicationTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#2D3748',
        marginBottom: 16,
    },
    medicationList: {
        maxHeight: 300,
        paddingRight: 8,
    },
    medicationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginBottom: 12,
    },
    medicationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    medicationIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E0F2FE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    medicationIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E88E5',
    },
    medicationName: {
        fontWeight: 'semibold',
        color: '#2D3748',
    },
    medicationDosage: {
        fontSize: 12,
        color: '#718096',
    },
    medicationTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        fontSize: 12,
        color: '#718096',
    },
    medicationStatus: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        fontSize: 12,
        fontWeight: 'medium',
    },
    addButtonContainer: {
        marginTop: 24,
        alignItems: 'flex-end',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#CBD5E0',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        backgroundColor: 'white',
    },
    addIcon: {
        fontSize: 20,
        color: '#4A5568',
    },
    addButtonText: {
        fontSize: 16,
        color: '#4A5568',
    },
});

export default MainDashboard;