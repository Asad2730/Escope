import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../../utils/colors";
import CustomInput from "../../components/CustomInput";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { web_socket_url } from "../../utils/helpers";

const DATA = [
  {
    id: 0,
    to: "Hi, I need experienced UI/UX designer",
    from: "Hi, I am interested!",
  },
  {
    id: 1,
    to: "How many years of experience do you have?",
    from: "I have three years of experience. I can share you my work.",
  },
  {
    id: 2,
    to: "Ok, that would be nice, share your portfolio.",
    from: "Okay, I will send you my email.",
  },
];

const renderItem = ({ item }) => (
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

export default function MsgDetail() {
  const [socket,setSocket] = useState(null);

  const [msg, setMsg] = useState({
    message: { value: "" },
  });
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket(`${web_socket_url}/ws`);

    //diable ssl
    ws.binaryType = 'blob';
    // WebSocket.prototype._connect = function () {
    //   this._socket = new WebSocket(this._url);
    //   this._socket.binaryType = this.binaryType;
    
    //   this._socket.onopen = this._handleOpen;
    //   this._socket.onmessage = this._handleMessage;
    //   this._socket.onerror = this._handleError;
    //   this._socket.onclose = this._handleClose;
    // };

    //

    ws.onopen = () => console.log("connected");

    ws.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      setReceivedMessage(event.data);
    };

    ws.onerror = (error) => {
      console.log("WebSocket error :", error);
    };

   setSocket(ws);
    return () => {
      ws.close();
    };
}, []);


  const sendMessage = () => {
    if (socket != null) {
      const messageObject = {
        senderID: 123,
        receiverID: 456,
        content: msg.message.value,
      };

      // Convert the message object to a JSON string before sending
      socket.send(JSON.stringify(messageObject));
    }
  };

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
        style={{ padding: 10 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {Object.entries(msg).map(([key, item], index) => (
          <View key={key}>
            <CustomInput
              inputWidth={"100%"}
              Field={key}
              OnChange={setMsg}
              onClick={sendMessage}
              placeholder={"Type a message"}
              Logo={
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={24}
                  color={colors.txt_grey}
                />
              }
              SecondaryLogo={
                <Feather name="send" size={24} color={colors.btn_secondary} />
              }
            />
          </View>
        ))}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary_color,
  },
  safeContainer: {
    flex: 1,
  },
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
