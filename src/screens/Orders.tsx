import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { useCoffee } from '../context/CoffeeContext';
import { getOrdersAsJson } from '../utils/ordersStorage';

interface OrdersProps {
  navigation: any;
}

const Orders: React.FC<OrdersProps> = ({ navigation }) => {
  const { orders } = useCoffee();
  const [showJson, setShowJson] = useState(false);

  const handleExportJson = async () => {
    try {
      const jsonData = await getOrdersAsJson();
      await Share.share({
        message: `Commandes JSON:\n\n${jsonData}`,
        title: 'Export des commandes',
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'exporter les commandes');
    }
  };

  const handleViewJson = async () => {
    try {
      const jsonData = await getOrdersAsJson();
      Alert.alert(
        'Commandes JSON',
        jsonData,
        [
          { text: 'Fermer', style: 'cancel' },
          { text: 'Partager', onPress: handleExportJson },
        ],
        { userInterfaceStyle: 'light' }
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les commandes');
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'preparing':
        return '#2196F3';
      case 'ready':
        return '#4CAF50';
      case 'completed':
        return '#9B9B9B';
      default:
        return '#9B9B9B';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'preparing':
        return 'En préparation';
      case 'ready':
        return 'Prêt';
      case 'completed':
        return 'Terminé';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mes Commandes</Text>
        <TouchableOpacity
          style={styles.jsonButton}
          onPress={handleViewJson}>
          <Text style={styles.jsonButtonText}>📄</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyText}>Aucune commande</Text>
            <Text style={styles.emptySubtext}>
              Vos commandes apparaîtront ici après le checkout
            </Text>
          </View>
        ) : (
          <>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderId}>Commande #{order.id.split('-')[1]}</Text>
                    <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(order.status) },
                    ]}>
                    <Text style={styles.statusText}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemsContainer}>
                  {order.items.map((item) => (
                    <View key={item.id} style={styles.orderItem}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.coffee.name}</Text>
                        <Text style={styles.itemDescription}>
                          {item.coffee.description} ({item.size}, Sugar: {item.sugarLevel}) x{item.quantity}
                        </Text>
                      </View>
                      <Text style={styles.itemPrice}>
                        {(item.price * item.quantity).toFixed(2)} DT
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalPrice}>{order.total.toFixed(2)} DT</Text>
                </View>
              </View>
            ))}
          </>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#2C1810',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  jsonButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jsonButtonText: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
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
    paddingHorizontal: 40,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C1810',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C1810',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C1810',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5016',
  },
});

export default Orders;

