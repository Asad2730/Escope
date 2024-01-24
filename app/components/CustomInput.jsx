import React from "react";
import { View, TextInput, StyleSheet,Pressable } from "react-native";
import { colors } from "../utils/colors";

export default function CustomInput({
  PlaceHolder,
  Type,
  OnChange,
  Secure,
  Value,
  Field,
  Logo,
  SecondaryLogo,
  inputWidth,
  onClick
}) {
  const handleOnChange = (text) => {

    if(OnChange){
      OnChange((prev) => ({
        ...prev,
        [Field]: { ...prev[Field], value: text },
      }));
    }
   
  };

  const containerStyles = {
    ...styles.inputContainer,
    width: inputWidth || "80%",
  };

  return (
    <View style={containerStyles}>
      <View style={styles.icon1Container}>{Logo}</View>
      <View style={styles.secondary_inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={PlaceHolder}
          keyboardType={Type}
          textAlign="left"
          secureTextEntry={Secure}
          onChangeText={(text) => handleOnChange(text)}
          value={Value}
        />
      </View>
      <Pressable onPress={onClick} style={styles.icon2Container}>{SecondaryLogo}</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 75,
    padding: 15,
    marginTop: 10,
    backgroundColor: colors.input_field,
   
  },
  secondary_inputContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
   
  },
  input: {
    color: colors.txt_grey,
    
  },
  icon1Container: {
    justifyContent: "flex-start",
  },
  icon2Container: {
    justifyContent: "flex-end",
  },
});
