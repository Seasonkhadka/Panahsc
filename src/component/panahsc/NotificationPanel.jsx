import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Modal } from 'react-native';
import { X, Package, Tag, Bell as BellIcon, Gift } from "lucide-react-native";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const screenWidth = Dimensions.get('window').width;

export function NotificationPanel({ 
  isOpen, 
  onClose, 
  notifications , 
  onMarkAsRead,
  onClearAll,
}) {
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <Package size={20} color="#3B82F6" />;
      case 'promotion': return <Tag size={20} color="#EF4444" />;
      case 'product': return <Gift size={20} color="#6B4FA0" />; // Brand Purple
      case 'points': return <BellIcon size={20} color="#F59E0B" />;
      default: return <BellIcon size={20} color="#9CA3AF" />;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* 1. Backdrop (Dimmed area) */}
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        
        {/* 2. Side Panel */}
        <SafeAreaView style={styles.panelContainer}>
          <View style={styles.panelContent}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Notifications</Text>
              <View style={styles.headerActions}>
                {notifications.length > 0 && (
                  <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
                    <Text style={styles.clearText}>Clear All</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={24} color="#111827" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Content Area */}
            {notifications.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIconContainer}>
                  <BellIcon size={40} color="#9CA3AF" />
                </View>
                <Text style={styles.emptyText}>No notifications yet</Text>
              </View>
            ) : (
              <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                {notifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    onPress={() => onMarkAsRead(notification.id)}
                    style={[
                      styles.notificationItem,
                      !notification.read && styles.unreadItem
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.itemRow}>
                      <View style={styles.iconContainer}>
                        {getIcon(notification.type)}
                      </View>
                      <View style={styles.textContainer}>
                        <View style={styles.titleRow}>
                          <Text style={styles.notificationTitle} numberOfLines={1}>
                            {notification.title}
                          </Text>
                          {!notification.read && <View style={styles.unreadDot} />}
                        </View>
                        <Text style={styles.notificationMessage}>
                          {notification.message}
                        </Text>
                        
                        {notification.image && (
                          <View style={styles.imageContainer}>
                            <ImageWithFallback
                              src={notification.image}
                              alt={notification.title}
                              style={styles.notifImage}
                              resizeMode="cover"
                            />
                          </View>
                        )}
                        
                        <Text style={styles.dateText}>
                          {formatDate(notification.date)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  panelContainer: {
    height: '98%', // Shows it as a slide-up panel
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  panelContent: {
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clearButton: {
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 14,
    color: '#6B4FA0',
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F9FAFB',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  list: {
    flex: 1,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  unreadItem: {
    backgroundColor: '#F5F3FF', // Very light purple for unread
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconContainer: {
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#6B4FA0',
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  notifImage: {
    width: '100%',
    height: '100%',
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});