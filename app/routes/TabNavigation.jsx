import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "../screens/msg/Chats";
import Calls from "../screens/msg/Calls";
import { Entypo, Feather } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
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
        name="calls"
        component={Calls}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="phone-call" size={24} color={color} />
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