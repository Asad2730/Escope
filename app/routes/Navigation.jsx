import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignIn';
import { useSelector } from 'react-redux';




const Stack = createNativeStackNavigator();


export default function Navigation() {
    
    // const isLogin = useSelector((state) => state.auth.isLogin);

    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name='login' component={Login}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name='signUp' component={SignUp}
                                options={{ headerShown: false }}
                            />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



