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
  Dimensions,
} from 'react-native';
import Button from '../components/Button';
import { useCoffee } from '../context/CoffeeContext';

const { height } = Dimensions.get('window');

interface CoffeeDetailProps {
  route: any;
  navigation: any;
}

const CoffeeDetail: React.FC<CoffeeDetailProps> = ({ route, navigation }) => {
  const { coffee } = route.params;
  const { addToCart, toggleFavorite, isFavorite } = useCoffee();
  const [selectedSize, setSelectedSize] = useState<string>(
    coffee.size[0] || 'S',
  );
  const [selectedSugarLevel, setSelectedSugarLevel] = useState<string>(
    coffee.LevelSugar?.[0] || 'No Sugar',
  );
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const favorite = isFavorite(coffee.id);

  const sugarLevels = coffee.LevelSugar || ['No Sugar', 'Low', 'Medium'];
  
  const fullAboutText = 'A cappuccino is an espresso-based coffee drink that originated in Italy and is traditionally prepared with steamed milk foam. Variations of the drink involve the use of cream instead of milk, using non-dairy milk substitutes and flavoring with cinnamon or chocolate powder.';

  const handleAddToCart = () => {
    addToCart(coffee, selectedSize, selectedSugarLevel, 1);
    Alert.alert('Success', `${coffee.name} added to cart!`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaTop} />
      {/* Image Section with Overlay */}
      <View style={styles.imageSection}>
        {coffee.image ? (
          <Image
            source={coffee.image}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderBackground}>
            <Text style={styles.placeholderText}>☕</Text>
          </View>
        )}
        
        {/* Gradient Overlay */}
        <View style={styles.overlay} />
        
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

        {/* Product Info on Image */}
        <View style={styles.imageInfoContainer}>
          <View style={styles.imageTitleContainer}>
            <Text style={styles.imageTitle}>{coffee.name}</Text>
            <Text style={styles.imageSubtitle}>{coffee.description}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>{coffee.rating}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section with Curve */}
      <View style={styles.bottomSection}>
        <View style={styles.contentContainer}>
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

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText} numberOfLines={isAboutExpanded ? undefined : 3}>
              {fullAboutText}
            </Text>
            <TouchableOpacity onPress={() => setIsAboutExpanded(!isAboutExpanded)}>
              <Text style={styles.readMore}>
                {isAboutExpanded ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Add to Cart Button */}
      <SafeAreaView style={styles.safeAreaBottom}>
        <View style={styles.addToCartContainer}>
          <Button
            title="Add to cart"
            price={coffee.price}
            onPress={handleAddToCart}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeAreaTop: {
    backgroundColor: 'transparent',
  },
  safeAreaBottom: {
    backgroundColor: '#FFFFFF',
  },
  imageSection: {
    height: height * 0.45,
    width: '100%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  placeholderBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D4A574',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 120,
    opacity: 0.3,
    color: '#FFFFFF',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 10,
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
    shadowOpacity: 0.2,
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  imageInfoContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  imageTitleContainer: {
    flex: 1,
  },
  imageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  imageSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4A574',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 16,
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    zIndex: 5,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  infoContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C1810',
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
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
    fontSize: 13,
    color: '#9B9B9B',
    lineHeight: 20,
    marginBottom: 6,
  },
  readMore: {
    fontSize: 14,
    color: '#2D5016',
    fontWeight: '600',
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
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
});

export default CoffeeDetail;

