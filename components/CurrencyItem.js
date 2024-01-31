import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CurrencyItem = ({ conversion, onDelete }) => {
  return (
    <Pressable
      android_ripple={{ color: '#210644' }}
      onPress={() => onDelete(conversion.id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.conversionItem}>
        <Text style={styles.conversionText}>{`${conversion.amount} ${conversion.fromCurrency} = ${conversion.convertedAmount} ${conversion.toCurrency}`}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  conversionItem: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#512091',
  },
  conversionText: {
    color: 'white',
  },
  pressedItem: {
    opacity: 0.5,
  },
});

export default CurrencyItem;
