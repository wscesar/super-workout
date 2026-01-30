import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_KEY } from "./apiKey";

async function authenticate(mode, email, password) {
    // const navigation = useNavigation();

    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
        {
            email,
            password,
            returnSecureToken: true
        }
    );

    console.log({response});

    // if (response.data) {
    //     navigation.navigate('Workout');
    // }
}

export async function signUp(email, password) {
    await authenticate('signUp', email, password);
}

export async function signIn(email, password) {
    await authenticate('signInWithPassword', email, password);
}