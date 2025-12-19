import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCoffee } from '../context/CoffeeContext';

interface CartItemProps {
  name: string;
  description: string;
  size: string;
  sugarLevel: string;
  price: number;
  quantity: number;
  image: any;
  coffeeId: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  description,
  size,
  sugarLevel,
  price,
  quantity,
  image,
  coffeeId,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { toggleFavorite, isFavorite } = useCoffee();
  const favorite = isFavorite(coffeeId);

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={image} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>☕</Text>
            </View>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>
            Cap Size: <Text style={styles.detailsValue}>{size}</Text>
          </Text>
          <Text style={styles.details}>
            Level Sugar: <Text style={styles.detailsValue}>{sugarLevel}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(coffeeId)}>
              <Text style={styles.favoriteIcon}>
                {favorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price.toFixed(2)} DT</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={onDecrease} activeOpacity={0.7}>
            <Text style={styles.quantity}>{quantity}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onIncrease}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'flex-start',
  },
  imageSection: {
    marginRight: 10,
    alignItems: 'center',
    flexShrink: 0,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
    opacity: 0.3,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 8,
    minWidth: 0,
  },
  infoContainer: {
    flex: 1,
    minWidth: 0, // Permet au flex de fonctionner correctement
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C1810',
    flex: 1,
    alignSelf: 'center',
  },
  favoriteButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    alignSelf: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 4,
  },
  detailsContainer: {
    alignItems: 'center',
    width: 70,
  },
  details: {
    fontSize: 11,
    color: '#9B9B9B',
    marginBottom: 2,
    fontWeight: '400',
    textAlign: 'center',
  },
  detailsValue: {
    fontWeight: 'bold',
    color: '#2C1810',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    flexShrink: 0,
    marginTop: 8,
  },
  quantity: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C1810',
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D5016',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CartItem;

