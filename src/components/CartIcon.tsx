import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCoffee } from '../context/CoffeeContext';

const CartIcon: React.FC<{ color: string }> = ({ color }) => {
  const { getCartItemCount } = useCoffee();
  const itemCount = getCartItemCount();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>🛒</Text>
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CartIcon;



