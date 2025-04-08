import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import { Camera } from 'react-native-camera';

const QRScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanData, setScanData] = useState(null);
    const [torchOn, setTorchOn] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                // For iOS, we use the Camera API's built-in permission request
                const { status } = await Camera.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            } else {
                // For Android, we use the PermissionsAndroid API
                const { PermissionsAndroid } = require('react-native');
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "This app needs access to your camera to scan QR codes",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
            }
        } catch (error) {
            console.log('Error requesting camera permission:', error);
            setHasPermission(false);
        }
    };

    const handleBarCodeScanned = (event) => {
        if (scanned) return;

        setScanned(true);
        const { type, data } = event;
        setScanData({ type, data });

        // Attempt to determine what kind of QR code was scanned
        if (data.startsWith('http')) {
            showActionDialog('URL Detected', `Would you like to open: ${data}?`, () => {
                Linking.openURL(data);
            });
        } else if (data.startsWith('tel:')) {
            showActionDialog('Phone Number Detected', `Would you like to call ${data.replace('tel:', '')}?`, () => {
                Linking.openURL(data);
            });
        } else if (data.startsWith('mailto:')) {
            showActionDialog('Email Address Detected', `Would you like to email ${data.replace('mailto:', '')}?`, () => {
                Linking.openURL(data);
            });
        } else {
            showActionDialog('QR Code Scanned', `Type: ${type}\nData: ${data}`);
        }
    };

    const showActionDialog = (title, message, action = null) => {
        if (action) {
            Alert.alert(
                title,
                message,
                [
                    { text: "Cancel", style: "cancel", onPress: () => setScanned(false) },
                    { text: "OK", onPress: () => { action(); setScanned(false); } }
                ]
            );
        } else {
            Alert.alert(
                title,
                message,
                [{ text: "OK", onPress: () => setScanned(false) }]
            );
        }
    };

    const toggleTorch = () => {
        setTorchOn(!torchOn);
    };

    if (hasPermission === null) {
        return <Text style={styles.permissionText}>Requesting camera permission...</Text>;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>No access to camera</Text>
                <Button title="Request Permission" onPress={requestCameraPermission} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={Camera.Constants.Type.back}
                flashMode={torchOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[
                    Camera.Constants.BarCodeType.qr,
                    Camera.Constants.BarCodeType.code128,
                    Camera.Constants.BarCodeType.code39,
                    Camera.Constants.BarCodeType.ean13,
                ]}
            >
                <View style={styles.overlay}>
                    <View style={styles.scanFrame}></View>

                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={[styles.controlButton, torchOn && styles.activeButton]}
                            onPress={toggleTorch}
                        >
                            <Text style={styles.buttonText}>Flashlight</Text>
                        </TouchableOpacity>

                        {scanned && (
                            <TouchableOpacity
                                style={styles.controlButton}
                                onPress={() => setScanned(false)}
                            >
                                <Text style={styles.buttonText}>Scan Again</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {scanData && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>
                                Last scan: {scanData.data.substring(0, 30)}
                                {scanData.data.length > 30 ? '...' : ''}
                            </Text>
                        </View>
                    )}
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        marginBottom: 40,
    },
    controls: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    controlButton: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 15,
        borderRadius: 10,
        minWidth: 120,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: 'rgba(255,160,0,0.8)',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    resultContainer: {
        position: 'absolute',
        top: 40,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 5,
        width: '90%',
    },
    resultText: {
        color: 'white',
        textAlign: 'center',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default QRScanner;