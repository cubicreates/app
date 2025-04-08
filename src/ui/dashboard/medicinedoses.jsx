import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPills, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const MedicineDoses = ({ onClose, setActiveComponent }) => {
    const initialMedicineState = {
        name: '',
        pills: '',
        doses: '',
        fromDate: null,
        toDate: null,
        conditions: '',
    };

    const [medicines, setMedicines] = useState(Array(6).fill(null).map(() => ({ ...initialMedicineState })));
    const [datePickerVisible, setDatePickerVisible] = useState({ index: null, field: null });

    const handleChange = (index, field, value) => {
        const updatedMedicines = [...medicines];
        updatedMedicines[index] = {
            ...updatedMedicines[index],
            [field]: value,
        };
        setMedicines(updatedMedicines);
    };

    const showDatePicker = (index, field) => {
        setDatePickerVisible({ index, field });
    };

    const hideDatePicker = () => {
        setDatePickerVisible({ index: null, field: null });
    };

    const handleDateChange = (event, selectedDate) => {
        hideDatePicker();
        if (selectedDate) {
            const { index, field } = datePickerVisible;
            handleChange(index, field, selectedDate);
        }
    };

    const handleSubmit = () => {
        // Validate the form data
        const hasData = medicines.some(
            (medicine) =>
                medicine.name || medicine.pills || medicine.doses || medicine.fromDate || medicine.toDate
        );

        if (!hasData) {
            alert('Please fill in at least one medicine\'s details');
            return;
        }

        // Filter out empty medicine entries
        const filledMedicines = medicines.filter(
            (medicine) => medicine.name && medicine.pills && medicine.doses && medicine.fromDate && medicine.toDate
        );

        // TODO: Handle the submission logic here
        console.log('Submitting medicines:', filledMedicines);

        // Close the form after successful submission
        onClose();
    };

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

            {/* Title Section */}
            <View style={styles.titleSection}>
                <Text style={styles.title}>Medicine Doses Setup</Text>
            </View>

            {/* Medicine Forms */}
            <ScrollView>
                {medicines.map((medicine, index) => (
                    <View key={index} style={styles.medicineForm}>
                        <Text style={styles.medicineFormTitle}>
                            <FontAwesomeIcon icon={faPills} size={20} color="#2C7A7B" style={styles.pillIcon} />
                            Medicine {index + 1}
                        </Text>

                        <View style={styles.gridContainer}>
                            {/* Name of Medicine */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Name of Medicine</Text>
                                <TextInput
                                    style={styles.input}
                                    type="text"
                                    value={medicine.name}
                                    onChangeText={(text) => handleChange(index, 'name', text)}
                                    placeholder="Enter medicine name"
                                />
                            </View>

                            {/* Number of Pills */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Number of Pills</Text>
                                <TextInput
                                    style={styles.input}
                                    type="number"
                                    value={medicine.pills}
                                    onChangeText={(text) => handleChange(index, 'pills', text)}
                                    placeholder="Enter number of pills"
                                    keyboardType="numeric"
                                    min="1"
                                />
                            </View>

                            {/* Number of Doses */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Number of Doses</Text>
                                <TextInput
                                    style={styles.input}
                                    type="number"
                                    value={medicine.doses}
                                    onChangeText={(text) => handleChange(index, 'doses', text)}
                                    placeholder="Enter number of doses"
                                    keyboardType="numeric"
                                    min="1"
                                />
                            </View>

                            {/* Duration */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Duration</Text>
                                <View style={styles.durationContainer}>
                                    <TouchableOpacity onPress={() => showDatePicker(index, 'fromDate')} style={styles.datePickerButton}>
                                        <Text style={styles.datePickerText}>
                                            {medicine.fromDate ? medicine.fromDate.toLocaleDateString() : 'From'}
                                        </Text>
                                        <FontAwesomeIcon icon={faCalendarAlt} size={16} color="#718096" style={styles.calendarIcon} />
                                    </TouchableOpacity>
                                    <Text style={styles.dateSeparator}>to</Text>
                                    <TouchableOpacity
                                        onPress={() => showDatePicker(index, 'toDate')}
                                        style={styles.datePickerButton}
                                        disabled={!medicine.fromDate}
                                    >
                                        <Text style={styles.datePickerText}>
                                            {medicine.toDate ? medicine.toDate.toLocaleDateString() : 'To'}
                                        </Text>
                                        <FontAwesomeIcon icon={faCalendarAlt} size={16} color="#718096" style={styles.calendarIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Special Conditions */}
                            <View style={[styles.inputGroup, styles.conditionsGroup]}>
                                <Text style={styles.label}>Special Conditions</Text>
                                <TextInput
                                    style={styles.textArea}
                                    value={medicine.conditions}
                                    onChangeText={(text) => handleChange(index, 'conditions', text)}
                                    placeholder="Enter any special conditions"
                                    multiline
                                    numberOfLines={2}
                                />
                            </View>
                        </View>

                        {datePickerVisible.index === index && (
                            <DateTimePicker
                                value={medicines[index][datePickerVisible.field] || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                ))}

                {/* Submit Button */}
                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Save Medicine Doses</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
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
    titleSection: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C7A7B',
    },
    medicineForm: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
        padding: 16,
        marginBottom: 16,
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    medicineFormTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#2C7A7B',
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pillIcon: {
        marginRight: 8,
    },
    gridContainer: {
        flexDirection: 'column',
        gap: 16,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 'medium',
        color: '#4A5568',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#374151',
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    datePickerButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#374151',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    datePickerText: {
        fontSize: 16,
        color: '#374151',
    },
    calendarIcon: {
        marginLeft: 8,
    },
    dateSeparator: {
        color: '#718096',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#374151',
        textAlignVertical: 'top',
    },
    conditionsGroup: {
        // span across columns if needed in a web grid
    },
    submitButtonContainer: {
        marginTop: 24,
        marginBottom: 24,
    },
    submitButton: {
        backgroundColor: '#2C7A7B',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default MedicineDoses;