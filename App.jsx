/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Page Imports
import { HomePage } from "./src/pages/HomePage";
import { ProductDetailPage } from "./src/pages/ProductDetailPage";
import { mockProducts, mockUser, mockReviews, mockOrders, mockNotifications } from "./src/data/mockData";


export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  
  // --- STATE MANAGEMENT (From your web snippet) ---
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set([1, 2, 9]));
  const [orders, setOrders] = useState(mockOrders);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  
  // Mock counts
  const cartCount = 2;
  const unreadNotifications = 1;

  // --- HANDLERS ---
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  const getPageTitle = () => {
    if (currentPage === 'product-detail') return 'Product Details';
    return 'Panahsc'; 
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
      {/* HEADER INTEGRATION */}
      <Header
        title={getPageTitle()}
        showBack={currentPage === 'product-detail'}
        onBack={handleBackFromProduct}
        cartCount={cartCount}
        notificationCount={unreadNotifications}
        onCartClick={() => console.log('Cart clicked')}
        onSearchClick={() => setIsSearchOpen(true)}
        onNotificationClick={() => console.log('Notif clicked')}
      />

      {/* MAIN CONTENT AREA */}
      <View style={styles.mainContent}>
        {currentPage === 'home' && (
          <HomePage
            user={mockUser}
            products={mockProducts}
            onProductClick={handleProductClick}
            onToggleFavorite={(id) => {
              const newFavorites = new Set(favorites);
              if (newFavorites.has(id)) newFavorites.delete(id);
              else newFavorites.add(id);
              setFavorites(newFavorites);
            }}
            favorites={favorites}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct}
          />
        )}
      </View>

    </View>
  );
}

// --- SIMPLE HEADER COMPONENT (To match your props) ---
const Header = ({ title, showBack, onBack, cartCount, onCartClick }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      {showBack && (
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
    
    <View style={styles.headerRight}>
      <TouchableOpacity onPress={onCartClick} style={styles.iconButton}>
        <Text style={styles.iconText}>🛒 {cartCount > 0 ? `(${cartCount})` : ''}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Matches your bg-[#FAFAFA]
  },
  mainContent: {
    flex: 1,
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconButton: {
    padding: 4,
  },
  iconText: {
    fontSize: 20,
    color: '#000',
  }
});