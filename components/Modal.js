import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import CurrencyComboBox from './CurrencyComboBox';

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  fromCurrency,
  setFromCurrency,
  amount,
  setAmount,
  toCurrency,
  setToCurrency,
  convertCurrency,
  initialCurrencies,
  convertedAmount,
  styles,
}) => {
  return (
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
          source={require('../assets/dollaricon.png')}
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
            source={require('../assets/arrow.png')}
          />
          <Text style={styles.label}>To Currency:</Text>
          <CurrencyComboBox
            currencies={initialCurrencies}
            selectedCurrency={toCurrency}
            onSelectCurrency={(currency) => setToCurrency(currency)}
          />
          <View style={styles.row}>
            
            <TouchableOpacity style={styles.convertButton} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.convertButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
              <Text style={styles.convertButtonText}>Convert</Text>
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
  );
};

export default ModalComponent;
