import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Input = ({ placeholder, value, onChangeText, style, ...props }) => (
    <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
        {...props}
    />
);

const Button = ({ title, onPress, style, disabled, ...props }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button, style, disabled && styles.buttonDisabled]}
        disabled={disabled}
        {...props}
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export const OTPModal = ({ isVisible, onClose, onSwitchToLogin }) => {
    const [email, setEmail] = useState('');

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        {/* Replace X from lucide-react with a suitable React Native icon */}
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>
                            <Text style={styles.brandName}>Dose</Text>
                            <Text style={styles.brandSubtitle}>Buddy</Text>
                        </Text>
                        <Text style={styles.headerSubtitle}>Welcome Back!</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <View style={styles.inputWrapper}>
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                size={20}
                                color="#718096"
                                style={styles.inputIcon}
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.emailInput}
                            />
                        </View>

                        <Button
                            title="Get OTP via Email"
                            onPress={() => {
                                // Handle OTP sending logic here
                                console.log('Requesting OTP for:', email);
                            }}
                            style={styles.otpButton}
                            disabled={!email.includes('@')}
                        />

                        <View style={styles.separatorContainer}>
                            <View style={styles.separatorLine} />
                            <Text style={styles.separatorText}>OR LOGIN WITH EMAIL/USERNAME</Text>
                            <View style={styles.separatorLine} />
                        </View>

                        <Button
                            title="Login with Email/Username"
                            onPress={onSwitchToLogin}
                            style={styles.loginButton}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        width: '80%',
        maxWidth: 400,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 8,
    },
    closeButtonText: {
        fontSize: 20,
        color: '#718096',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A5568',
    },
    brandName: {
        color: '#2C7A7B', // Example medical color
    },
    brandSubtitle: {
        color: '#81E6D9', // Example medical color
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#A0AEC0',
        marginTop: 8,
    },
    inputArea: {
        spaceY: 4, // Not directly applicable in RN, using marginBottom
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
    emailInput: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 10 + 12, // Adjust for icon padding
    },
    button: {
        backgroundColor: '#2C7A7B', // Example medical color
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonDisabled: {
        backgroundColor: '#CBD5E0',
    },
    otpButton: {
        // Inherits styles from button
    },
    loginButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#2C7A7B', // Example medical color
        color: '#2C7A7B', // Example medical color
    },
    loginButtonText: {
        color: '#2C7A7B', // Example medical color
        fontWeight: 'normal',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    separatorLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#D1D5DB',
    },
    separatorText: {
        paddingHorizontal: 12,
        fontSize: 12,
        color: '#718096',
    },
});