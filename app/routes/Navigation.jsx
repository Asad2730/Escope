import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignIn";
import TabNavigation from "./TabNavigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isLogin = useSelector((state) => state.auth.user);

   useEffect(()=>{
    console.log('condition is',isLogin)
   },[])

  if (isLogin !== null) {
   
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
