import React from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const Input = ({ placeholder, value, onChangeText, style, ...props }) => (
    <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
        {...props}
    />
);

const Button = ({ title, onPress, style, ...props }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...props}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export const OTPVerificationModal = ({ isVisible, onClose }) => {
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

                    <View style={styles.verifyHeaderContainer}>
                        <Text style={styles.verifyHeaderText}>Verify OTP</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <Input
                            type="text"
                            placeholder="DB-XXXX"
                            style={styles.otpInput}
                            textAlign="center"
                            letterSpacing={8} // Approximate tracking -wider
                        />
                        <Button title="Verify" style={styles.verifyButton} />
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
    verifyHeaderContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    verifyHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C7A7B', // Example medical color
    },
    inputArea: {
        spaceY: 4, // Not directly applicable in RN, using marginBottom
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingVertical: 12,
        fontSize: 18,
        marginBottom: 16,
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
    verifyButton: {
        // Inherits styles from button
    },
});