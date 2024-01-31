import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import CurrencyComboBox from './components/CurrencyComboBox';

const initialCurrencies = {
  "USD": {
    "emoji": "🇺🇸",
    "exchangeRate": 1,
    "name": "US Dollar"
  },
  "EUR": {
    "emoji": "🇪🇺",
    "exchangeRate": 0.89,
    "name": "Euro"
  },
  "JPY": {
    "emoji": "🇯🇵",
    "exchangeRate": 114.42,
    "name": "Japanese Yen"
  },
  "GBP": {
    "emoji": "🇬🇧",
    "exchangeRate": 0.75,
    "name": "British Pound"
  },
  "AUD": {
    "emoji": "🇦🇺",
    "exchangeRate": 1.35,
    "name": "Australian Dollar"
  },
  "CAD": {
    "emoji": "🇨🇦",
    "exchangeRate": 1.28,
    "name": "Canadian Dollar"
  },
  "CHF": {
    "emoji": "🇨🇭",
    "exchangeRate": 0.93,
    "name": "Swiss Franc"
  },
  "CNY": {
    "emoji": "🇨🇳",
    "exchangeRate": 6.36,
    "name": "Chinese Yuan"
  },
  "SEK": {
    "emoji": "🇸🇪",
    "exchangeRate": 8.51,
    "name": "Swedish Krona"
  },
  "NZD": {
    "emoji": "🇳🇿",
    "exchangeRate": 1.49,
    "name": "New Zealand Dollar"
  },
  "INR": {
    "emoji": "🇮🇳",
    "exchangeRate": 74.57,
    "name": "Indian Rupee"
  },
  "BRL": {
    "emoji": "🇧🇷",
    "exchangeRate": 5.22,
    "name": "Brazilian Real"
  },
  "RUB": {
    "emoji": "🇷🇺",
    "exchangeRate": 73.96,
    "name": "Russian Ruble"
  },
  "ZAR": {
    "emoji": "🇿🇦",
    "exchangeRate": 16.96,
    "name": "South African Rand"
  },
  "MXN": {
    "emoji": "🇲🇽",
    "exchangeRate": 20.45,
    "name": "Mexican Peso"
  }
  // Resto de tus monedas...
};

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currenciesList, setCurrenciesList] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convertCurrency = useCallback(() => {
    if (!amount) {
      setConvertedAmount(null);
      return;
    }
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRates = data.rates;
        const conversionRate = exchangeRates[toCurrency];
        if (conversionRate) {
          const result = parseFloat(amount) * conversionRate;
          setConvertedAmount(result.toFixed(2));
        } else {
          setConvertedAmount("Invalid Currency");
        }
      })
      .catch((error) => {
        console.error("Error converting currency: ", error);
      });
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.rates);
        setCurrenciesList(currencyList);
      })
      .catch((error) => {
        console.error("Error fetching currency data: ", error);
      });
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const clearResult = () => {
    setConvertedAmount(null);
  };

  return (
    <View style={styles.container}>


      <Image
        style={styles.logo}
        source={require('./assets/dollaricon.jpeg')}
      />

      <Text style={styles.label}>Origin Currency:</Text>

      <CurrencyComboBox
        style={styles.input}
        currencies={initialCurrencies}
        selectedCurrency={fromCurrency}
        onSelectCurrency={(currency) => setFromCurrency(currency)}
      />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor="#999"
      />


      <Text style={styles.label}>To Currency:</Text>

      <CurrencyComboBox

        currencies={initialCurrencies}
        selectedCurrency={toCurrency}
        onSelectCurrency={(currency) => setToCurrency(currency)}
      />
      <View
        style={styles.containers}>
        <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.convertButton} onPress={clearResult}>
          <Text style={styles.convertButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>


      {convertedAmount !== null && (
        <Text style={styles.result}>
          {amount} {fromCurrency} is {convertedAmount} {toCurrency}
        </Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  subcontainer: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    padding: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff"
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green"
  },
  label: {
    fontSize: 19,
    marginRight: 10,
    color: "#333",
    fontFamily: "Pacifico"
  },
  input: {
    borderWidth: 1,
    borderColor: "#d37c2b",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    color: "#333",
    marginBottom: 10
  },
  swapButton: {
    backgroundColor: "#ddd",
    borderRadius: 50,
    width: 45,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  swapButtonText: {
    fontSize: 30,
    textAlign: "center",
    color: "red",
    marginBottom: 10
  },
  convertButton: {
    backgroundColor: "#d37c2b",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
    shadowColor: "rgba(211, 124, 43, 0.5)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 3
  },
  convertButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: "#333"
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20

  },
  dropdown: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    justifyContent: "center",
    color: "#333"
  }
});

export default App;
