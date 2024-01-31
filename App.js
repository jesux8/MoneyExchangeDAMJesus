import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Modal, Button, FlatList } from 'react-native';
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
  // Puedes agregar más códigos de moneda, emojis de banderas y nombres de moneda según tus necesidades
}


const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [conversions, setConversions] = useState([]);

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
          const newConversion = `${amount} ${fromCurrency} is ${result.toFixed(2)} ${toCurrency}`;
          setConvertedAmount(result.toFixed(2));
          setConversions(prevConversions => [...prevConversions, newConversion]);
        } else {
          setConvertedAmount("Invalid Currency");
        }
      })
      .catch((error) => {
        console.error("Error converting currency: ", error);
      });
  }, [amount, fromCurrency, toCurrency]);

  const renderConversionItem = ({ item }) => (
    <View style={styles.conversionItem}>
      <Text style={styles.conversionText}>{item}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            style={styles.logo}
            source={require('./assets/dollaricon.png')}
          />
          <View style={styles.subcontainer}>
            <Text style={styles.label}>Origin Currency:</Text>
            <CurrencyComboBox
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
            <Image
              source={require('./assets/arrow.png')}
            />
            <Text style={styles.label}>To Currency:</Text>
            <CurrencyComboBox
              currencies={initialCurrencies}
              selectedCurrency={toCurrency}
              onSelectCurrency={(currency) => setToCurrency(currency)}
            />
            <View style={styles.row}>
              <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
                <Text style={styles.convertButtonText}>Convert</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.convertButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.convertButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            {convertedAmount !== null && (
              <Text style={styles.result}>
                {amount} {fromCurrency} is {convertedAmount} {toCurrency}
              </Text>
            )}
          </View>
        </ScrollView>
      </Modal>

      <View style={styles.row}>
        <Image
          source={require('./assets/exchangeicon.png')}

        />
        <Image
          source={require('./assets/title.png')}
          style={styles.newIcon}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('./assets/new.png')}

          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2 }}>
        <FlatList
          data={conversions}
          renderItem={renderConversionItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    
  },
  goalText: {
    color: "white"
  },
  pressedItem: {
    opacity: 0.5
  },
  conversionItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#d2e09d"
  },
  conversionText: {
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffee1',
  },
  row: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,

  },
  newIcon: {
    marginTop: 40,


  },
  subcontainer: {
    width: '80%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fffdc2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d37c2b',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    color: '#333',
    marginBottom: 20,
  },
  convertButton: {
    backgroundColor: '#d37c2b',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: 'rgba(211, 124, 43, 0.5)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 3,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    alignSelf: 'flex-start',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default App;
