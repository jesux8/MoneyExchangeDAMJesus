import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Modal, Button, FlatList, Animated } from 'react-native';
import CurrencyComboBox from './components/CurrencyComboBox';
import ModalComponent from './components/Modal';


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


  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]);

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
          const newConversion = `${amount} ${fromCurrency} ${result.toFixed(2)} ${toCurrency}`;
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

  const renderConversionItem = ({ item, index }) => {
    const [amount, fromCurrency, result, toCurrency] = item.split(' ');
    const fromCurrencyEmoji = initialCurrencies[fromCurrency].emoji;
    const toCurrencyEmoji = initialCurrencies[toCurrency].emoji;

    const handleDeleteItem = () => {
      const updatedConversions = [...conversions];
      updatedConversions.splice(index, 1); // Eliminar el elemento en la posición index
      setConversions(updatedConversions);
    };

    return (
      <View style={styles.conversionItem}>

        <View style={styles.emojiAndCurrency}>
          <Text style={styles.conversionEmoji}>
            {`${fromCurrencyEmoji}`}
          </Text>
          <Text style={styles.conversionText}>
            {`${amount} ${fromCurrency}`}
          </Text>
        </View>

        <Image
          style={styles.doublearrow}
          source={require('./assets/doublearrow.png')}
        />

        <View style={styles.emojiAndCurrency}>
          <Text style={styles.conversionEmoji}>
            {`${toCurrencyEmoji}`}
          </Text>
          <Text style={styles.conversionText}>
            {`${result} ${toCurrency}`}
          </Text>
        </View>

        <TouchableOpacity onPress={handleDeleteItem}>
          <Image
            style={styles.deletebtn}
            source={require('./assets/delete.png')}
          />
        </TouchableOpacity>


      </View>
    );
  };



  return (
    <View style={styles.container}>

      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency}
        amount={amount}
        setAmount={setAmount}
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        convertCurrency={convertCurrency}
        initialCurrencies={initialCurrencies}
        convertedAmount={convertedAmount}
        styles={styles}
      />

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

      <View style={{ flex: 4 }}>
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
  emojiAndCurrency: {
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',

  },
  pressedItem: {
    opacity: 0.5
  },
  conversionItem: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#d2e09d"
  },
  conversionText: {
    fontSize: 18,
  },
  conversionEmoji: {
    fontSize: 30,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffee1',
  },
  row: {
    flex: 2,
    justifyContent: 'flex-end',
    alignContent: 'center',
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
    marginTop: 5,
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
  deletebtn: {
    paddingLeft: 5,
    width: 30,
    height: 30,
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
  doublearrow: {
    width: 70,
    height: 30,
  },
});

export default App;
