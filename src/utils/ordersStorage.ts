import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from '../context/CoffeeContext';

const ORDERS_STORAGE_KEY = '@coffee_shop_orders';

// Convertir Order en format JSON (sans les objets Coffee complexes)
interface OrderJson {
  id: string;
  items: Array<{
    id: string;
    coffeeId: string;
    coffeeName: string;
    coffeeDescription: string;
    size: string;
    sugarLevel: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  date: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
}

// Sauvegarder les commandes
export const saveOrders = async (orders: Order[]): Promise<void> => {
  try {
    const ordersJson: OrderJson[] = orders.map((order) => ({
      id: order.id,
      items: order.items.map((item) => ({
        id: item.id,
        coffeeId: item.coffee.id,
        coffeeName: item.coffee.name,
        coffeeDescription: item.coffee.description,
        size: item.size,
        sugarLevel: item.sugarLevel || 'Medium', // Valeur par défaut pour compatibilité
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      date: order.date.toISOString(),
      status: order.status,
    }));

    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersJson, null, 2));
  } catch (error) {
    console.error('Error saving orders:', error);
  }
};

// Charger les commandes
export const loadOrders = async (): Promise<Order[]> => {
  try {
    const data = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
    if (!data) return [];

    const ordersJson: OrderJson[] = JSON.parse(data);
    
    // Convertir les commandes JSON en objets Order
    // Note: Les objets Coffee ne sont pas complètement restaurés, seulement les données essentielles
    const orders: Order[] = ordersJson.map((orderJson) => ({
      id: orderJson.id,
      items: orderJson.items.map((item) => ({
        id: item.id,
        coffee: {
          id: item.coffeeId,
          name: item.coffeeName,
          description: item.coffeeDescription,
          price: item.price,
          image: null, // L'image sera null car on ne peut pas la sérialiser
          category: '',
          rating: 0,
          size: [],
        } as any,
        size: item.size,
        sugarLevel: item.sugarLevel || 'Medium', // Valeur par défaut pour compatibilité
        quantity: item.quantity,
        price: item.price,
      })),
      total: orderJson.total,
      date: new Date(orderJson.date),
      status: orderJson.status,
    }));

    return orders;
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

// Obtenir les commandes au format JSON pour export
export const getOrdersAsJson = async (): Promise<string> => {
  try {
    const data = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
    if (!data) return JSON.stringify({ orders: [] }, null, 2);
    
    const ordersJson: OrderJson[] = JSON.parse(data);
    return JSON.stringify({ orders: ordersJson }, null, 2);
  } catch (error) {
    console.error('Error getting orders as JSON:', error);
    return JSON.stringify({ orders: [] }, null, 2);
  }
};

