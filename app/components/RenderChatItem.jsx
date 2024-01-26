import React from "react";
import { View,Text ,StyleSheet} from "react-native";
import { colors } from "../utils/colors";

export const RenderChatItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ alignItems: "flex-start" }}>
        <View style={styles.cardTo}>
          <Text>{item.to}</Text>
        </View>
      </View>
  
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.cardFrom}>
          <Text>{item.from}</Text>
        </View>
      </View>
    </View>
  );


  
const styles = StyleSheet.create({
 
    card: {
      margin: 20,
      flex: 1,
    },
    cardTo: {
      backgroundColor: colors.card_primary,
      padding: 16,
      margin: 8,
      borderRadius: 8,
      borderWidth: 1,
      maxWidth: "70%",
    },
    cardFrom: {
      backgroundColor: colors.card_secondary,
      padding: 16,
      margin: 8,
      borderRadius: 8,
      borderWidth: 1,
      maxWidth: "70%",
    },
  });
  