import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Modal, SafeAreaView } from "react-native";
import { X, Search, TrendingUp, Clock } from "lucide-react-native";

const trendingSearches = [
  "Hyaluronic Acid",
  "Vitamin C Serum",
  "Retinol Cream",
  "Niacinamide",
  "AHA BHA Toner",
  "Sunscreen SPF 50",
];

const recentSearches = [
  "Moisturizer for dry skin",
  "Anti-aging serum",
  "Gentle cleanser",
];

export function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}> 
          
          {/* Header with Search Bar */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              {/* Close Button */}
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <X size={24} color="#111827" />
              </TouchableOpacity>
              
              {/* Search Input Container */}
              <View style={styles.searchBox}>
                <Search size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Search Panahsć..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.input}
                  autoFocus={true}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Content Area */}
          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Clock size={18} color="#9CA3AF" />
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                </View>
                <View style={styles.listContainer}>
                  {recentSearches.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSearchQuery(term)}
                      style={styles.recentItem}
                    >
                      <Text style={styles.itemText}>{term}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Trending Searches */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <TrendingUp size={18} color="#9CA3AF" />
                <Text style={styles.sectionTitle}>Trending Searches</Text>
              </View>
              
              <View style={styles.tagsGrid}>
                {trendingSearches.map((term, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSearchQuery(term)}
                    style={styles.tag}
                  >
                    <Text style={styles.tagText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  closeButton: {
    padding: 4,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 8,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContainer: {
    gap: 4,
  },
  recentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  itemText: {
    fontSize: 16,
    color: '#4B5563',
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#F3E5F5', // Soft purple background matching your theme
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B4FA0', // Your brand's main purple color
  },
});