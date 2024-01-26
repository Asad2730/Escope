import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import CustomInput from "../../components/CustomInput";
import { colors } from "../../utils/colors";

const ConvertCurrenct = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convertCurrency = useCallback(async () => {
    if (!amount) {
      setConvertedAmount(null);
      return;
    }
  
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const exchangeRates = response.data.rates;
      const conversionRate = exchangeRates[toCurrency];
  
      if (conversionRate) {
        const result = parseFloat(amount) * conversionRate;
        setConvertedAmount(result.toFixed(2));
      } else {
        setConvertedAmount("Invalid Currency ");
      }
    } catch (error) {
      console.error("Error converting currency: ", error);
    }
  }, [amount, fromCurrency, toCurrency]);
  
 
  
   
  const callApi = async()=>{
    try{

      let res = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      const currencyList = Object.keys(res.data.rates);
      setCurrencies(currencyList);
    }catch(ex){
      console.log(" Error fetching currency data: ", ex);
    }
  }

  useEffect(() => {
     callApi();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]);

  const swapCurrencies = () => {
    // Swap the selected currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.header}>Currency Converter</Text>
        <Text style={styles.label}>Amount:</Text>
        <View style={styles.inputContainer}>
           
           <CustomInput
             Field={'amount'}
             Value={amount}
             OnChange={setAmount}
             Type={"numeric"}
             PlaceHolder={"Enter Amount"}
        
           />
        
        </View>
        <Text style={styles.label}>From Currency:</Text>
        <View style={styles.inputContainer}>
          <ModalDropdown
            style={styles.dropdown}
            options={currencies}
            defaultValue={fromCurrency}
            onSelect={(index, value) => setFromCurrency(value)}
          />
        </View>
        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <Text style={styles.swapButtonText}>&#8646;</Text>
        </TouchableOpacity>
        <Text style={styles.label}>To Currency:</Text>
        <View style={styles.inputContainer}>
          <ModalDropdown
            style={styles.dropdown}
            options={currencies}
            defaultValue={toCurrency}
            onSelect={(index, value) => setToCurrency(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.convertButton}
          onPress={convertCurrency}
        >
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>

        {convertedAmount !== null && (
          <Text style={styles.result}>
            {amount} {fromCurrency} is
            {convertedAmount} {toCurrency}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ConvertCurrenct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:colors.card_primary,
  },
  subcontainer: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    padding: 40,
    borderRadius: 20,
    backgroundColor: colors.black_color,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.green_color,
  },
  
  label: {
    fontSize: 19,
    marginRight: 10,
    color: colors.card_secondary,
   
  },
  
  dropdown: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: colors.secondary_color,
    borderRadius: 4,
    paddingHorizontal: 10,
    justifyContent: "center",
    color: colors.card_secondary,
  },
  convertButton: {
    backgroundColor: colors.secondary_light,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    shadowColor: "rgba(0, 123, 255, 0.5)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 3,
  },
  convertButtonText: {
    color: colors.txt_white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: colors.green_color,
  },
  swapButton: {
    backgroundColor:colors.secondary_color,
    borderRadius: 50,
    width: 45,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  swapButtonText: {
    fontSize: 30,
    textAlign: "center",
    color: colors.secondary_light,
    marginBottom: 10,
  },
});
