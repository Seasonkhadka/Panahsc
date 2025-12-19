import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, Star } from 'lucide-react-native'; 
import { ImageWithFallback } from '../figma/ImageWithFallback';

// NOTE: If you have your custom ImageWithFallback converted to RN, import it here.
// Otherwise, we use the standard React Native <Image> component below.
// import { ImageWithFallback } from "../figma/ImageWithFallback"; 

export function ProductCard({ product, onProductClick, onToggleFavorite, isFavorite }) {
  // Calculate discount percentage
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <TouchableOpacity 
      onPress={() => onProductClick(product)}
      activeOpacity={0.9} // Slight fade effect on press
      style={styles.cardContainer}
    >
      <View style={styles.imageWrapper}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          style={styles.productImage}  
          resizeMode="cover"
        />
        {/* Favorite Button */}
        {onToggleFavorite && (
          <TouchableOpacity
            onPress={() => onToggleFavorite(product.id)}
            style={styles.favoriteButton}
          >
            <Heart
              size={18}
              color={isFavorite ? "#EF4444" : "#9CA3AF"} // Red if favorite, Gray if not
              fill={isFavorite ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
        )}

        {/* --- BADGES (Absolute Positioned) --- */}
        
        {/* NEW Badge */}
        {product.isNew && (
          <View style={[styles.badgeBase, styles.badgeNew]}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}

        {/* Best Seller Badge */}
        {product.isBestSeller && !product.isNew && (
          <View style={[styles.badgeBase, styles.badgeBestSeller]}>
            <Text style={styles.badgeText}>BEST SELLER</Text>
          </View>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <View style={[styles.badgeBase, styles.badgeDiscount]}>
            <Text style={[styles.badgeText, { color: 'white' }]}>{discount}% OFF</Text>
          </View>
        )}

        {/* Low Stock Warning */}
        {product.stock < 10 && product.stock > 0 && (
          <View style={[styles.badgeBase, styles.badgeStock]}>
            <Text style={[styles.badgeText, { color: 'white' }]}>Only {product.stock} left</Text>
          </View>
        )}
      </View>
    

      {/* --- Details Section --- */}
      <View style={styles.detailsContainer}>
        <Text style={styles.categoryText}>{product.category}</Text>
        
        {/* Title with line clamp */}
        <Text numberOfLines={2} style={styles.productTitle}>
          {product.name}
        </Text>

        {/* Rating Row */}
        <View style={styles.ratingRow}>
          <Star size={14} color="#EAB308" fill="#EAB308" />
          <Text style={styles.ratingValue}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Card Container
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden', // Ensures image corners align with card corners
    marginBottom: 16,
    width: '100%',
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 3,
  },

  // Image Section
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1, // Makes it a square
    backgroundColor: '#F3F4F6', // Light gray placeholder
  },
  productImage: {
    width: '100%',
    height: '100%',
  },

  // Favorite Button
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 999, // Circle
    padding: 8,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },

  // Badges
  badgeBase: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1F2937', // Dark gray text
  },
  badgeNew: {
    top: 8,
    left: 8,
    backgroundColor: '#D1FAE5', // Light green
  },
  badgeBestSeller: {
    top: 8,
    left: 8,
    backgroundColor: '#FACC15', // Yellow
  },
  badgeDiscount: {
    bottom: 8,
    left: 8,
    backgroundColor: '#EF4444', // Red
  },
  badgeStock: {
    bottom: 8,
    right: 8,
    backgroundColor: '#F97316', // Orange
  },

  // Details Section
  detailsContainer: {
    padding: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#6B7280', // Gray-500
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827', // Gray-900
    marginBottom: 6,
    height: 40, // Fixed height to keep cards aligned
    lineHeight: 20,
  },
  
  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewCount: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Price
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
});