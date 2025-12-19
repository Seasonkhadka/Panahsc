import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { ProductCard } from '../component/panahsc/ProductCard';


const categories = [
  { name: "Cleansers", emoji: "🧼", color: "#E3F2FD" },
  { name: "Serums", emoji: "💧", color: "#F3E5F5" },
  { name: "Moisturizers", emoji: "✨", color: "#FFF9C4" },
  { name: "Sunscreen", emoji: "☀️", color: "#FFE0B2" },
  { name: "Masks", emoji: "🎭", color: "#E1F5FE" },
  { name: "Treatments", emoji: "⚡", color: "#F1F8E9" },  
];


// --- MAIN COMPONENT ---
export function HomePage( { 
  user,
  products,
  onProductClick,
  onViewCategory = (cat) => console.log("View category:", cat),
  onToggleFavorite,
  favorites = new Set(),
} ) {

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <ScrollView contentContainerStyle={styles.MainPage} showsVerticalScrollIndicator={false}>
     {/* Welcome Banner */}
     <LinearGradient 
        colors={['#F6E9D7', '#DCC6FF']} 
        start={{x: 0, y: 0}} 
        end={{x: 0, y: 1}}
        style={styles.welcome_container}
      >
        <View style={styles.welcome_content}>
          <View>
            <Text style={styles.welcome_text}>Welcome back,</Text>
            <Text style={styles.user_name}>{user.name}</Text>
          </View>
          
          <View style={styles.points_container}>
            <Text>🏆</Text> 
            <View>
              <Text style={styles.points_text}>Points</Text>
              <Text style={styles.points_value}>{user.points}</Text>
            </View>
          </View>
        </View>

        <View style={styles.quiz_container}>
          <View style={styles.quiz_content}>
            <View style={styles.quiz_icon}>
              <Text style={{color: 'white'}}>✨</Text>
            </View>
            <View>
              <Text style={styles.quiz_title}>Get Your Perfect Routine</Text>
              <Text style={styles.quiz_description}>Take our skin quiz</Text>
            </View>
          </View>
          <TouchableOpacity
            //onPress={onTakeSkinQuiz}
            style={styles.quiz_button}
          >
            <Text style={styles.quiz_button_text}>Start</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>


      {/* Promo Banner */}
      <View style={styles.promo_padding_wrapper}>
        <LinearGradient 
        colors={['#DCC6FF', '#B8A1E3']} 
        start={{x: 0, y: 0}} 
        end={{x: 0, y: 1}}
        style={styles.promo_container}
      >
          <View style={styles.promo_content}>
            <View style={styles.promo_text_container}>
              <Text style={styles.promo_text}>
                Limited Time Offer
              </Text>
              <Text style={styles.promo_text_value}>
                Free Gift with{"\n"}Purchase Over $50
              </Text>
              <TouchableOpacity style={styles.promo_button}>
                <Text style={styles.promo_button_text}>Shop Now</Text>
                <Text>›</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.promo_gift_container}>
               <Text style={{fontSize: 50}}>🎁</Text>
            </View>
          </View>
        
        </LinearGradient>
      </View>

      {/* Categories */}
      <View style={styles.categories_container}>
        <Text style={styles.categories_title}>Shop by Category</Text>
        
        <View style={styles.categories_grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              onPress={() => onViewCategory(category.name)}
              style={[styles.category_item, { backgroundColor: category.color }]}
            >
              <Text style={styles.categories_emoji}>{category.emoji}</Text>
              <Text style={styles.categories_name}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Best Sellers */}
      <View style={styles.best_sellers_container}>
        <View style={styles.best_sellers_title_container}>
          <Text style={styles.best_sellers_title}>Best Sellers</Text>
          <TouchableOpacity onPress={() => onViewCategory("Best Sellers")}>
            <Text style={styles.best_sellers_view_all}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.best_sellers_grid}>
          {bestSellers.map((product) => (
            <View key={product.id} style={styles.best_sellers_product_container}>
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
            </View>
          ))}
        </View>
      </View>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <View style={styles.new_arrivals_container}>
          
          <View style={styles.new_arrivals_header}>
            <Text style={styles.new_arrivals_title}>New Arrivals</Text>
            <TouchableOpacity onPress={() => onViewCategory("New Arrivals")}>
              <Text style={styles.new_arrivals_view_all}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.new_arrivals_grid}>
            {newArrivals.map((product) => (
              <View key={product.id} style={styles.new_arrivals_product_container}>
                  <ProductCard
                    product={product}
                    onProductClick={onProductClick}
                    //onToggleFavorite={onToggleFavorite}
                    //isFavorite={favorites.has(product.id)}
                  />
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  MainPage: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  welcome_container: {
    padding: 16,
    backgroundColor: '#6B4FA0', // Primary purple color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcome_text: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  user_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  points_container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  points_text: {
    fontSize: 10,
    color: '#000000',
    opacity: 0.5,
  },
  points_value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  quiz_container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quiz_content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quiz_icon: {
    backgroundColor: '#6B4FA0',
    borderRadius: 8,
    padding: 8,
  },
  quiz_title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  quiz_description: {
    fontSize: 12,
    color: '#666',
  },
  quiz_button: {
    backgroundColor: '#F3E5F5',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  quiz_button_text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B4FA0',
  },
  promo_padding_wrapper: {
    padding: 16,
  },
  promo_container: {
    backgroundColor: '#9333ea',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  promo_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promo_text_container: {
    flex: 1,
    gap: 8,
  },
  promo_text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  promo_text_value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  promo_button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16, 
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  promo_button_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  promo_gift_container: {
    opacity: 0.8,
  },
  categories_container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categories_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  categories_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category_item: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '31%',
    marginBottom: 12,
    aspectRatio: 1,
  },
  categories_emoji: {
    fontSize: 28,
  },
  categories_name: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  best_sellers_container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  best_sellers_title_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 20,
  },
  best_sellers_title: { 
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  best_sellers_view_all: {
    fontSize: 14,
    color: '#9333ea',
    fontWeight: '600',
  },
  best_sellers_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  best_sellers_product_container: {
    width: '48%',
    marginBottom: 16,
  },
  new_arrivals_container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  new_arrivals_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  new_arrivals_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  new_arrivals_view_all: {
    fontSize: 14,
    color: '#9333ea',
    fontWeight: '600',
  },
  new_arrivals_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  new_arrivals_product_container: {
    width: '48%',
    marginBottom: 16,
  },
  // Card Styles
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardHeart: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});