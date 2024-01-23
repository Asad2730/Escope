import React from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../utils/colors';

const url = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80';

export default function CustomIcon({ userName, onClick }) {
  return (
    <Pressable style={styles.item} onPress={onClick}>
      <View style={styles.circularImageContainer}>
        <Image source={{ uri: url }} style={styles.circularImage} />
      </View>
      <View>
        <Text style={styles.itemName}>{userName}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemName: {
    color: Colors.txt_white,
    fontSize: 15,
    marginLeft: 12,
    paddingTop:10
  },
  item: {
    flexDirection: 'row',
    paddingTop:20,
    paddingLeft:10,
    paddingBottom:10
  },
  circularImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  circularImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});