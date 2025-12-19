import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
// Use the native version of Lucide icons
import { Home, Grid, ShoppingBag, BookOpen, User } from 'lucide-react-native';

export function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "shop", label: "Shop", icon: Grid },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <View style={styles.navContainer}>
      <View style={styles.navContent}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const tintColor = isActive ? '#9333ea' : '#9CA3AF'; // Using your brand purple

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Icon 
                size={24} 
                color={tintColor} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              <Text style={[
                styles.tabLabel, 
                { color: tintColor, fontWeight: isActive ? '600' : '400' }
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Spacer for iPhone "Home Indicator" area */}
      <SafeAreaView /> 
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Shadow for Android
    elevation: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabButton: {
    flexDirection: 'col',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});