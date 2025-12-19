import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  price?: string | number;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, price }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, price === undefined && styles.buttonNoPrice]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}>
      <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
      {price !== undefined && (
        <>
          <Text style={[styles.separator, disabled && styles.textDisabled]}>|</Text>
          <Text style={[styles.priceText, disabled && styles.textDisabled]}>
            {typeof price === 'number' 
              ? `${price.toFixed(2).replace('.', ',')} DT`
              : `${price} DT`}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#2D5016',
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonNoPrice: {
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  textDisabled: {
    color: '#999999',
  },
});

export default Button;
