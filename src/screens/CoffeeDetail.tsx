import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Button from '../components/Button';
import { useCoffee } from '../context/CoffeeContext';

interface CoffeeDetailProps {
  route: any;
  navigation: any;
}

const CoffeeDetail: React.FC<CoffeeDetailProps> = ({ route, navigation }) => {
  const { coffee } = route.params;
  const { addToCart, toggleFavorite, isFavorite } = useCoffee();
  const [selectedSize, setSelectedSize] = useState<string>(
    coffee.size[1] || coffee.size[0],
  );
  const [selectedSugarLevel, setSelectedSugarLevel] = useState<string>('Medium');
  const [quantity, setQuantity] = useState(1);
  const favorite = isFavorite(coffee.id);

  const sugarLevels = ['No Sugar', 'Low', 'Medium', 'High'];

  const handleAddToCart = () => {
    addToCart(coffee, selectedSize, selectedSugarLevel, quantity);
    Alert.alert('Success', `${coffee.name} added to cart!`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with back button and favorite */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(coffee.id)}>
            <Text style={styles.favoriteIcon}>
              {favorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Coffee Image */}
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
        </View>

        {/* Coffee Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{coffee.name}</Text>
              <Text style={styles.description}>{coffee.description}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {coffee.rating}</Text>
            </View>
          </View>

          {/* Cup Size Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cup Size</Text>
            <View style={styles.sizeContainer}>
              {coffee.size.map((size: string) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Level Sugar Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Level Sugar</Text>
            <View style={styles.sizeContainer}>
              {sugarLevels.map((level: string) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.sizeButton,
                    selectedSugarLevel === level && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSugarLevel(level)}>
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSugarLevel === level && styles.selectedSizeText,
                    ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selection */}
          <View style={styles.section}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              A cappuccino is an espresso-based coffee drink that originated in
              Italy and is traditionally prepared with steamed milk foam.
              Variations of the drink involve the use of cream instead of milk,
              using non-dairy milk substitutes and flavoring with cinnamon or
              chocolate powder.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.addToCartContainer}>
        <Button
          title="Add to cart"
          price={coffee.price * quantity}
          onPress={handleAddToCart}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    fontSize: 24,
    color: '#2C1810',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  coffeeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 120,
    opacity: 0.3,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  ratingContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6F4E37',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C1810',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  selectedSizeButton: {
    backgroundColor: '#2D5016',
    borderColor: '#2D5016',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C1810',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  aboutText: {
    fontSize: 14,
    color: '#9B9B9B',
    lineHeight: 22,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 8,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C1810',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
});

export default CoffeeDetail;

