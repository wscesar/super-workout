import { useEffect, useState } from "react";
import { Alert, TextInput } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-web";
import { signIn, signUp } from "../utils/auth";
import { css } from "../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";


export default function AuthScreen({ navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        isLoggedIn && navigation.navigate('Workout');
    }, [isLoggedIn]);

    async function authHandler(email, password) {
        setIsloading(true);

        try {
            const response = await signIn(email, password);
            dispatch(login(response.data));
        } catch (error) {
            Alert.alert('Authentication failed. Please try again.');
        }
    }

    return (
        <View style={[css.container]}>
            <Text>Email</Text>
            <TextInput onChangeText={setEmail} />

            <Text>Password</Text>
            <TextInput onChangeText={setPassword} />

            <Button title="Login" onPress={() => authHandler(email, password)} />

            <Button title="Logout" onPress={() => dispatch(logout())} />
        </View>
    )
}
