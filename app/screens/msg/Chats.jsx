import React, { useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
} from "react-native";
import { colors } from "../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { userChats } from "../../reduxKit/msg/msgThunk";
import { extractNameFromEmail, get_Image_url } from "../../utils/helpers";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


export default function Chats({ navigation }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const welcomeUser = extractNameFromEmail(loggedUser["Email"]); 
  const error = useSelector((state) => state.msg.error);

  const data = useSelector((state) => state.msg.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userChats({ email: loggedUser["Email"] }));
    if (error != null) {
      console.log("error", error);
    }
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate("chat-detail")}
    >
      <View style={styles.circularImageContainer}>
        <Image source={{ uri: `${get_Image_url}/${item.FaceID}` }} style={styles.circularImage} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.itemName}>{extractNameFromEmail(item.Email)}</Text>
        {/* <Text style={styles.itemDescription}>{item.description}</Text> */}
      </View>
    </Pressable>
  );

  return (
    <ImageBackground
      source={require("../../assets/bg-img.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.top_container}>
        <Text style={styles.leftTop}>Welcome {`${welcomeUser}`}!</Text>
        <Ionicons name="notifications-circle" size={24} color={"white"} />
      </View>

      <View style={styles.input_container}>
        <CustomInput
          inputWidth={'100%'}
          Logo={<Ionicons name="search" size={24} color={colors.txt_grey} />}
          placeholder={"search"}
        />
      </View>

      {data.length > 0 ? (
        <SafeAreaView style={styles.safeContainer}>
          <Text style={styles.title}>Chats</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID.toString()}
          />
        </SafeAreaView>
      ) : (
        <></>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  top_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  leftTop: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.txt_white,
  },
  input_container: {
    width: width * 0.95,
    height: height * 0.1,
    margin: 10,
  },
  title: {
    color: colors.txt_white,
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  itemName: {
    color: colors.txt_white,
    fontSize: 17,
    marginLeft: 10,
  },
  itemDescription: {
    color: colors.txt_grey,
    fontSize: 13,
    marginTop: 5,
    marginLeft: 10,
  },
  safeContainer: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  circularImageContainer: {
    width: width * 0.15,
    height: height * 0.06,
    borderRadius: 50,
    overflow: "hidden",
  },
  circularImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});
