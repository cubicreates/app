import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCheckCircle, faExclamationTriangle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ onClose, setActiveComponent }) => {
    const [activeTab, setActiveTab] = useState('All');

    const notifications = [
        {
            id: 1,
            type: 'reminder',
            icon: <FontAwesomeIcon icon={faBell} size={20} color="#3B82F6" />,
            title: 'Time to take Aspirin',
            message: 'Your 8:00 AM dose is ready',
            time: '8:00 AM • Today',
            bg: '#E0F2FE',
        },
        {
            id: 2,
            type: 'reminder',
            icon: <FontAwesomeIcon icon={faCheckCircle} size={20} color="#22C55E" />,
            title: 'Medication taken',
            message: 'Metformin 500mg was dispensed and taken',
            time: '1:00 PM • Yesterday',
            bg: null,
        },
        {
            id: 3,
            type: 'reminder',
            icon: <FontAwesomeIcon icon={faExclamationTriangle} size={20} color="#F97316" />,
            title: 'Missed medication',
            message: 'You missed your Atorvastatin dose',
            time: '9:00 PM • Yesterday',
            bg: null,
        },
        {
            id: 4,
            type: 'system',
            icon: <FontAwesomeIcon icon={faSyncAlt} size={20} color="#8B5CF6" />,
            title: 'Time to refill',
            message: 'Atorvastatin is running low (4 pills remaining)',
            time: '10:30 AM • May 9',
            bg: null,
        },
        {
            id: 5,
            type: 'system',
            icon: <FontAwesomeIcon icon={faSyncAlt} size={20} color="#6B7280" />,
            title: 'Dispenser synced',
            message: 'Your dispenser successfully synced',
            time: '4:15 PM • May 8',
            bg: null,
        },
    ];

    const filteredNotifications =
        activeTab === 'All'
            ? notifications
            : notifications.filter((n) => n.type === activeTab.toLowerCase());

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

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <Text style={styles.headerSubtitle}>
                        Stay updated on medication alerts and system status
                    </Text>
                </View>
                <TouchableOpacity style={styles.markAllReadButton}>
                    <Text style={styles.markAllReadText}>Mark All as Read</Text>
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {['All', 'Reminders', 'System'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Recent Notifications */}
            <Text style={styles.recentNotificationsTitle}>Recent Notifications</Text>
            <ScrollView>
                <View style={styles.notificationsContainer}>
                    {filteredNotifications.map((notification) => (
                        <View
                            key={notification.id}
                            style={[styles.notificationItem, notification.bg && { backgroundColor: notification.bg }]}
                        >
                            <View style={styles.notificationIcon}>{notification.icon}</View>
                            <View style={styles.notificationDetails}>
                                <Text style={styles.notificationTitle}>{notification.title}</Text>
                                <Text style={styles.notificationMessage}>{notification.message}</Text>
                            </View>
                            <Text style={styles.notificationTime}>{notification.time}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: '#2D3748',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#718096',
    },
    markAllReadButton: {
        borderWidth: 1,
        borderColor: '#CBD5E0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    markAllReadText: {
        fontSize: 14,
        color: '#4A5568',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    tabButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: '#EDF2F7',
    },
    activeTabButton: {
        backgroundColor: '#E0F2FE',
    },
    tabText: {
        fontSize: 14,
        color: '#4A5568',
    },
    activeTabText: {
        color: '#3B82F6',
    },
    recentNotificationsTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#2D3748',
        marginBottom: 8,
    },
    notificationsContainer: {
        gap: 8,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 6,
    },
    notificationIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    notificationDetails: {
        flex: 1,
    },
    notificationTitle: {
        fontWeight: 'semibold',
        color: '#2D3748',
    },
    notificationMessage: {
        fontSize: 14,
        color: '#4A5568',
    },
    notificationTime: {
        fontSize: 12,
        color: '#718096',
        marginLeft: 'auto',
    },
});

export default Notification;