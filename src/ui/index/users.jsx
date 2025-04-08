import React, { useState } from 'react';
import { LoginModal } from './login/LoginPage';
import { OTPModal } from './login/OTPModal';
import { OTPVerificationModal } from './login/OTPVerificationModal';
import { RegisterModal } from './login/RegisterPage';

export const Users = ({ onClose, initialModal = 'login', onLoginSuccess }) => {
    const [currentModal, setCurrentModal] = useState(initialModal);

    // When any modal is closed, call the parent's onClose and reset currentModal
    const handleClose = () => {
        setCurrentModal(null);
        onClose();
    };

    const handleLoginSuccessful = (user) => {
        onLoginSuccess ?.(user);
        handleClose();
    };

    return (
        <>
            {currentModal === 'login' && (
                <LoginModal
                    isVisible={currentModal === 'login'}
                    onClose={handleClose}
                    onSwitchToOTP={() => setCurrentModal('otp')}
                    onSwitchToRegister={() => setCurrentModal('register')}
                    onLoginSuccess={handleLoginSuccessful}
                />
            )}

            {currentModal === 'otp' && (
                <OTPModal
                    isVisible={currentModal === 'otp'}
                    onClose={handleClose}
                    onSwitchToLogin={() => setCurrentModal('login')}
                // You might need to pass a function to handle OTP verification success
                // and potentially navigate to OTPVerificationModal or directly login
                />
            )}

            {currentModal === 'otpVerification' && (
                <OTPVerificationModal
                    isVisible={currentModal === 'otpVerification'}
                    onClose={handleClose}
                // You might need to pass a function to handle successful OTP verification
                // and potentially call onLoginSuccess
                />
            )}

            {currentModal === 'register' && (
                <RegisterModal
                    isVisible={currentModal === 'register'}
                    onClose={handleClose}
                    onSwitchToLogin={() => setCurrentModal('login')}
                // You might need to pass a function to handle successful registration
                // and potentially navigate to OTP or login
                />
            )}
        </>
    );
};