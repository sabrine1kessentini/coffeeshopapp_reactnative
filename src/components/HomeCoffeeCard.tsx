import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Coffee } from '../data/coffeeData';
import { useCoffee } from '../context/CoffeeContext';

interface HomeCoffeeCardProps {
  coffee: Coffee;
  onPress: () => void;
  showFavorite?: boolean;
}

const HomeCoffeeCard: React.FC<HomeCoffeeCardProps> = ({
  coffee,
  onPress,
  showFavorite = false,
}) => {
  const { addToCart, toggleFavorite, isFavorite } = useCoffee();
  const favorite = isFavorite(coffee.id);

  const handleAddToCart = () => {
    addToCart(coffee, coffee.size[0], 'Medium', 1);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {coffee.image ? (
          <Image
            source={coffee.image}
            style={styles.coffeeImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>☕</Text>
          </View>
        )}
        {showFavorite && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(coffee.id);
            }}>
            <Text style={styles.favoriteIcon}>
              {favorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{coffee.name}</Text>
        <Text style={styles.description}>{coffee.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{coffee.price.toFixed(2)} DT</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  coffeeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 60,
    opacity: 0.3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 14,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C1810',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2D5016',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeCoffeeCard;

