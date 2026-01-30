import axios from "axios";
import { API_KEY } from "./apiKey";

async function authenticate(mode, email, password) {
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
        {
            email,
            password,
            returnSecureToken: true
        }
    );

    return response;
}

export function signUp(email, password) {
    return authenticate('signUp', email, password);
}

export function signIn(email, password) {
    return authenticate('signInWithPassword', email, password);
}