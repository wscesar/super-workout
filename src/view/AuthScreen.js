import { useState } from "react";
import { TextInput } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-web";
import { signIn, signUp } from "../utils/auth";
import { css } from "../utils/styles";


export default function AuthScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);

    async function authHandler(email, password) {
        setIsloading(true);

        try {
            await signIn(email, password);
        } catch (error) {
            console.log('Authentication failed. Please try again.');
        }

        setIsloading(false);

        if (isLoading) {
            return <Text>...</Text>;
        }

        navigation.navigate('Workout');
    }

    return (
        <View style={[css.container]}>
            <Text>Email</Text>
            <TextInput onChangeText={setEmail} />

            <Text>Password</Text>
            <TextInput onChangeText={setPassword} />

            <Button title="Login" onPress={() => authHandler(email, password)} />
        </View>
    )
}
