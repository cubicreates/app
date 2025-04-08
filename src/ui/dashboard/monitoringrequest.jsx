import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faMicrochip } from '@fortawesome/free-solid-svg-icons';

const MonitoringRequest = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        modelNumber: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!formData.username || !formData.email) {
            setError('Username and email are required');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        // Simulate API call (replace with your actual API endpoint)
        try {
            // In React Native, you would typically use AsyncStorage for local storage
            // const sender = JSON.parse(await AsyncStorage.getItem('user'));
            const sender = { username: 'testUser', email: 'test@example.com' }; // Mock sender data

            const response = await fetch('YOUR_API_ENDPOINT/monitoring/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetUsername: formData.username,
                    targetEmail: formData.email,
                    modelNumber: formData.modelNumber,
                    senderUsername: sender.username,
                    senderEmail: sender.email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Request sent successfully!');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setError(data.message || 'Failed to send request');
            }
        } catch (err) {
            setError('Failed to send request');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Add a Member</Text>

                {error && <Text style={styles.error}>{error}</Text>}
                {success && <Text style={styles.success}>{success}</Text>}

                <View style={styles.inputGroup}>
                    <FontAwesomeIcon icon={faUser} size={20} color="#6B7280" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username *"
                        name="username"
                        value={formData.username}
                        onChangeText={(text) => handleChange('username', text)}
                        required
                        aria-required="true"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <FontAwesomeIcon icon={faEnvelope} size={20} color="#6B7280" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        required
                        aria-required="true"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <FontAwesomeIcon icon={faMicrochip} size={20} color="#6B7280" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="DoseBuddy Model Number (Optional)"
                        name="modelNumber"
                        value={formData.modelNumber}
                        onChangeText={(text) => handleChange('modelNumber', text)}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, !formData.username || !formData.email ? styles.disabledButton : styles.enabledButton]}
                    onPress={handleSubmit}
                    disabled={!formData.username || !formData.email || loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Request Monitoring</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for modal effect
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '80%',
        maxWidth: 400,
        padding: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2C7A7B',
        marginBottom: 24,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 16,
    },
    success: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 16,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        paddingHorizontal: 12,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: '#374151',
    },
    button: {
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
    },
    enabledButton: {
        backgroundColor: '#2C7A7B',
    },
    disabledButton: {
        backgroundColor: '#A0AEC0',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MonitoringRequest;