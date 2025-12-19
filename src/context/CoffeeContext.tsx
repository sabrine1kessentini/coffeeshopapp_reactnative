import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coffee, coffeeList, categories } from '../data/coffeeData';
import { loadOrders, saveOrders } from '../utils/ordersStorage';

export interface CartItem {
  id: string;
  coffee: Coffee;
  size: string;
  sugarLevel: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}

interface CoffeeContextType {
  coffees: Coffee[];
  cart: CartItem[];
  orders: Order[];
  favorites: string[]; // IDs des produits favoris
  addToCart: (coffee: Coffee, size: string, sugarLevel: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  searchCoffees: (query: string) => Coffee[];
  filterCoffeesByCategory: (categoryId: string) => Coffee[];
  createOrder: (items: CartItem[], total: number) => string;
  getOrders: () => Order[];
  toggleFavorite: (coffeeId: string) => void;
  isFavorite: (coffeeId: string) => boolean;
  getFavorites: () => Coffee[];
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
};

interface CoffeeProviderProps {
  children: ReactNode;
}

export const CoffeeProvider: React.FC<CoffeeProviderProps> = ({ children }) => {
  const [coffees] = useState<Coffee[]>(coffeeList);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  // Charger les commandes au démarrage
  useEffect(() => {
    const loadOrdersData = async () => {
      const loadedOrders = await loadOrders();
      setOrders(loadedOrders);
      setOrdersLoaded(true);
    };
    loadOrdersData();
  }, []);

  // Charger les favoris au démarrage
  useEffect(() => {
    const loadFavoritesData = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
        setFavoritesLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
        setFavoritesLoaded(true);
      }
    };
    loadFavoritesData();
  }, []);

  // Sauvegarder les commandes quand elles changent
  useEffect(() => {
    if (ordersLoaded) {
      saveOrders(orders);
    }
  }, [orders, ordersLoaded]);

  // Sauvegarder les favoris quand ils changent
  useEffect(() => {
    if (favoritesLoaded) {
      AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch((error) => {
        console.error('Erreur lors de la sauvegarde des favoris:', error);
      });
    }
  }, [favorites, favoritesLoaded]);

  const addToCart = (coffee: Coffee, size: string, sugarLevel: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.coffee.id === coffee.id && item.size === size && item.sugarLevel === sugarLevel,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      const newItem: CartItem = {
        id: `${coffee.id}-${size}-${sugarLevel}-${Date.now()}`,
        coffee,
        size,
        sugarLevel,
        quantity,
        price: coffee.price,
      };

      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const searchCoffees = (query: string): Coffee[] => {
    if (!query.trim()) return coffees;
    const lowerQuery = query.toLowerCase();
    return coffees.filter(
      (coffee) =>
        coffee.name.toLowerCase().includes(lowerQuery) ||
        coffee.description.toLowerCase().includes(lowerQuery) ||
        coffee.category.toLowerCase().includes(lowerQuery),
    );
  };

  const filterCoffeesByCategory = (categoryId: string): Coffee[] => {
    if (categoryId === '1') return coffees;
    const categoryName = categories.find((c) => c.id === categoryId)?.name;
    if (!categoryName) return coffees;
    return coffees.filter((coffee) => coffee.category === categoryName);
  };

  const createOrder = (items: CartItem[], total: number): string => {
    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      items: [...items],
      total,
      date: new Date(),
      
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder.id;
  };

  const getOrders = (): Order[] => {
    return orders;
  };

  const toggleFavorite = (coffeeId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(coffeeId)) {
        return prevFavorites.filter((id) => id !== coffeeId);
      } else {
        return [...prevFavorites, coffeeId];
      }
    });
  };

  const isFavorite = (coffeeId: string): boolean => {
    return favorites.includes(coffeeId);
  };

  const getFavorites = (): Coffee[] => {
    return coffees.filter((coffee) => favorites.includes(coffee.id));
  };

  const value: CoffeeContextType = {
    coffees,
    cart,
    orders,
    favorites,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    searchCoffees,
    filterCoffeesByCategory,
    createOrder,
    getOrders,
    toggleFavorite,
    isFavorite,
    getFavorites,
  };

  return (
    <CoffeeContext.Provider value={value}>{children}</CoffeeContext.Provider>
  );
};

