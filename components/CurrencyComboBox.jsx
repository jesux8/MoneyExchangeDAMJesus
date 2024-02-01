import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CurrencyComboBox = ({ currencies, onSelectCurrency }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(Object.keys(currencies)[0]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    onSelectCurrency(currency);
  };

  return (
    <RNPickerSelect
      onValueChange={handleCurrencyChange}
      useNativeAndroidPickerStyle={false}
      items={Object.keys(currencies).map((currencyCode) => {
        return {
          label: `${currencies[currencyCode].emoji} ${currencies[currencyCode].name}`,
          value: currencyCode
        }
      })}

      style={pickerSelectStyles}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});


export default CurrencyComboBox;
