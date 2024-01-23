import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../utils/colors';
import CustomInput from '../../components/CustomInput';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const DATA = [
  {
    id: 0,
    to: 'Hi, I need experienced UI/UX designer',
    from: 'Hi, I am interested!'
  },
  {
    id: 1,
    to: 'How many years of experience do you have?',
    from: 'I have three years of experience. I can share you my work.'
  },
  {
    id: 2,
    to: 'Ok, that would be nice, share your portfolio.',
    from: 'Okay, I will send you my email.'
  },
];

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <View style={{ alignItems: 'flex-start' }}>
      <View style={styles.cardTo}>
        <Text>{item.to}</Text>
      </View>
    </View>

    <View style={{ alignItems: 'flex-end' }}>
      <View style={styles.cardFrom}>
        <Text>
          {item.from}
        </Text>
      </View>
    </View>
  </View>
);

export default function MsgDetail() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        style={{padding:10}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CustomInput 
          placeholder={'Type a message'}
           Logo={<MaterialCommunityIcons name="plus-circle-outline" size={24} color={Colors.txt_grey} />}
           SecondaryLogo={<Feather name="send" size={24} color={Colors.btn_secondary} />}
           />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary_color,
  },
  safeContainer: {
    flex: 1,
  },
  card: {
    margin: 20,
    flex: 1,
  },
  cardTo: {
    backgroundColor: Colors.card_primary,
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '70%',
  },
  cardFrom: {
    backgroundColor: Colors.card_secondary,
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '70%',
  },
 
});