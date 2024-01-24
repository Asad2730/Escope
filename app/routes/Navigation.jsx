import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignIn";
import TabNavigation from "./TabNavigation";
import { useSelector } from "react-redux";
import MsgDetail from "../screens/msg/MsgDetail";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isLogin = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin !== null ? (
          <>
            <Stack.Screen
              name="main"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="chat-detail"
              component={MsgDetail}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
