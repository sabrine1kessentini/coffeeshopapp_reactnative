import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import { useCoffee } from '../context/CoffeeContext';

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal,
    clearCart,
    createOrder,
  } = useCoffee();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIncrease = (itemId: string, currentQuantity: number) => {
    updateCartItemQuantity(itemId, currentQuantity + 1);
  };

  const handleDecrease = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateCartItemQuantity(itemId, currentQuantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add items to checkout.');
      return;
    }

    Alert.alert(
      'Confirm Order',
      `Total: ${getCartTotal().toFixed(2)} DT\n\nDo you want to proceed with checkout?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => processCheckout(),
        },
      ]
    );
  };

  const processCheckout = async () => {
    setIsProcessing(true);
    
    // Simuler un traitement de commande (2 secondes)
    setTimeout(() => {
      setIsProcessing(false);
      
      const total = getCartTotal();
      // Créer la commande
      const orderId = createOrder(cart, total);
      
      // Afficher le message de succès
      Alert.alert(
        'Order Placed! 🎉',
        `Your order of ${total.toFixed(2)} DT has been placed successfully.\n\nOrder ID: ${orderId.split('-')[1]}\n\nYou can view your orders in the Profile section.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Vider le panier après confirmation
              clearCart();
            },
          },
        ]
      );
    }, 2000);
  };

  const total = getCartTotal();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                name={item.coffee.name}
                description={item.coffee.description}
                size={item.size}
                sugarLevel={item.sugarLevel}
                price={item.price}
                quantity={item.quantity}
                image={item.coffee.image}
                coffeeId={item.coffee.id}
                onIncrease={() => handleIncrease(item.id, item.quantity)}
                onDecrease={() => handleDecrease(item.id, item.quantity)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>{total.toFixed(2)} DT</Text>
            </View>
          </>
        )}
      </ScrollView>
      {cart.length > 0 && (
        <View style={styles.footer}>
          <Button
            title={isProcessing ? 'Processing...' : 'Buy'}
            onPress={handleCheckout}
            disabled={isProcessing}
          />
          {isProcessing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#6F4E37" />
            </View>
          )}
        </View>
      )}
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: -4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C1810',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6F4E37',
  },
  loadingContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
});

export default Cart;

