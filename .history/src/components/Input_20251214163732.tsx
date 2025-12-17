import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type InputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
};

const Input: React.FC<InputProps> = ({ placeholder, secureTextEntry }) => {
  return <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secureTextEntry} />;
};

const styles = StyleSheet.create({
  input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#ccc', marginVertical: 8, borderRadius: 6 },
});

export default Input;
