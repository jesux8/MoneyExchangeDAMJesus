import React, { useState } from 'react';
import { View, Text } from 'react-native';
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
      items={Object.keys(currencies).map((currencyCode) => {
        return {
          label: `${currencies[currencyCode].emoji} ${currencies[currencyCode].name}`,
          value: currencyCode
        }
      })}
    />
  );
};

export default CurrencyComboBox;
