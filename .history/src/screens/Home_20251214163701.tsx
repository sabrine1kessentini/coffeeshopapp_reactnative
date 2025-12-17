import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Coffee Shop!</Text>
      <Button title="Login" onPress={() => console.log('Navigate to Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Home;
