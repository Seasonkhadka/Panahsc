import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";     
import { Heart, Star, Share2, Minus, Plus, ShoppingCart } from 'lucide-react-native';
import { mockProducts as products, mockReviews as Reviews } from "../data/mockData";

const CHECKOUT_BAR_HEIGHT = 100;

export function ProductDetailPage({ product: initialProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [isFavorite, setIsFavorite] = useState(false);

  // --- DATA LOGIC ---
  // Use passed product or fallback to first mock product
  const product = initialProduct || products[0]; 

  // 2. Filter reviews for this specific product
  const productReviews = Reviews.filter(r => r.productId === product.id);

  // 3. Find related products (same category, but not the current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  // --- HELPER FUNCTIONS ---
  const onToggleFavorite = () => setIsFavorite(!isFavorite);
  
  const onAddToCart = (item, qty) => {
    Alert.alert("Added to Cart", `${qty} x ${item.name} added!`);
  };

  const onProductClick = (item) => {
    // In the future, this will navigate to the new product
    console.log("Navigate to", item.name);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          color={i <= rating ? "#F59E0B" : "#D1D5DB"} 
          fill={i <= rating ? "#F59E0B" : "transparent"} 
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.mainContainer}> 
      <ScrollView contentContainerStyle={{ paddingBottom: CHECKOUT_BAR_HEIGHT }}>
        
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          

          <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
            <Heart size={24} style={isFavorite ? styles.heartFilled : styles.heartEmpty} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton}>
            <Share2 size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.productInfoContainer}>
          <View style={styles.productHeader}>
            <View style={styles.productHeaderContent}>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSize}>{product.size}</Text>
            </View>
          </View>

          <View style={styles.ratingSection}>
            <View style={styles.ratingStars}>
              <Star size={20} style={styles.starFilledLarge} />
              <Text style={styles.ratingValue}>{product.rating}</Text>
            </View>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <View style={styles.discountDetails}>
                <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                <Text style={styles.discountBadge}>
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Text>
              </View>
            )}
          </View>

          {/* Stock Warning */}
          {product.stock < 50 && (
            <View style={styles.stockWarningBox}>
              <Text style={styles.stockWarningText}>
                🔥 Only {product.stock} left in stock - Order soon!
              </Text>
            </View>
          )}

          {/* Suitable For */}
          <View style={styles.suitableForSection}>
            <Text style={styles.suitableForTitle}>Suitable for:</Text>
            <View style={styles.tagContainer}>
              {product.skinTypes.map((type) => (
                <Text key={type} style={styles.skinTypeTag}>{type}</Text>
              ))}
            </View>
          </View>

          {/* Targets */}
          <View style={styles.targetsSection}>
            <Text style={styles.targetsTitle}>Targets:</Text>
            <View style={styles.tagContainer}>
              {product.concerns.map((concern) => (
                <Text key={concern} style={styles.concernTag}>{concern}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabBar}>
            {["details", "ingredients", "reviews"].map((tabId) => (
              <TouchableOpacity
                key={tabId}
                onPress={() => setActiveTab(tabId)}
                style={[styles.tabButton, activeTab === tabId && styles.tabButtonActive]}
              >
                <Text style={[styles.tabText, activeTab === tabId ? styles.tabTextActive : styles.tabTextInactive]}>
                  {tabId.charAt(0).toUpperCase() + tabId.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContent}>
            {activeTab === "details" && (
              <View>
                <Text style={styles.contentTitle}>Description</Text>
                <Text style={styles.contentDescription}>{product.description}</Text>
                <Text style={styles.contentTitle}>How to Use</Text>
                <Text style={styles.contentDetails}>{product.howToUse}</Text>
              </View>
            )}

            {activeTab === "ingredients" && (
              <View>
                <Text style={styles.contentTitle}>Key Ingredients</Text>
                <View style={styles.ingredientList}>
                  {product.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Text style={styles.ingredientBullet}>•</Text>
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {activeTab === "reviews" && (
              <View>
                {productReviews.length === 0 ? (
                  <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
                ) : (
                  <View style={styles.reviewList}>
                    {productReviews.map((review) => (
                      <View key={review.id} style={styles.reviewItem}>
                        <View style={styles.reviewHeader}>
                          {review.userImage && (
                            <Image
                              source={{ uri: review.userImage }}
                              style={styles.userImage}
                              resizeMode="cover"
                            />
                          )}
                          <View style={styles.reviewMeta}>
                            <View style={styles.userNameContainer}>
                              <Text style={styles.userName}>{review.userName}</Text>
                              {review.verified && <Text style={styles.verifiedBadge}>Verified</Text>}
                            </View>
                            <View style={styles.reviewRatingDate}>
                              <View style={styles.reviewStars}>{renderStars(review.rating)}</View>
                              <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                            <Text style={styles.reviewTitle}>{review.title}</Text>
                            <Text style={styles.reviewComment}>{review.comment}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
        
        {/* Related Products */}
        <View style={styles.relatedProductsContainer}>
          <Text style={styles.relatedProductsTitle}>You May Also Like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.relatedProductsList}>
              {relatedProducts.map((relatedProduct) => (
                <TouchableOpacity
                  key={relatedProduct.id}
                  onPress={() => onProductClick(relatedProduct)}
                  style={styles.relatedProductCard}
                >
                  <View style={styles.relatedProductImageContainer}>
                    <Image
                      source={{ uri: relatedProduct.image }}
                      style={styles.relatedProductImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text numberOfLines={2} style={styles.relatedProductName}>
                    {relatedProduct.name}
                  </Text>
                  <Text style={styles.relatedProductPrice}>
                    ${relatedProduct.price.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

      </ScrollView>

      {/* FIXED Bottom Actions */}
      <View style={styles.fixedFooter}>
        <View style={styles.footerContent}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
              <Minus size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(Math.min(product.stock, quantity + 1))} style={styles.quantityButton}>
              <Plus size={20} color="#000" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={() => onAddToCart(product, quantity)} style={styles.addToCartButton}>
            <ShoppingCart size={20} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  // Use the same styles as the previous response
  fixedFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 24 },
  mainContainer: { flex: 1, backgroundColor: 'white' },
  imageContainer: { position: 'relative', width: '100%', aspectRatio: 1, backgroundColor: '#F3F4F6' },
  productImage: { width: '100%', height: '100%' },
  favoriteButton: { position: 'absolute', top: 48, right: 16, backgroundColor: 'white', borderRadius: 9999, padding: 12, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  shareButton: { position: 'absolute', top: 48, right: 80, backgroundColor: 'white', borderRadius: 9999, padding: 12, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  heartFilled: { color: '#EF4444', fill: '#EF4444' },
  heartEmpty: { color: '#9CA3AF', fill: 'transparent' },
  productInfoContainer: { paddingHorizontal: 16, paddingVertical: 24, backgroundColor: 'white' },
  productHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 },
  productHeaderContent: { flex: 1 },
  productCategory: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  productSize: { fontSize: 14, color: '#6B7280' },
  ratingSection: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  ratingStars: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  starFilledLarge: { color: '#F59E0B', fill: '#F59E0B' },
  ratingValue: { fontSize: 16, fontWeight: '600', color: '#111827' },
  reviewCount: { fontSize: 14, color: '#6B7280' },
  priceSection: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  currentPrice: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  discountDetails: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  originalPrice: { fontSize: 18, color: '#6B7280', textDecorationLine: 'line-through' },
  discountBadge: { backgroundColor: '#EF4444', color: 'white', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, fontSize: 12, fontWeight: 'bold', overflow: 'hidden' },
  stockWarningBox: { backgroundColor: '#FFFAE0', borderColor: '#FDBA74', borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 },
  stockWarningText: { fontSize: 14, color: '#C2410C' },
  suitableForSection: { marginBottom: 24 },
  suitableForTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 8 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skinTypeTag: { backgroundColor: '#E5E7EB', color: '#111827', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, fontSize: 12, fontWeight: '500', overflow: 'hidden' },
  targetsSection: { marginBottom: 24 },
  targetsTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 8 },
  concernTag: { backgroundColor: '#F3E8FF', color: '#5B21B6', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, fontSize: 12, fontWeight: '500', overflow: 'hidden' },
  tabsContainer: { backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB', marginTop: 8 },
  tabBar: { flexDirection: 'row' },
  tabButton: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  tabButtonActive: { borderBottomWidth: 2, borderBottomColor: '#7C3AED' },
  tabText: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  tabTextActive: { color: '#7C3AED' },
  tabTextInactive: { color: '#6B7280' },
  tabContent: { paddingHorizontal: 16, paddingVertical: 24 },
  contentTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  contentDescription: { fontSize: 14, color: '#374151', marginBottom: 24, lineHeight: 20 },
  contentDetails: { fontSize: 14, color: '#374151', lineHeight: 20 },
  ingredientList: { },
  ingredientItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  ingredientBullet: { fontSize: 18, color: '#7C3AED' },
  ingredientText: { fontSize: 14, color: '#374151', flex: 1 },
  noReviewsText: { fontSize: 14, color: '#6B7280', textAlign: 'center', paddingVertical: 32 },
  reviewList: { },
  reviewItem: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 16, marginBottom: 16 },
  reviewHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 8 },
  userImage: { width: 40, height: 40, borderRadius: 20 },
  reviewMeta: { flex: 1 },
  userNameContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  userName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  verifiedBadge: { backgroundColor: '#D1FAE5', color: '#047857', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 12, overflow: 'hidden' },
  reviewRatingDate: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  reviewStars: { flexDirection: 'row' },
  reviewDate: { fontSize: 12, color: '#6B7280' },
  reviewTitle: { fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 4 },
  reviewComment: { fontSize: 14, color: '#374151' },
  relatedProductsContainer: { paddingHorizontal: 16, paddingVertical: 24, backgroundColor: 'white', marginTop: 8 },
  relatedProductsTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  relatedProductsList: { flexDirection: 'row', gap: 12, paddingBottom: 8 },
  relatedProductCard: { width: 160 },
  relatedProductImageContainer: { aspectRatio: 1, backgroundColor: '#F3F4F6', borderRadius: 12, overflow: 'hidden', marginBottom: 8 },
  relatedProductImage: { width: '100%', height: '100%' },
  relatedProductName: { fontSize: 12, color: '#111827', marginBottom: 4 },
  relatedProductPrice: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
  footerContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  quantitySelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 9999 },
  quantityButton: { padding: 12, borderRadius: 9999 },
  quantityText: { paddingHorizontal: 16, fontSize: 16, fontWeight: '600', color: '#111827' },
  addToCartButton: { flex: 1, backgroundColor: '#7C3AED', paddingVertical: 12, borderRadius: 9999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  addToCartText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});