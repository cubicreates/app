import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Input = ({ placeholder, value, onChangeText, secureTextEntry, style, ...props }) => (
    <TextInput
        placeholder={placeholder}
        placeholderTextColor="#718096" // Gray color for placeholder
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        {...props}
    />
);

const Button = ({ title, onPress, style, ...props }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...props}>
        <Text style={[styles.buttonText, title === "Login with OTP" && { color: '#00AEEF' }]}>{title}</Text>
    </TouchableOpacity>
);

const LoginPage = ({ onLoginSuccess = () => { }, onSwitchToOTP = () => { } }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

    const navigation = useNavigation(); // Initialize navigation

    const handleChange = (name, value) => {
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        if (credentials.email === 'solo@leveling.com' && credentials.password === 'Arise') {
            const user = { username: 'Sung Jinwoo', email: credentials.email };
            onLoginSuccess(user);
            console.log('Login successful for:', user.username);
        } else {
            setError('Invalid email or password');
        }
    };

    const handleRegisterPress = () => {
        navigation.navigate('RegisterPage'); // Navigate to the Register screen
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>Welcome Back!</Text>
            </View>

            <View style={styles.formContainer}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.inputWrapper}>
                    <FontAwesomeIcon icon={faEnvelope} size={20} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="Email/Username"
                        value={credentials.email}
                        onChangeText={(text) => handleChange('email', text)}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.passwordInputWrapper}>
                    <FontAwesomeIcon icon={faLock} size={20} color="#718096" style={styles.inputIcon} />
                    <Input
                        placeholder="Password"
                        value={credentials.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword((prev) => !prev)}
                        style={styles.eyeButton}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size={20} color="#718096" />
                    </TouchableOpacity>
                </View>

                <Button title="Login" onPress={handleLogin} style={styles.loginButton} />

                <TouchableOpacity style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>OR LOGIN WITH OTP</Text>
                    <View style={styles.separatorLine} />
                </View>

                <Button title="Login with OTP" onPress={onSwitchToOTP} style={styles.otpButton} />

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>New to DoseBuddy? </Text>
                    <TouchableOpacity onPress={handleRegisterPress}>
                        <Text style={styles.registerLink}>Register here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    brandName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00AEEF',
    },
    brandSubtitle: {
        color: '#81E6D9',
        fontSize: 26,
    },
    welcomeText: {
        fontSize: 20,
        color: '#A0AEC0',
        marginTop: 12,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
        height: 60,
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
        height: 60,
    },
    inputIcon: {
        marginRight: 16,
        fontSize: 24,
    },
    input: {
        flex: 1,
        fontSize: 20,
    },
    eyeButton: {
        position: 'absolute',
        right: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        padding: 12,
    },
    loginButton: {
        backgroundColor: '#00AEEF',
        fontSize: 20,
        paddingVertical: 16,
        borderRadius: 12,
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: 12,
    },
    forgotPasswordText: {
        fontSize: 16,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    separatorText: {
        fontSize: 16,
        marginHorizontal: 16,
        color: '#718096',
    },
    otpButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#00AEEF',
        fontSize: 20,
        paddingVertical: 16,
        borderRadius: 12,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        color: '#718096',
        fontSize: 18,
    },
    registerLink: {
        color: '#00AEEF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default LoginPage;