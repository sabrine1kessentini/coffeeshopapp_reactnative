import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from '../data/coffeeData';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}>
      <Text style={[styles.icon, isSelected && styles.selectedIcon]}>
        {category.icon}
      </Text>
      <Text style={[styles.name, isSelected && styles.selectedName]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedCard: {
    backgroundColor: '#2D5016',
    borderColor: '#2D5016',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  selectedIcon: {
    opacity: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C1810',
  },
  selectedName: {
    color: '#FFFFFF',
  },
});

export default CategoryCard;

