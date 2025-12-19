import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import CoffeeDetail from '../screens/CoffeeDetail';
import { useCoffee } from '../context/CoffeeContext';

// Icon Components
const HomeIcon: React.FC<{ focused: boolean }> = ({ focused }) => (
  <Text style={[styles.icon, focused ? styles.iconActive : styles.iconInactive]}>
    🏠
  </Text>
);

const HeartIcon: React.FC<{ focused: boolean }> = ({ focused }) => (
  <Text style={[styles.icon, focused ? styles.iconActive : styles.iconInactive]}>
    {focused ? '❤️' : '🤍'}
  </Text>
);

const ProfileIcon: React.FC<{ focused: boolean }> = ({ focused }) => (
  <Text style={[styles.icon, focused ? styles.iconActive : styles.iconInactive]}>
    👤
  </Text>
);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const CartIconTab: React.FC<{ focused: boolean }> = ({ focused }) => {
    const { getCartItemCount } = useCoffee();
    const itemCount = getCartItemCount();
    
    return (
      <View style={styles.cartContainer}>
        <Text style={[styles.icon, focused ? styles.iconActive : styles.iconInactive]}>
          🛒
        </Text>
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

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2D5016',
        tabBarInactiveTintColor: '#6F9E4F',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => <HeartIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => <CartIconTab focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="CoffeeDetail" component={CoffeeDetail} />
        <Stack.Screen name="Orders" component={Orders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
  iconActive: {
    // Icône active - couleur par défaut de l'emoji
  },
  iconInactive: {
    opacity: 0.6,
  },
  cartContainer: {
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

export default AppNavigator;
