import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, ShoppingCart, Heart, Bell, ArrowLeft } from "lucide-react-native";

export function Header({ 
  title, 
  showBack, 
  onBack, 
  cartCount = 0, 
  notificationCount = 0,
  onCartClick,
  onSearchClick,
  onNotificationClick,
  onWishlistClick,
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        
        {/* Left Section: Back Button and Title */}
        <View style={styles.leftSection}>
          {showBack && onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.iconButton}
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
          )}
          <Text style={styles.titleText}>{title || "Panahsc"}</Text>
        </View>

        {/* Right Section: Action Icons */}
        <View style={styles.rightSection}>
          {onSearchClick && (
            <TouchableOpacity 
              onPress={onSearchClick}
              style={styles.iconButton}
              accessibilityLabel="Search"
            >
              <Search size={20} color="#111827" />
            </TouchableOpacity>
          )}
          
          {onWishlistClick && (
            <TouchableOpacity 
              onPress={onWishlistClick}
              style={styles.iconButton} 
              accessibilityLabel="Wishlist"
            >
              <Heart size={20} color="#111827" />
            </TouchableOpacity>
          )}

          {onNotificationClick && (
            <TouchableOpacity 
              onPress={onNotificationClick}
              style={styles.iconButton}
              accessibilityLabel="Notifications"
            >
              <Bell size={20} color="#111827" />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {onCartClick && (
            <TouchableOpacity 
              onPress={onCartClick}
              style={styles.iconButton}
              accessibilityLabel="Shopping Cart"
            >
              <ShoppingCart size={20} color="#111827" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    // Sticky behavior in RN is handled by the parent ScrollView's stickyHeaderIndices
    zIndex: 50,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827', // text-dark fallback
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 9999,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444', // red-500
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F3E8FF', // color-secondary fallback
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#111827',
    fontSize: 10,
    fontWeight: 'bold',
  },
});