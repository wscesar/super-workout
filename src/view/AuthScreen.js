import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { signIn, signUp } from '../utils/auth';
import { css } from '../utils/styles';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';


export default function AuthScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  async function authHandler(email, password) {
    try {
      let response;

      if (hasAccount) {
        response = await signIn(email, password);
      } else {
        response = await signUp(email, password);
      }

      dispatch(login(response.data));
    } catch (error) {
      Alert.alert('Authentication failed. Please try again.');
      alert('Authentication failed. Please try again.');
    }
  }

  return (
    <View style={[css.container]}>
      <View style={[css.col1, css.box, css.gap(24), { backgroundColor: '#fff' }]}>

        <Text style={[css.bold, css.center]}>
          {hasAccount ? 'Fazer Login' : 'Fazer Cadastro'}
        </Text>

        <TextInput
          label='E-Mail'
          mode='outlined'
          textColor='#333'
          selectionColor='#3339'
          activeOutlineColor='#333'
          style={[css.col1, css.input]}
          onChangeText={setEmail}
        />

        <TextInput
          label='Password'
          secureTextEntry={true}
          mode='outlined'
          textColor='#333'
          selectionColor='#3339'
          activeOutlineColor='#333'
          style={[css.col1, css.input]}
          onChangeText={setPassword}
        />

        <Button mode='contained' onPress={() => authHandler(email, password)}>
          Login
        </Button>

        <TouchableOpacity onPress={() => setHasAccount(!hasAccount)} style={[css.center, css.bold, css.gap(4)]} >
          <Text style={css.bold}>
            {!hasAccount ? 'Já tem uma conta?' : 'Não tem uma conta?'}
          </Text>
          <Text style={css.bold}>
            {!hasAccount ? 'Faça Login' : 'Cadastre-se'}
          </Text>

        </TouchableOpacity>
      </View>

    </View>
  )
}
