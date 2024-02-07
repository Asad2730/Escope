import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../../utils/colors";
import CustomInput from "../../components/CustomInput";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { web_socket_url } from "../../utils/helpers";
import { RenderChatItem } from "../../components/RenderChatItem";

const DATA = [];

export default function MsgDetail() {
  const [socket, setSocket] = useState(null);

  const [msg, setMsg] = useState({
    message: { value: "" },
  });
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    let ws = new WebSocket(`${web_socket_url}/ws`);

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      setReceivedMessage(event.data);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error.message);

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
    };

    

    setSocket(ws);
    return () => {
      console.log("Cleaning up WebSocket");
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    switch (socket) {
      case !null:
        {
          const messageObject = {
            senderID: 123,
            receiverID: 456,
            content: msg.message.value,
          };
          // Convert the message object to a JSON string before sending
          socket.send(JSON.stringify(messageObject));
        }
        break;
      default:
        console.log("socket is null", socket);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <FlatList
          data={DATA}
          renderItem={RenderChatItem}
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
    marginTop: 30,
    flex: 1,
  },
});
