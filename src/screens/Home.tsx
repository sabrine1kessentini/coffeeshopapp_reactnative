import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import HomeCoffeeCard from '../components/HomeCoffeeCard';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/coffeeData';
import { useCoffee } from '../context/CoffeeContext';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const { coffees, searchCoffees } = useCoffee();

  const filteredCoffees = useMemo(() => {
    let result = coffees;

    // Filter by category
    if (selectedCategory !== '1') {
      const categoryName = categories.find((c) => c.id === selectedCategory)?.name;
      result = result.filter((coffee) => coffee.category === categoryName);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      result = searchCoffees(searchQuery);
      // Also apply category filter if not "All"
      if (selectedCategory !== '1') {
        const categoryName = categories.find((c) => c.id === selectedCategory)?.name;
        result = result.filter((coffee) => coffee.category === categoryName);
      }
    }

    return result;
  }, [coffees, selectedCategory, searchQuery, searchCoffees]);

  const handleCoffeePress = (coffee: any) => {
    navigation.navigate('CoffeeDetail', { coffee });
  };

  // Get special offers (first 3 coffees for demo)
  const specialOffers = coffees.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.profileImage}>
              <Text style={styles.profileEmoji}>👤</Text>
            </View>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good morning, Sabrine</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Coffee..."
            placeholderTextColor="#9B9B9B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.categoriesContent}
            style={styles.categoriesContainer}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                isSelected={selectedCategory === item.id}
                onPress={() => setSelectedCategory(item.id)}
              />
            )}
            nestedScrollEnabled={true}
            bounces={true}
            decelerationRate="fast"
          />
        </View>

        {/* Coffee List - Horizontal */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.coffeeListContainer}
            contentContainerStyle={styles.coffeeListContent}>
            {filteredCoffees.map((coffee) => (
              <HomeCoffeeCard
                key={coffee.id}
                coffee={coffee}
                onPress={() => handleCoffeePress(coffee)}
                showFavorite={true}
              />
            ))}
          </ScrollView>
        </View>

        {/* Special Offer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offer</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.coffeeListContainer}
            contentContainerStyle={styles.coffeeListContent}>
            {specialOffers.map((coffee) => (
              <HomeCoffeeCard
                key={`special-${coffee.id}`}
                coffee={coffee}
                onPress={() => handleCoffeePress(coffee)}
                showFavorite={true}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 28,
  },
  greetingContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2C1810',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoriesContent: {
    paddingRight: 20,
    paddingBottom: 4,
  },
  coffeeListContainer: {
    paddingLeft: 20,
  },
  coffeeListContent: {
    paddingRight: 20,
  },
});

export default Home;
