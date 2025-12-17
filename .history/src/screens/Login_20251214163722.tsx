import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Button title="Sign In" onPress={() => console.log('Login pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Login;
