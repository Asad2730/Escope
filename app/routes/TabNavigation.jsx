import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "../screens/msg/Chats";
import ConvertCurrenct from "../screens/msg/ConvertCurrency";
import { Entypo ,FontAwesome,FontAwesome5} from "@expo/vector-icons";
import { colors } from "../utils/colors";
import LogoutUser from '../screens/auth/Logout';

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  
 
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerShown: false,
        tabBarActiveTintColor: colors.txt_white,
        tabBarStyle: {
          backgroundColor: colors.primary_colr,
        },
      }}
    >
      <Tab.Screen
        name="chats"
        component={Chats}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="convertCurrency"
        component={ConvertCurrenct}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="money" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="logout"
        component={LogoutUser}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="sign-out-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
