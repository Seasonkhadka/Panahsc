import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export function ImageWithFallback({ src, alt, style, resizeMode }) {
  // If no source is provided, you might want to show a placeholder
  // For now, we'll just use the provided source or an empty object
  const imageSource = src ? { uri: src } : null;

  return (
    <View style={[styles.container, style]}>
      {imageSource ? (
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode={resizeMode || 'cover'}
        />
      ) : (
        <View style={[styles.image, styles.placeholder]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#F3F4F6', // Light gray background while loading or if empty
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#E5E7EB',
  }
});
