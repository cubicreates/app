import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faUser,
    faEnvelope,
    faPhone,
    faLock,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

const Input = ({ placeholder, value, onChangeText, secureTextEntry, style, ...props }) => (
    <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        {...props}
    />
);

const Button = ({ title, onPress, style, ...props }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...props}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export const RegisterPage = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.pageContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.brandName}>
                    Dose<Text style={styles.brandSubtitle}>Buddy</Text>
                </Text>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.createAccountText}>Create Account</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                    <FontAwesomeIcon icon={faUser} size={16} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChangeText={(text) => handleChange('firstName', text)}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <FontAwesomeIcon icon={faUser} size={16} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChangeText={(text) => handleChange('lastName', text)}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <FontAwesomeIcon icon={faEnvelope} size={16} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <FontAwesomeIcon icon={faPhone} size={16} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChangeText={(text) => handleChange('mobile', text)}
                    />
                </View>

                <View style={styles.passwordInputWrapper}>
                    <FontAwesomeIcon icon={faLock} size={16} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="Password"
                        value={formData.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size={16} color="#718096" />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordInputWrapper}>
                    <FontAwesomeIcon icon={faLock} size={16} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.eyeButton}
                    >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} size={16} color="#718096" />
                    </TouchableOpacity>
                </View>

                <Button title="Register and Verify" style={styles.registerButton} />

                <Text style={styles.loginText}>
                    Already have an account?{' '}
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    brandName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A5568',
    },
    brandSubtitle: {
        color: '#81E6D9',
    },
    welcomeText: {
        fontSize: 12,
        color: '#A0AEC0',
    },
    createAccountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C7A7B',
    },
    formContainer: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 6,
        paddingHorizontal: 8,
        marginBottom: 12,
        height: 40,
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 6,
        paddingHorizontal: 8,
        marginBottom: 12,
        height: 40,
    },
    eyeButton: {
        position: 'absolute',
        right: 8,
    },
    button: {
        backgroundColor: '#2C7A7B',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loginText: {
        textAlign: 'center',
        fontSize: 12,
    },
    loginLink: {
        color: '#2C7A7B',
        fontWeight: 'bold',
    },
});