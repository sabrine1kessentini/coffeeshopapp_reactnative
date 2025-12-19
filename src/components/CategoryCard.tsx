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
      onPress={onPress}
      activeOpacity={0.7}>
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
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#2D5016',
    borderColor: '#2D5016',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  selectedIcon: {
    opacity: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C1810',
  },
  selectedName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CategoryCard;

