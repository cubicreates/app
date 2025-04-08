import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const menuItems = [
    { label: 'Dispenser', icon: 'robot', screen: 'Dispenser' },
    { label: 'Dashboard', icon: 'medical-bag', screen: 'Dashboard' },
    { label: 'Medicine Doses', icon: 'pill', screen: 'MedicineDoses' },
    { label: 'Schedule', icon: 'calendar-clock', screen: 'Schedule' },
    { label: 'Members', icon: 'account-group', screen: 'Members' },
    { label: 'Notifications', icon: 'bell-outline', screen: 'Notifications' },
    { label: 'Working', icon: 'progress-clock', screen: 'Working' },
    { label: 'Logout', icon: 'logout', screen: 'Logout' },
];

const MenuBar = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleMenu = () => {
        setIsVisible(!isVisible);
    };

    const handleMenuItemPress = (screen) => {
        toggleMenu();
        if (screen === 'Logout') {
            // Handle logout logic here
            return;
        }
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.hamburger} 
                onPress={toggleMenu}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Icon name="menu" size={24} color="#004E64" />
            </TouchableOpacity>

            <Modal 
                visible={isVisible} 
                animationType="slide" 
                transparent={true}
                onRequestClose={toggleMenu}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.menuContainer}>
                        <ScrollView>
                            {menuItems.map((item, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={styles.menuItem}
                                    onPress={() => handleMenuItemPress(item.screen)}
                                >
                                    <Icon name={item.icon} size={24} color="#00AEEF" style={styles.icon} />
                                    <Text style={styles.menuText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <TouchableOpacity 
                        style={styles.modalOverlayBackground}
                        activeOpacity={1}
                        onPress={toggleMenu}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
    },
    hamburger: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        flexDirection: 'row',
    },
    modalOverlayBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    menuContainer: {
        width: 280,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
        height: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icon: {
        marginRight: 15,
        width: 24,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default MenuBar;
