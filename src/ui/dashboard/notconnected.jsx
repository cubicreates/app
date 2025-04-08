import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQrcode, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const NotConnected = ({ setActiveComponent }) => {
    const handleLinkPress = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred: ', err));
    };

    return (
        <View style={styles.container}>
            {/* Logo Button */}
            <TouchableOpacity
                onPress={() => setActiveComponent('dashboard')}
                style={styles.logoButton}
            >
                <Text style={styles.logoText}>
                    Dose<Text style={styles.logoSubtitle}>Buddy</Text>
                </Text>
            </TouchableOpacity>

            <View style={styles.content}>
                {/* Icon Container */}
                <View style={styles.iconContainer}>
                    <View style={styles.qrCodeIconBg}>
                        <FontAwesomeIcon icon={faQrcode} size={48} color="white" />
                    </View>
                </View>

                {/* Main Heading */}
                <Text style={styles.mainHeading}>Not Connected</Text>

                {/* Primary Message */}
                <View style={styles.messageContainer}>
                    <Text style={styles.primaryMessage}>
                        Looks like you have not yet connected with your DoseBuddy
                    </Text>
                    <Text style={styles.secondaryMessage}>
                        <Text
                            style={styles.link}
                            onPress={() => handleLinkPress('https://www.google.com')}
                        >
                            Download the app
                        </Text>{' '}
                        and scan the QR code of the machine to connect
                    </Text>

                    <Text style={styles.secondaryMessage}>
                        If you have not bought the device yet,{' '}
                        <Text
                            style={styles.link}
                            onPress={() => handleLinkPress('https://www.google.com')}
                        >
                            Buy it from here
                        </Text>{' '}
                        and scan the QR and Login!
                    </Text>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Secondary Message */}
                <View style={styles.secondaryInfo}>
                    <View style={styles.secondaryInfoHeader}>
                        <FontAwesomeIcon icon={faUserPlus} size={24} color="#2C7A7B" style={styles.userPlusIcon} />
                        <Text style={styles.secondaryInfoTitle}>Here to monitor someone?</Text>
                    </View>
                    <Text style={styles.secondaryInfoText}>
                        Click the <Text style={styles.boldMedical}>Members</Text> button and then{' '}
                        <Text style={styles.boldMedical}> Add a Member</Text> to start monitoring
                    </Text>
                </View>
            </View>
        </View>
    );
};

NotConnected.propTypes = {
    setActiveComponent: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    logoButton: {
        position: 'absolute',
        top: 40,
        right: 16,
        padding: 8,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C7A7B',
    },
    logoSubtitle: {
        color: '#81E6D9',
    },
    content: {
        maxWidth: 600,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 32,
    },
    iconContainer: {
        marginBottom: 32,
    },
    qrCodeIconBg: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#81E6D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainHeading: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2C7A7B',
        textAlign: 'center',
        marginBottom: 24,
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    primaryMessage: {
        fontSize: 18,
        color: '#4A5568',
        textAlign: 'center',
        marginBottom: 16,
    },
    secondaryMessage: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        marginBottom: 8,
    },
    link: {
        color: '#81E6D9',
    },
    divider: {
        width: 64,
        height: 2,
        backgroundColor: '#BEE3DB',
        borderRadius: 1,
        marginBottom: 32,
    },
    secondaryInfo: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    secondaryInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    userPlusIcon: {
        marginRight: 8,
    },
    secondaryInfoTitle: {
        fontSize: 18,
        fontWeight: 'medium',
        color: '#4A5568',
    },
    secondaryInfoText: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
    },
    boldMedical: {
        fontWeight: 'bold',
        color: '#2C7A7B',
    },
});

export default NotConnected;