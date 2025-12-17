import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import HomeCoffeeCard from '../components/HomeCoffeeCard';
import { useCoffee } from '../context/CoffeeContext';

interface FavoritesProps {
  navigation: any;
}

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const { getFavorites } = useCoffee();
  const favorites = getFavorites();

  const handleCoffeePress = (coffee: any) => {
    navigation.navigate('CoffeeDetail', { coffee });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoris</Text>
        {favorites.length > 0 && (
          <Text style={styles.subtitle}>{favorites.length} produit(s)</Text>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>❤️</Text>
            <Text style={styles.emptyText}>Aucun favori</Text>
            <Text style={styles.emptySubtext}>
              Ajoutez des produits à vos favoris en cliquant sur le cœur ❤️
            </Text>
          </View>
        ) : (
          <View style={styles.coffeeGrid}>
            {favorites.map((coffee) => (
              <HomeCoffeeCard
                key={coffee.id}
                coffee={coffee}
                onPress={() => handleCoffeePress(coffee)}
                showFavorite={true}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  coffeeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9B9B9B',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Favorites;

